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
          <v-btn :disabled="validarRegistro" @click="registrarCaja()"
            >Registrar Caja</v-btn
          >
        </v-col>
      </v-row>
    </v-container>
  </v-card-title>
</template>

<script lang="ts">
import Vue from "vue";

import Swal from "sweetalert2";

import {
  LISTAREMPLEADOS,
  REGISTRARCAJA,
  LISTARTODASLASCAJAS,
} from "@/services/usuarios";

export default Vue.extend({
  name: "RegistroCajas",
  data: () => ({
    empleados: [],
    emailEmpleado: "",
    caja: "",
    todasCajas: [],
  }),
  computed: {
    validarRegistro() {
      let value = false;
      if (!this.emailEmpleado || !this.caja) {
        value = true;
      }
      if (this.caja.length < 3) {
        value = true;
      }
      this.todasCajas.forEach((val: any) => {
        if (val.caja === this.caja) {
          value = true;
        }
      });
      return value;
    },
  },
  methods: {
    async traerEmpleados() {
      try {
        this.empleados = await LISTAREMPLEADOS();
      } catch (error) {
        console.log(error);
      }
    },
    async listarCajas() {
      //console.log(await LISTARTODASLASCAJAS());
      this.todasCajas = await LISTARTODASLASCAJAS();
    },
    obtenerdatosEmpleado(item: any) {
      return item.nombres + " " + item.apellidos;
    },
    async registrarCaja() {
      const caja = {
        caja: this.caja,
        fechaCreacion: new Date().getTime(),
      };
      await REGISTRARCAJA(this.emailEmpleado, caja);
      this.traerEmpleados();
      this.limpiarDatos();
      await Swal.fire({
        timer: 3000,
        title: "Registro de caja exitos",
        text: "Exito de registro",
        icon: "success",
        showConfirmButton: false,
      });
    },
    limpiarDatos() {
      this.emailEmpleado = "";
      this.caja = "";
    },
  },
  created() {
    this.traerEmpleados();
    this.listarCajas();
  },
});
</script>
