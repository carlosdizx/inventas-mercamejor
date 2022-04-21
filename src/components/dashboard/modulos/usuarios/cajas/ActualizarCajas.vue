<template>
  <v-card-title>
    <v-container>
      <h3>Actualizar cajas</h3>
      <v-row>
        <v-col sm="6" md="6">
          <v-select label="Seleccione Caja"></v-select>
        </v-col>
        <v-col sm="6" md="5">
          <v-select
            :item-text="obtenerdatosEmpleado"
            item-value="email"
            v-model="emailEmpleado"
            label="Selecciona empleado"
            :items="empleados"
          ></v-select>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-btn :disabled="!caja || !emailEmpleado" @click="registrarCaja()"
            >Actualizar Caja</v-btn
          >
        </v-col>
      </v-row>
    </v-container>
  </v-card-title>
</template>

<script lang="ts">
import Vue from "vue";

import { LISTAREMPLEADOS, REGISTRARCAJA } from "@/services/usuarios";

export default Vue.extend({
  name: "ActualizarCajas",
  data: () => ({
    algo: "hola",
    registro: true,
    empleados: [],
  }),
  methods: {
    async traerEmpleados() {
      try {
        this.empleados = await LISTAREMPLEADOS();
      } catch (error) {
        console.log(error);
      }
    },
    async traerCajas() {
      console.log("traerEmpleados");
    },
  },
});
</script>
