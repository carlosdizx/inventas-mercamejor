<template>
  <v-card class="mb-2">
    <v-card-text>
      <h1 class="mx-auto text-center">Formulario para registro de ventas</h1>
    </v-card-text>
    {{ cliente }}
    <DialogClientes
      v-on:cliente="cambiarCliente($event)"
      ref="DialogClientes"
    />
    <v-card-text>
      <ValidationObserver ref="observer" v-slot="{ invalid }">
        <v-form>
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
                  dense
                  outlined
                  counter
                  v-model="venta.documento_cliente"
                  :error-messages="errors"
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
              <validation-provider
                v-slot="{ errors }"
                name="Tipo venta"
                rules="required"
                v-if="venta.tipo_venta === 'Credito'"
              >
                <v-text-field
                  label="Fecha de pago"
                  prepend-icon="mdi-numeric"
                  type="date"
                  dense
                  outlined
                  clearable
                  counter
                  v-model="venta.consecutivo"
                  :error-messages="errors"
                />
              </validation-provider>
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
                v-on:keyup.enter="buscarProducto($event.target.value)"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6">
              <v-btn color="info" block large>
                Agregar productos
                <v-icon>mdi-cart</v-icon>
              </v-btn>
            </v-col>
            <v-col cols="6">
              <v-btn color="success" block large :disabled="invalid">
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

export default Vue.extend({
  name: "FormVentas",
  components: { DialogClientes },
  data: () => ({
    venta: {
      documento_cliente: "",
      nombre_cliente: "",
      tipo_venta: "Contado",
    },
    tipos_venta: TIPOS_VENTA,
    columnas: [],
    dialog_list: false,
    cliente: null,
  }),
  methods: {
    abrirDialogoLisadoClientes() {
      const dialog: any = this.$refs.DialogClientes;
      dialog.cambiarEstado();
    },
    cambiarCliente(cliente: any) {
      this.cliente = cliente;
      this.venta.documento_cliente = cliente.documento;
      this.venta.nombre_cliente = cliente.nombres + " " + cliente.apellidos;
    },
    buscarProducto(valor: any) {
      this.$emit("codigo_barras", valor);
    },
  },
});
</script>

<style scoped></style>
