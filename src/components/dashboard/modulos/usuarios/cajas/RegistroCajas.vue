<template>
  <v-card-title>
    <v-container>
      <h3>Registro cajas</h3>
      <v-row>
        <v-col sm="6" md="6">
          <v-text-field
            v-model="caja"
            label="Nombre de Caja"
            required
          ></v-text-field>
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
            >Registrar Caja</v-btn
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
  name: "RegistroCajas",
  data: () => ({
    empleados: [],
    emailEmpleado: "",
    caja: "",
  }),
  methods: {
    async traerEmpleados() {
      try {
        this.empleados = await LISTAREMPLEADOS();
      } catch (error) {
        console.log(error);
      }
    },
    obtenerdatosEmpleado(item: any) {
      return item.nombres + " " + item.apellidos;
    },
    async registrarCaja() {
      await REGISTRARCAJA(this.emailEmpleado, this.caja);
      this.traerEmpleados();
      this.limpiarDatos();
    },
    limpiarDatos() {
      this.emailEmpleado = "";
      this.caja = "";
    },
  },
  created() {
    this.traerEmpleados();
  },
});
</script>
