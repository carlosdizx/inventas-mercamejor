<template>
  <v-container>
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
                    type="number"
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
                    type="number"
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
      <v-dialog v-model="dialog">
        <v-card class="elevation-5">
          <v-card-title>Resultado de busqueda compras</v-card-title>
          <v-card-text>
            <v-data-table
              :headers="headers"
              :items="items"
              item-key="id"
              class="elevation-1"
            >
              <template v-slot:top>
                <v-text-field
                  v-model="search"
                  label="Buscar ventas"
                  class="mx-4"
                ></v-text-field>
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-dialog>
      <v-data-table> </v-data-table>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { COLUMNAS } from "@/models/ElementoCompra";
import { CONSULTAR_COMPRAS } from "@/services/consultas";
import Vue from "vue";

export default Vue.extend({
  name: "ConsultarCompras",
  data: () => ({
    headers: COLUMNAS,
    dialog: false,
    rangoFechaInicial: null,
    rangoFechaFinal: null,
    rangoProveedorInicial: null,
    rangoProveedorFinal: null,
    search: "",
    datos: [""],
  }),
  methods: {
    buscarCompras() {
      console.log("buscar");
      this.dialog = true;
    },
  },
  async created() {
    this.datos = [];
    console.log(
      await CONSULTAR_COMPRAS(new Date(2022, 5, 1), new Date(2022, 5, 30))
    );
  },
});
</script>
