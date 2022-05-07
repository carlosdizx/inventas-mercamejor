<template>
  <v-container>
    <BuscarElemento />

    <v-card>
      <v-card-title class="mr-5 ml-5">Consultar compras</v-card-title>
      <ValidationObserver ref="observer" v-slot="{ invalid }">
        <v-form @submit.prevent="crearCuenta">
          <v-card-text>
            <v-row class="ml-6 mr-6">
              <v-col>
                <v-text-field
                  label="Ingrese fecha inicial de compras"
                  v-model="rangoFechaInicial"
                  type="date"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              <v-col>
                <v-text-field
                  label="Ingrese fecha Final de compras"
                  v-model="rangoFechaFinal"
                  type="date"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row class="ml-6 mr-6">
              <v-col>
                <validation-provider type="date" name="Fecha de Compra">
                  <v-text-field
                    label="Documento Inicial de proveedores"
                    v-model="rangoProveedorInicial"
                    type="date"
                    outlined
                    dense
                  ></v-text-field>
                </validation-provider>
              </v-col>
              <v-col>
                <validation-provider type="date" name="Fecha de Compra">
                  <v-text-field
                    label="Documento Inicial de proveedores"
                    v-model="rangoProveedorFinal"
                    type="date"
                    outlined
                    dense
                  ></v-text-field>
                </validation-provider>
              </v-col>
            </v-row>
            <v-row class="mr-5 ml-5">
              <v-col>
                <v-btn
                  @click="buscarCompras()"
                  x-large
                  dark
                  class="color_a mb-3"
                  block
                  outlined
                  dense
                  >Buscar Compras</v-btn
                >
              </v-col>
            </v-row>
          </v-card-text>
        </v-form>
        <v-col v-if="!invalid">.</v-col>
      </ValidationObserver>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";

import BuscarElemento from "@/components/crud/BuscarElemento.vue";

export default Vue.extend({
  name: "ConsultarCompras",
  components: { BuscarElemento },
  data: () => ({
    rangoFechaInicial: null,
    rangoFechaFinal: null,
    rangoProveedorInicial: null,
    rangoProveedorFinal: null,
  }),
  methods: {
    buscarCompras() {
      console.log("buscar");
    },
  },
});
</script>
