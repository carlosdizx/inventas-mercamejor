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
            <v-col cols="6">
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
                  v-model="venta.doc_cliente"
                  @focusout="buscarCliente()"
                  :error-messages="errors"
                  autofocus
                />
              </validation-provider>
            </v-col>
            <v-col color="6">
              <v-text-field
                label="Nombre cliente"
                prepend-icon="mdi-account"
                dense
                outlined
                counter
                :value="`${venta.nom_cliente + ' ' + venta.ape_cliente}`"
                readonly
                disabled
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6">
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
                  v-model="venta.tipo_compra"
                  :error-messages="errors"
                />
              </validation-provider>
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-if="venta.tipo_compra === 'Credito'"
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
            <v-col cols="6">
              <v-text-field
                label="Codigo del producto o servicio"
                prepend-icon="mdi-barcode-scan"
                type="number"
                dense
                outlined
                clearable
                counter
                v-model.number="codigo_barras"
                @input="buscarProducto()"
                @focus="enfoque = true"
                @focusout="enfoque = false"
              />
            </v-col>
            <v-col cols="6">
              <v-chip :color="enfoque ? 'success' : 'red'">
                {{ enfoque ? "" : "Pistola no posicionada" }}
                <v-icon>mdi-barcode-scan</v-icon>
              </v-chip>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6">
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
import { ETiposContadoCredito, TIPOS_VENTA } from "@/generals/Constantes";
import DialogClients from "@/components/dashboard/modules/sales/components/DialogClients.vue";
import { FIND_CLIENT_BY_DOCUMENT } from "@/domain/useCase/client/clientUseCase";
import { IEstadoVenta, IVenta } from "@/models/Venta";
import {
  FECHA_TO_STRING_INPUT,
  STRINT_TO_FECHA,
} from "@/generals/procesamientos";
import { IProductoVenta } from "@/models/ProductoVenta";
import { Client } from "@/domain/model/client/Client";

export default Vue.extend({
  name: "SalesForm",
  components: { DialogClients },
  data: () => ({
    codigo_barras: null,
    venta: {
      doc_cliente: "2222222",
      nom_cliente: "Clientes varios",
      ape_cliente: "",
      tipo_venta: ETiposContadoCredito.CONTADO,
      fecha_pago: new Date(),
      subtotal: 0,
      descuento: 0,
      total: 0,
      caja: "",
      cod_factura: "",
      created_at: new Date(),
      fec_documento: new Date(),
      fecha_llegada: new Date(),
      impuesto: 0,
      tipo_compra: ETiposContadoCredito.CONTADO,
      tipo_pago: "",
      updated_at: new Date(),
      ventas: [] as Array<IProductoVenta>,
      estado: IEstadoVenta.APROBADO,
    } as IVenta,
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
      const resultado = await FIND_CLIENT_BY_DOCUMENT(this.venta.doc_cliente);
      if (resultado) {
        this.cambiarCliente(resultado);
      }
    },
    cambiarCliente(client: Client) {
      this.venta.doc_cliente = client.doc_num;
      this.venta.ape_cliente = client.surnames;
      this.venta.nom_cliente = client.names;
    },
    buscarProducto() {
      this.$emit("codigo_barras", this.codigo_barras);
    },
    resetProduct() {
      this.codigo_barras = null;
    },
    registrarVenta() {
      this.venta.fecha_pago = STRINT_TO_FECHA(this.fecha_pago);
      this.$emit("datos_cliente", this.venta);
      this.resetDatosVenta();
    },
    resetDatosVenta() {
      this.venta.doc_cliente = "2222222";
      this.venta.nom_cliente = "Clientes varios";
      this.venta.ape_cliente = "";
      this.venta.tipo_compra = ETiposContadoCredito.CONTADO;
      this.venta.fecha_pago = new Date();
      this.venta.subtotal = 0;
      this.venta.descuento = 0;
      this.venta.total = 0;
      this.venta.ventas = [];
      this.fecha_pago = FECHA_TO_STRING_INPUT(new Date());
    },
  },
});
</script>

<style scoped></style>
