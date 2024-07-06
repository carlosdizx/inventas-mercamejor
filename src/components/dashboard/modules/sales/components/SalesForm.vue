<template>
  <v-card class="mb-2">
    <v-card-text>
      <h1 class="mx-auto text-center">Formulario para registro de ventas</h1>
    </v-card-text>
    <DialogClients v-on:cliente="cambiarCliente($event)" ref="DialogClients" />
    <v-card-text>
      <ValidationObserver ref="observer">
        <v-form @submit.prevent="">
          <v-col>
            <validation-provider
              v-slot="{ errors }"
              name="Documento del cliente"
              rules="required|min:6|max:20"
            >
              <v-text-field
                label="Documento de identidad"
                append-outer-icon="mdi-magnify"
                @click:append-outer="abrirDialogoLisadoClientes"
                clearable
                dense
                outlined
                counter
                v-model="sale.doc_client"
                @keyup.enter="buscarCliente()"
                :error-messages="errors"
              />
            </validation-provider>
          </v-col>
          <v-col>
            <v-text-field
              label="Nombre cliente"
              prepend-icon="mdi-account"
              dense
              outlined
              counter
              :value="`${sale.nam_client + ' ' + sale.sur_client}`"
              readonly
              disabled
            />
          </v-col>
          <v-col>
            <validation-provider
              v-slot="{ errors }"
              name="Tipo venta"
              rules="required"
            >
              <v-select
                prepend-icon="mdi-home"
                :items="posicionFiltrada"
                label="Tipos de venta"
                solo
                outlined
                dense
                v-model="sale.sale_type"
                :error-messages="errors"
              />
            </validation-provider>
          </v-col>
          <v-row>
            <v-col>
              <v-text-field
                ref="barcodeField"
                :color="enfoque ? 'success' : 'red'"
                :label="
                  enfoque
                    ? 'Codigo del producto o servicio'
                    : 'Codigo del producto o servicio (Pistola no posicionada)'
                "
                prepend-icon="mdi-barcode-scan"
                type="number"
                dense
                outlined
                clearable
                counter
                v-model="bar_code"
                @keyup.enter="buscarProducto"
                @focus="enfoque = true"
                @focusout="enfoque = false"
                @keydown="handleKeyDown('barcodeField', $event)"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field
                ref="priceField"
                label="Digite precio"
                prepend-icon="mdi-currency-usd"
                clearable
                dense
                outlined
                counter
                type="number"
                v-model="productNotRegister.price"
                @keyup.enter="registerSaleNotProduct"
                @keydown="handleKeyDown('priceField', $event)"
              />
            </v-col>
            <v-col>
              <v-text-field
                label="Digite Descripción"
                clearable
                dense
                outlined
                counter
                type="string"
                v-model="productNotRegister.description"
                @keyup.enter="registerSaleNotProduct"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-btn color="success" block large @click="registrarVenta">
                Registrar venta
                <v-icon>mdi-currency-usd</v-icon>
              </v-btn>
            </v-col>
          </v-row>
          <v-row v-if="!enfoque">
            <v-col class="text-center">
              <v-chip color="red">
                Pistola no posicionada -
                <v-icon>mdi-barcode-scan</v-icon>
              </v-chip>
            </v-col>
          </v-row>
        </v-form>
      </ValidationObserver>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import Swal from "sweetalert2";
import { TIPOS_VENTA } from "@/generals/Constantes";
import DialogClients from "@/components/dashboard/modules/sales/components/DialogClients.vue";
import { FIND_CLIENT_BY_DOCUMENT } from "@/domain/useCase/client/clientUseCase";
import { Sale } from "@/domain/model/sale/Sale";
import {
  FECHA_TO_STRING_INPUT,
  STRINT_TO_FECHA,
} from "@/generals/procesamientos";
import { Client } from "@/domain/model/client/Client";
import { EEstateSale, EPayTypeSale } from "@/domain/model/constants/Constants";
import { ProductSale } from "@/domain/model/productsale/ProductSale";

