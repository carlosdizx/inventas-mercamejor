<template>
  <v-container>
    <v-card>
      <v-card-title>Cuentas por pagar</v-card-title>
      <v-card-text>
        <v-row>
          <v-container>
            <v-col cols="2">
              <v-text-field
                type="date"
                label="Ingrese fecha pago"
              ></v-text-field>
            </v-col>
            <v-btn @click="mostrar = true" class="primary">Buscar compra</v-btn>
            <v-dialog v-model="mostrar">
              <v-card>
                <Tabla
                  coleccion="compras"
                  titulo="Compras"
                  :columnas="columnas"
                  seleccion
                  no-editar
                  no-crear
                  NoEditar
                  @enviarSeleccionado="seleccionarCompra($event)"
                  :consulta="[['tipo_pago', '==', 'Credito']]"
                ></Tabla>
              </v-card>
              <div class="mt-6 mb-6 text-center">
                <v-btn @click="mostrar = false" class="primary">Cerrar</v-btn>
              </div>
            </v-dialog>
          </v-container>
        </v-row>
        <v-simple-table>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">Cédula</th>
                <th class="text-left">Nombre</th>
                <th class="text-left">Valor</th>
                <th class="text-left">Cruzar</th>
                <th class="text-left">Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>name</td>
                <td>categoria</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import { CONSULTA_DATOS } from "@/services/crud";

import { COLUMNAS } from "@/models/CuentasPorPagar";

import Tabla from "@/components/crud/Tabla.vue";

export default Vue.extend({
  name: "CuentasPorPagar",
  data: () => ({
    mostrar: false,
    columnas: COLUMNAS,
  }),
  components: {
    Tabla,
  },
  methods: {
    async getCuentasPorPagar() {
      const result = await CONSULTA_DATOS("compras", [
        ["tipo_pago", "==", "Credito"],
      ]);
      console.log(result);
    },
    seleccionarCompra(item: any) {
      console.log(item);
    },
  },
});
</script>
