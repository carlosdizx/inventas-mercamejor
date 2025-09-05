<template>
  <v-card class="mb-2">
    <v-card-text>
      <h1 class="mx-auto text-center">Formulario para registro de ventas</h1>
    </v-card-text>
    <DialogClients v-on:cliente="cambiarCliente($event)" ref="DialogClients" />
    <v-card-text>
      <VeeForm @submit="onSubmit" v-slot="{ errors }">
        <v-form @submit.prevent="">
          <v-col>
            <VeeField
              v-slot="{ field, errors }"
              name="doc_client"
              rules="required|min:6|max:20"
            >
              <v-text-field
                v-bind="field"
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
            </VeeField>
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
            <VeeField
              v-slot="{ field, errors }"
              name="sale_type"
              rules="required"
            >
              <v-select
                v-bind="field"
                prepend-icon="mdi-home"
                :items="posicionFiltrada"
                label="Tipos de venta"
                solo
                outlined
                dense
                v-model="sale.sale_type"
                :error-messages="errors"
              />
            </VeeField>
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
      </VeeForm>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { useSaleGenerateStore } from '@/ui/sales/generate/store/SalesGenerateViewStore'
import { ProductSale } from '@/domain/model/sales/generate/model/product/ProductSale'

import { defineComponent, ref, computed, onMounted, onBeforeUnmount } from "vue";
import Swal from "sweetalert2";
import { TIPOS_VENTA } from "@/generals/Constantes";
import DialogClients from "../layouts/DialogClients.vue";
import { FIND_CLIENT_BY_DOCUMENT } from "@/domain/useCase/client/clientUseCase";
import {
  FECHA_TO_STRING_INPUT,
} from "@/generals/procesamientos";
import { EPayTypeSale} from "@/domain/model/constants/Constants";
import { Client } from "@/domain/model/client/Client";

export default defineComponent({
  name: "SalesGenerateView",
  components: { DialogClients },
  emits: ['codigo_barras', 'wihtout_product_register', 'datos_cliente', 'save_sale_without_factura'],
  setup(props, { emit }) {
    const saleStore = useSaleGenerateStore()
    const barcodeField = ref(null);
    const priceField = ref(null);
    const descripField = ref(null);
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

    const onSubmit = (values: any) => {
      console.log('Form submitted:', values);
    };

    const abrirDialogoLisadoClientes = () => {
      const dialog = refs.DialogClients;
      dialog.cambiarEstado();
    };

    const buscarCliente = async () => {
      if (sale.doc_client) {
        const resultado = await FIND_CLIENT_BY_DOCUMENT(sale.doc_client);
        if (resultado) {
          cambiarCliente(resultado);
        } else {
          Swal.fire("Cliente no encontrado");
          sale.doc_client = "";
          sale.sur_client = "Clientes varios";
          sale.nam_client = "";
        }
      }
    };

    const cambiarCliente = (client: Client) => {
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
      
      emit('save_sale_without_factura', sale);
    };

    const posicionFiltrada = computed(() => {
      return tipos_venta.value.filter((tipo: EPayTypeSale) => tipo.valueOf() !== EPayTypeSale.CREDITO);
    });

    onMounted(() => {
      if (barcodeField.value && typeof barcodeField.value.focus === "function") {
        barcodeField.value.focus();
      }
    });

    onBeforeUnmount(() => {
      // Cleanup if needed
    });

    return {
      saleStore,
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
      posicionFiltrada,
      abrirDialogoLisadoClientes,
      buscarCliente,
      cambiarCliente,
      buscarProducto,
      registerSaleNotProduct,
      resetProduct,
      resetProductNotRegister,
      handleKeyDown,
      registrarVenta,
      onSubmit
    };
  },
});
</script>