export default Vue.extend({
  name: "SalesForm",
  components: { DialogClients },
  data: () => ({
    bar_code: null,
    sale: {
      doc_client: "",
      nam_client: "Clientes varios",
      sur_client: "",
      cod_invoice: "",
      sale_type: EPayTypeSale.CONTADO,
      pay_type: "",
      pay_date: new Date(),
      box: "",
      sales: [] as Array<ProductSale>,
      subtotal: 0,
      discount: 0,
      taxes: 0,
      total: 0,
      state: EEstateSale.APROBADO,
      created_at: new Date(),
      updated_at: new Date(),
    } as Sale,
    productNotRegister: {
      price: null,
      description: "",
    },
    fecha_pago: FECHA_TO_STRING_INPUT(new Date()),
    tipos_venta: TIPOS_VENTA,
    dialog_list: false,
    enfoque: false,
  }),
  methods: {
    abrirDialogoLisadoClientes() {
      const dialog: any = this.$refs.DialogClients;
      dialog.cambiarEstado();
    },
    async buscarCliente() {
      console.log("buscar");
      if (this.sale.doc_client) {
        const resultado = await FIND_CLIENT_BY_DOCUMENT(this.sale.doc_client);
        console.log(resultado);
        if (resultado) {
          this.cambiarCliente(resultado);
        } else {
          Swal.fire("Cliente no encontrado");
          this.sale.doc_client = "";
          this.sale.sur_client = "Clientes varios";
          this.sale.nam_client = "";
        }
      }
    },
    cambiarCliente(client: Client) {
      this.sale.doc_client = client.doc_num;
      this.sale.sur_client = client.surnames;
      this.sale.nam_client = client.names;
    },
    buscarProducto() {
      this.$emit("codigo_barras", this.bar_code);
    },
    registerSaleNotProduct() {
      if (this.productNotRegister.price !== null) {
        this.$emit("wihtout_product_register", this.productNotRegister);
      }
    },
    resetProduct() {
      this.bar_code = null;
    },
    resetProductNotRegister() {
      this.productNotRegister.description = "";
      this.productNotRegister.price = null;
    },
    handleKeyDown(field: string, event: KeyboardEvent) {
      if (event.key === "Tab") {
        event.preventDefault();
        if (field === "barcodeField") {
          const priceField = this.$refs.priceField as Vue & {
            focus: () => void;
          };
          if (priceField && typeof priceField.focus === "function") {
            priceField.focus();
          }
        } else if (field === "priceField") {
          const barcodeField = this.$refs.barcodeField as Vue & {
            focus: () => void;
          };
          if (barcodeField && typeof barcodeField.focus === "function") {
            barcodeField.focus();
          }
        }
      }
    },
    registrarVenta() {
      Swal.fire({
        title: "Registrar venta?",
        text: "La venta se registrara como confirmada!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Registrar!",
        cancelButtonText: `Cancelar!`,
      }).then((result) => {
        if (result.isConfirmed) {
          this.sale.pay_date = STRINT_TO_FECHA(this.fecha_pago);
          this.$emit("datos_cliente", this.sale);
          Swal.fire({
            icon: "success",
            title: "Registro exitoso",
            text: "La venta se registro exitosamente",
            showConfirmButton: false,
            timer: 800,
          });
          this.resetDatosVenta();
          this.$nextTick(() => {
            setTimeout(() => {
              if (this.$refs.barcodeField) {
                (this.$refs.barcodeField as HTMLInputElement).focus();
              }
            }, 100);
          });
        }
      });
    },
    resetDatosVenta() {
      this.sale.doc_client = "2222222";
      this.sale.nam_client = "Clientes varios";
      this.sale.sur_client = "";
      this.sale.sale_type = EPayTypeSale.CONTADO;
      this.sale.pay_date = new Date();
      this.sale.subtotal = 0;
      this.sale.discount = 0;
      this.sale.total = 0;
      this.sale.sales = [];
      this.fecha_pago = FECHA_TO_STRING_INPUT(new Date());
    },
    focusBarcodeField() {
      this.$nextTick(() => {
        setTimeout(() => {
          if (this.$refs.barcodeField) {
            (this.$refs.barcodeField as HTMLInputElement).focus();
          }
        }, 100);
      });
    },
  },
  mounted() {
    this.$nextTick(() => {
      setTimeout(() => {
        if (this.$refs.barcodeField) {
          (this.$refs.barcodeField as HTMLInputElement).focus();
        }
      }, 100);
    });
  },
  computed: {
    posicionFiltrada() {
      if (this.sale.nam_client === "Clientes varios") {
        return [this.tipos_venta[0]];
      } else {
        return this.tipos_venta;
      }
    },
  },
});
</script>
