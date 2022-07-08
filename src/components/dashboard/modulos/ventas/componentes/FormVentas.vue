<template>
  <v-card class="mb-2">
    <v-card-text>
      <h1 class="mx-auto text-center">Formulario para registro de ventas</h1>
    </v-card-text>
    <DialogClientes
      v-on:cliente="cambiarCliente($event)"
      ref="DialogClientes"
    />
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
                  v-model="venta.documento_cliente"
                  @focusout="buscarCliente(venta.documento_cliente)"
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
                v-model="venta.nombre_cliente"
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
                  v-model="venta.tipo_venta"
                  :error-messages="errors"
                />
              </validation-provider>
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-if="venta.tipo_venta === 'Credito'"
                label="Fecha de pago"
                prepend-icon="mdi-numeric"
                type="date"
                dense
                outlined
                clearable
                counter
                v-model="venta.fecha_pago"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6">
              <v-text-field
                label="Codigo del proyecto"
                prepend-icon="mdi-barcode-scan"
                type="number"
                dense
                outlined
                clearable
                counter
                v-model="codigo_barras"
                v-on:keyup.enter="buscarProducto(codigo_barras)"
                @focus="enfoque = true"
                @focusout="enfoque = false"
              />
            </v-col>
            <v-col cols="6">
              <v-chip :color="enfoque ? 'success' : 'red'">
                {{ enfoque ? "" : "Pistola no posicionada" }}
                <v-icon>
                  {{ enfoque ? "mdi-barcode-scan" : "mdi-barcode-scan" }}
                </v-icon>
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
                @click="enviarDatos"
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
import DialogClientes from "@/components/dashboard/modulos/ventas/componentes/DialogClientes.vue";
import { BUSCAR_CLIENTE_POR_DOCUMENTO } from "@/UseCases/ClienteUseCases";

export default Vue.extend({
  name: "FormVentas",
  components: { DialogClientes },
  data: () => ({
    codigo_barras: null,
    venta: {
      documento_cliente: 2222222,
      nombre_cliente: "Clientes varios",
      tipo_venta: "Contado",
      fecha_pago: null,
    },
    tipos_venta: TIPOS_VENTA,
    dialog_list: false,
    cliente: { nombres: "Clientes", apellidos: "varios", documento: 2222222 },
    enfoque: false,
  }),
  methods: {
    abrirDialogoLisadoClientes() {
      const dialog: any = this.$refs.DialogClientes;
      dialog.cambiarEstado();
    },
    async buscarCliente(documento: any) {
      const resultado = await BUSCAR_CLIENTE_POR_DOCUMENTO(documento);
      this.cambiarCliente(resultado);
    },
    cambiarCliente(cliente: any) {
      this.cliente = cliente;
      this.venta.documento_cliente = cliente.documento;
      this.venta.nombre_cliente = cliente.nombres + " " + cliente.apellidos;
    },
    buscarProducto(valor: any) {
      this.$emit("codigo_barras", valor);
      this.codigo_barras = null;
    },
    enviarDatos() {
      const datos = {
        documento_cliente: this.venta.documento_cliente,
        nombre_cliente: this.venta.nombre_cliente,
        tipo_factura: this.venta.tipo_venta,
        tipo: "venta",
        fecha_pago: this.venta.fecha_pago,
      };
      this.$emit("datos_cliente", datos);
    },
  },
});
</script>

<style scoped></style>
