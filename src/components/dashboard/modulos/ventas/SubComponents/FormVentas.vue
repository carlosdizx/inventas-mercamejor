<template>
  <v-card class="mb-2">
    <v-card-text>
      <h1 class="mx-auto text-center">Formulario para registro de ventas</h1>
    </v-card-text>
    <v-card-text>
      <ValidationObserver ref="observer" v-slot="{ invalid }">
        <v-form>
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
          <validation-provider
            v-slot="{ errors }"
            name="Documento del cliente"
            rules="required|min:6|max:20"
          >
            <v-text-field
              label="Documento de identidad"
              prepend-icon="mdi-card-account-details"
              append-outer-icon="mdi-magnify"
              @click:append-outer="buscarCliente(venta.documento_cliente)"
              dense
              outlined
              counter
              v-model="venta.documento_cliente"
              :error-messages="errors"
            />
          </validation-provider>
          <v-row>
            <v-col cols="6">
              <v-text-field
                label="Consecutivo de factura"
                prepend-icon="mdi-numeric"
                dense
                outlined
                counter
                v-model="venta.consecutivo"
                readonly
                disabled
              />
            </v-col>
            <v-col cols="6"></v-col>
          </v-row>
          <!--------------------------------- Hasta aquí los campos ------------------------------->
          <v-btn color="success" block large :disabled="invalid">
            <v-icon>mdi-currency-usd</v-icon>
            Registrar venta
            <v-icon>mdi-currency-usd</v-icon>
          </v-btn>
        </v-form>
      </ValidationObserver>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "FormVentas",
  components: {},
  data: () => ({
    venta: {},
    columnas: [],
  }),
  methods: {
    buscarCliente(documento: string) {
      console.log("Abriendo tabla de listado");
      console.log("Buscando '" + documento + "' ...");
    },
  },
});
</script>

<style scoped></style>
