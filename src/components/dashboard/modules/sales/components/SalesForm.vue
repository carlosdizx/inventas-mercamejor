<template>
  <v-card class="mb-2">
    <v-card-text>
      <h1 class="mx-auto text-center">Formulario para registro de ventas</h1>
    </v-card-text>
    <DialogClients v-on:cliente="cambiarCliente($event)" ref="DialogClients" />
    <v-card-text>
      <ValidationObserver ref="observer" v-slot="{ invalid }">
        <v-form @submit.prevent="">
          <v-row>
            <v-col cols="12" md="6">
              <validation-provider
                v-slot="{ errors }"
                name="Documento del cliente"
                rules="required|min:6|max:20"
              >
                <v-text-field
                  label="Documento de identidad"
                  prepend-icon="mdi-card-account-details"
                  append-outer-icon="mdi-magnify"
                  @click:append-outer="abrirDialogoLisadoClientes"
                  clearable
                  dense
                  outlined
                  counter
                  v-model="sale.doc_client"
                  @focusout="buscarCliente()"
                  :error-messages="errors"
                  autofocus
                />
              </validation-provider>
            </v-col>
            <v-col cols="12" md="6">
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
          </v-row>
          <v-row>
            <v-col cols="12" md="6">
              <validation-provider
                v-slot="{ errors }"
                name="Tipo venta"
                rules="required"
              >
                <v-select
                  prepend-icon="mdi-home"
                  :items="tipos_venta"
                  label="Tipos de venta"
                  solo
                  outlined
                  dense
                  v-model="sale.shop_type"
                  :error-messages="errors"
                />
              </validation-provider>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                v-if="sale.shop_type === 'Credito'"
                label="Fecha de pago"
                prepend-icon="mdi-numeric"
                type="date"
                dense
                outlined
                clearable
                counter
                v-model="fecha_pago"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field
                label="Codigo del producto o servicio"
                prepend-icon="mdi-barcode-scan"
                type="number"
                dense
                outlined
                clearable
                counter
                v-model.number="bar_code"
                @input="buscarProducto()"
                @focus="enfoque = true"
                @focusout="enfoque = false"
              />
            </v-col>
            <v-col cols="12" md="6" class="text-center">
              <v-chip :color="enfoque ? 'success' : 'red'">
                {{ enfoque ? "" : "Pistola no posicionada" }}
                <v-icon>mdi-barcode-scan</v-icon>
              </v-chip>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-btn
                color="success"
                block
                large
                :disabled="invalid"
                @click="registrarVenta"
              >
                Registrar venta
                <v-icon>mdi-currency-usd</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </ValidationObserver>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
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
      doc_client: "2222222",
      nam_client: "Clientes varios",
      sur_client: "",
      cod_invoice: "",
      shop_type: EPayTypeSale.CONTADO,
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
      const resultado = await FIND_CLIENT_BY_DOCUMENT(this.sale.doc_client);
      if (resultado) {
        this.cambiarCliente(resultado);
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
    resetProduct() {
      this.bar_code = null;
    },
    registrarVenta() {
      this.sale.pay_date = STRINT_TO_FECHA(this.fecha_pago);
      this.$emit("datos_cliente", this.sale);
      this.resetDatosVenta();
    },
    resetDatosVenta() {
      this.sale.doc_client = "2222222";
      this.sale.nam_client = "Clientes varios";
      this.sale.sur_client = "";
      this.sale.shop_type = EPayTypeSale.CONTADO;
      this.sale.pay_date = new Date();
      this.sale.subtotal = 0;
      this.sale.discount = 0;
      this.sale.total = 0;
      this.sale.sales = [];
      this.fecha_pago = FECHA_TO_STRING_INPUT(new Date());
    },
  },
});
</script>

<style scoped></style>
