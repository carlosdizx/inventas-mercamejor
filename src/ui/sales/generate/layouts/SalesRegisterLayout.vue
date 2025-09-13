<template>
    <v-card-text class="pa-6">
      <h1 class="mx-auto text-center mb-6" style="color: #333; font-weight: 500;">Formulario para registro de ventas</h1>
      <DialogClients v-on:cliente="cambiarCliente($event)" ref="dialogClientsRef" />
    </v-card-text>
    <v-card-text class="pa-6 pt-0">
      <VeeForm v-slot="{ errors }">
        <v-form @submit.prevent="">
          <v-row>
            <v-col cols="12" class="pb-2">
                <v-text-field
                  label="Documento de identidad"
                  clearable
                  outlined
                  v-model="docClient"
                  @keyup.enter="buscarCliente"
                  :error-messages="errors"
                  style="background-color: #fafafa;"
                  class="custom-field"
                  autocomplete="off"
                  :disabled="nombreCompletoCliente !== 'Clientes Varios'"
                >
                  <template #append>
                    <v-icon 
                      @click="abrirDialogoLisadoClientes"
                      style="cursor: pointer; color: #666; font-size: 28px;"
                      class="search-icon"
                      size="large"
                    >
                      mdi-magnify
                    </v-icon>
                  </template>
                </v-text-field>
            </v-col>
            <v-col cols="12" class="pb-2">
              <v-card 
                class="client-info-card"
                :class="{ 'resaltado-verde': nombreCompletoCliente !== 'Clientes Varios' }"
                elevation="0"
                outlined
              >
              <v-card-text class="pa-3">
                <div class="d-flex align-center justify-space-between w-100">
                  
                  <div class="d-flex align-center">
                    <v-icon 
                      color="primary" 
                      class="mr-3" 
                      v-if="nombreCompletoCliente !== 'Clientes Varios'"
                    >
                      mdi-account
                    </v-icon>
                    <span class="text-body-1">{{ nombreCompletoCliente }}</span>
                  </div>

                  <v-btn
                    v-if="nombreCompletoCliente !== 'Clientes Varios'"
                    icon
                    size="small"
                    color="error"
                    @click="resetClient"
                  >
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>

                </div>
                </v-card-text>
              </v-card>
            </v-col>
            <v-col cols="12" class="pb-2">
                <v-select
                  prepend-icon="mdi-home"
                  :items="posicionFiltrada"
                  label="Tipos de venta"
                  outlined
                  v-model="sale.sale_type"
                  :error-messages="errors"
                  style="background-color: #fafafa;"
                />
            </v-col>
          </v-row>
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
                v-model="bar_code"
                autocomplete="off"
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
      </VeeForm>
    </v-card-text>
</template>

<script lang="ts">
import { useSaleGenerateStore } from '@/ui/sales/generate/store/SalesGenerateViewStore'
import { defineComponent, ref, computed, onMounted, onBeforeUnmount } from "vue";
import Swal from "sweetalert2";
import { TIPOS_VENTA } from "@/generals/Constantes";
import DialogClients from "../layouts/DialogClients.vue";
import { FIND_CLIENT_BY_DOCUMENT } from "@/domain/useCase/client/clientUseCase";
import {
  FECHA_TO_STRING_INPUT,
  STRINT_TO_FECHA
} from "@/generals/procesamientos";
import { EPayTypeSale} from "@/domain/model/constants/Constants";
import { Client } from "@/domain/model/client/Client";

