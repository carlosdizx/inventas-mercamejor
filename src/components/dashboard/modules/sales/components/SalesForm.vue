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
                :disabled="
                  productNotRegister.price != null &&
                  productNotRegister.price > 999999
                "
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
                ref="descripField"
                label="Digite Descripción"
                clearable
                dense
                outlined
                counter
                type="string"
                v-model="productNotRegister.description"
                @keyup.enter="registerSaleNotProduct"
                @keydown="handleKeyDown('descripField', $event)"
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
import { defineComponent, ref, computed, onMounted, onBeforeUnmount } from "vue";
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

export default defineComponent({
  name: "SalesForm",
  components: { DialogClients },
  emits: ['codigo_barras', 'wihtout_product_register', 'datos_cliente', 'save_sale_without_factura'],
  setup(props, { emit }) {
    const barcodeField = ref(null);
    const priceField = ref(null);
    const descripField = ref(null);
    const enterCount = ref(0);
    const bar_code = ref(null);
    const sale = ref({
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
    } as Sale);
    const productNotRegister = ref({
      price: null,
      description: "",
    });
    const fecha_pago = ref(FECHA_TO_STRING_INPUT(new Date()));
    const tipos_venta = ref(TIPOS_VENTA);
    const dialog_list = ref(false);
    const enfoque = ref(false);

    const abrirDialogoLisadoClientes = () => {
      const dialog = refs.DialogClients;
      dialog.cambiarEstado();
    };

    const buscarCliente = async () => {
      if (sale.value.doc_client) {
        const resultado = await FIND_CLIENT_BY_DOCUMENT(sale.value.doc_client);
        if (resultado) {
          cambiarCliente(resultado);
        } else {
          Swal.fire("Cliente no encontrado");
          sale.value.doc_client = "";
          sale.value.sur_client = "Clientes varios";
          sale.value.nam_client = "";
        }
      }
    };

    const cambiarCliente = (client: Client) => {
      sale.value.doc_client = client.doc_num;
      sale.value.sur_client = client.surnames;
      sale.value.nam_client = client.names;
    };

    const buscarProducto = () => {
      emit('codigo_barras', bar_code.value);
    };

    const registerSaleNotProduct = () => {
      if (productNotRegister.value.price !== null) {
        emit('wihtout_product_register', productNotRegister.value);
      }
    };

    const resetProduct = () => {
      bar_code.value = null;
    };

    const resetProductNotRegister = () => {
      productNotRegister.value.description = "";
      productNotRegister.value.price = null;
    };

    const handleKeyDown = (field: string, event: KeyboardEvent) => {
      if (event.key === "Enter") {
        enterCount.value++;
        if (enterCount.value === 2) {
          buscarProducto();
          enterCount.value = 0;
        }
        if (field === "priceField") {
          setTimeout(() => {
            if (priceField.value && typeof priceField.value.focus === "function") {
              priceField.value.focus();
            }
          }, 500);
        }
      } else {
        enterCount.value = 0;
      }
      if (event.key === "Tab") {
        event.preventDefault();
        if (field === "barcodeField") {
          if (priceField.value && typeof priceField.value.focus === "function") {
            priceField.value.focus();
            productNotRegister.value.price = null;
          }
        } else if (field === "priceField") {
          if (barcodeField.value && typeof barcodeField.value.focus === "function") {
            barcodeField.value.focus();
          }
        } else if (field === "descripField") {
          if (barcodeField.value && typeof barcodeField.value.focus === "function") {
            barcodeField.value.focus();
            productNotRegister.value.price = null;
          }
        }
      }
    };

    const registrarVenta = () => {
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
          sale.value.pay_date = STRINT_TO_FECHA(fecha_pago.value);
          emit('datos_cliente', sale.value);
          Swal.fire({
            icon: "success",
            title: "Registro exitoso",
            text: "La venta se registro exitosamente",
            showConfirmButton: false,
            timer: 800,
          });
          resetDatosVenta();
          nextTick(() => {
            setTimeout(() => {
              if (barcodeField.value) {
                barcodeField.value.focus();
              }
            }, 100);
          });
        }
      });
    };

    const resetDatosVenta = () => {
      sale.value.doc_client = "2222222";
      sale.value.nam_client = "Clientes varios";
      sale.value.sur_client = "";
      sale.value.sale_type = EPayTypeSale.CONTADO;
      sale.value.pay_date = new Date();
      sale.value.subtotal = 0;
      sale.value.discount = 0;
      sale.value.total = 0;
      sale.value.sales = [];
      fecha_pago.value = FECHA_TO_STRING_INPUT(new Date());
    };

    const focusBarcodeField = () => {
      nextTick(() => {
        setTimeout(() => {
          if (barcodeField.value) {
            barcodeField.value.focus();
          }
        }, 100);
      });
    };

    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === "F1") {
        event.preventDefault();
        emit('save_sale_without_factura', sale.value);
      }
    };

    onMounted(() => {
      nextTick(() => {
        setTimeout(() => {
          if (barcodeField.value) {
            barcodeField.value.focus();
          }
        }, 100);
      });
      window.addEventListener("keydown", handleKeyPress);
    });

    onBeforeUnmount(() => {
      window.removeEventListener("keydown", handleKeyPress);
    });

    const posicionFiltrada = computed(() => {
      if (sale.value.nam_client === "Clientes varios") {
        return [tipos_venta.value[0]];
      } else {
        return tipos_venta.value;
      }
    });

    return {
      barcodeField,
      priceField,
      descripField,
      enterCount,
      bar_code,
      sale,
      productNotRegister,
      fecha_pago,
      tipos_venta,
      dialog_list,
      enfoque,
      abrirDialogoLisadoClientes,
      buscarCliente,
      cambiarCliente,
      buscarProducto,
      registerSaleNotProduct,
      resetProduct,
      resetProductNotRegister,
      handleKeyDown,
      registrarVenta,
      resetDatosVenta,
      focusBarcodeField,
      handleKeyPress,
      posicionFiltrada
    };
  }
});
</script>