export default defineComponent({
  name: "SalesGenerateView",
  components: { DialogClients },
  emits: ['codigo_barras', 'wihtout_product_register', 'datos_cliente', 'save_sale_without_factura'],
  setup(props, { emit }) {
    const docClient = ref<string>("");
    const saleStore = useSaleGenerateStore()
    const barcodeField = ref<any>(null);
    const priceField = ref<any>(null);
    const descripField = ref<any>(null);
    const dialogClientsRef = ref<any>(null);
    const enterCount = ref(0);
    const bar_code = ref(null);
    const sale = saleStore.currentSale;
    const productNotRegister = ref({
      price: null,
      description: "",
    });
    const fecha_pago = ref(FECHA_TO_STRING_INPUT(new Date()));
    const tipos_venta = ref(TIPOS_VENTA);
    const dialog_list = ref(false);
    const enfoque = ref(false);

    const abrirDialogoLisadoClientes = () => {
      if (dialogClientsRef.value) {
        dialogClientsRef.value.abrirModal();
      }
    };

    const resetClient = () => {
      sale.doc_client = "";
      sale.sur_client = "";
      sale.nam_client = "";
    };

    const focusBarCode = () => {
      barcodeField.value.focus()
    }
    
    const buscarCliente = async () => {
      if (docClient.value !== "") {
        const resultado = await FIND_CLIENT_BY_DOCUMENT(docClient.value);
        if (resultado) {
          cambiarCliente(resultado);
          focusBarCode();
        } else {
          Swal.fire({
            title: "Cliente no encontrado",
            icon: "warning",
            showConfirmButton: false,
            timer: 500,
            timerProgressBar: false
          });
          resetClient();
        }
      }
    }; 

    const cambiarCliente = (client: Client) => {
      docClient.value = client.doc_num;
      sale.doc_client = client.doc_num;
      sale.sur_client = client.surnames;
      sale.nam_client = client.names;
    };

    const buscarProducto = () => {
      emit('codigo_barras', bar_code.value);
      bar_code.value = null;
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
          enterCount.value = 0;
        }
        if (field === "priceField") {
          setTimeout(() => {
            if (priceField.value && typeof priceField.value.focus === "function") {
              priceField.value.focus();
            }
          }, 500);
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
          sale.pay_date = STRINT_TO_FECHA(FECHA_TO_STRING_INPUT(new Date()));
          emit('datos_cliente', sale);
          Swal.fire({
            icon: "success",
            title: "Registro exitoso",
            text: "La venta se registro exitosamente",
            showConfirmButton: false,
            timer: 800,
          });
          saleStore.clearSale();
          focusBarCode();
        }
      });
      focusBarCode();
    };

    const posicionFiltrada = computed(() => {
      if(sale.nam_client === "") {
        return [EPayTypeSale.CONTADO];
      }
      return tipos_venta.value;
    });

    const nombreCompletoCliente = computed(() => {
      if (sale.nam_client && sale.sur_client) {
        return `${sale.nam_client} ${sale.sur_client}`;
      }
      return sale.nam_client || 'Clientes Varios';
    });

    const handleKeyDownn = (e: KeyboardEvent) => {
      if(e.key === "F1") {
        e.preventDefault();
        emit('save_sale_without_factura', sale);
      }
      else if(e.key === "F2") {
        e.preventDefault();
        focusBarCode();
      }
      else if (e.key === "F12") {
        e.preventDefault(); // evita que abra las DevTools
        dialogClientsRef.value.cambiarEstado();
      }
    };

    onMounted(() => {
      window.addEventListener("keydown", handleKeyDownn);
      if (barcodeField.value && typeof barcodeField.value.focus === "function") {
        focusBarCode();
      }
    });

    onBeforeUnmount(() => {
      window.removeEventListener("keydown", handleKeyDownn);
    });

    return {
      docClient,
      saleStore,
      barcodeField,
      priceField,
      descripField,
      dialogClientsRef,
      enterCount,
      bar_code,
      sale,
      productNotRegister,
      fecha_pago,
      tipos_venta,
      dialog_list,
      enfoque,
      posicionFiltrada,
      nombreCompletoCliente,
      focusBarCode,
      abrirDialogoLisadoClientes,
      buscarCliente,
      resetClient,
      cambiarCliente,
      buscarProducto,
      registerSaleNotProduct,
      resetProduct,
      resetProductNotRegister,
      handleKeyDown,
      registrarVenta
    };
  },
});
</script>

<style scoped>
/* Estilos para el campo personalizado */
.custom-field {
  border-radius: 8px !important;
}

.custom-field .v-input__control .v-input__slot {
  border: 1px solid #e0e0e0 !important;
  border-radius: 8px !important;
  box-shadow: none !important;
  background-color: #fafafa !important;
}

.custom-field .v-input__control .v-input__slot:hover {
  border-color: #bdbdbd !important;
}

.custom-field .v-input__control .v-input__slot.v-input__slot--focused {
  border-color: #1976d2 !important;
  box-shadow: 0 0 0 2px rgba(25, 118, 210, 0.1) !important;
}

.custom-field .v-label {
  color: #666 !important;
  font-weight: 400 !important;
}

.custom-field .v-input__icon--prepend .v-icon {
  color: #666 !important;
}

.custom-field.v-input--is-disabled .v-input__control .v-input__slot {
  background-color: #f5f5f5 !important;
  border-color: #e0e0e0 !important;
}

.custom-field.v-input--is-disabled .v-label {
  color: #999 !important;
}

.custom-field.v-input--is-disabled .v-input__icon--prepend .v-icon {
  color: #999 !important;
}

/* Estilos para el ícono de búsqueda */
.search-icon {
  cursor: pointer !important;
  color: #666 !important;
  font-size: 28px !important;
  transition: color 0.2s ease !important;
  padding: 8px !important;
  margin: 0 auto !important;
}

.search-icon:hover {
  color: #1976d2 !important;
}

/* Contenedor del ícono de búsqueda */
.custom-field .v-input__append {
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  padding: 0 16px !important;
  min-width: 56px !important;
  margin-right: 8px !important;
}

/* Tarjeta de información del cliente */
.client-info-card {
  border-radius: 8px !important;
  border: 1px solid #e0e0e0 !important;
  background-color: #fafafa !important;
}

.resaltado-verde {
  border: 1px solid #4caf50;   /* borde verde */
  background-color: #e8f5e9;   /* verde claro */
  color: #2e7d32;              /* texto verde */
}
</style>

