<template>
  <v-container>
    <v-card class="ml-4 mr-4">
      <v-card-title>
        <h3>Registro cajas</h3>
      </v-card-title>
      <v-card-text class="ml-3 mr-3">
        <v-row>
          <v-col sm="6" md="6">
            <v-text-field
              v-model="caja"
              label="Nombre de Caja"
              required
              outlined
            ></v-text-field>
          </v-col>
          <v-col sm="6" md="5">
            <v-select
              :item-text="obtenerdatosEmpleado"
              item-value="email"
              v-model="emailEmpleado"
              label="Selecciona empleado"
              :items="empleados"
              outlined
            ></v-select>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-btn
              class="success"
              :disabled="validarRegistro"
              @click="mostrarConfirmacion = true"
              >Registrar Caja</v-btn
            >
          </v-col>
        </v-row>

        <v-row justify="center">
          <v-dialog v-model="mostrarConfirmacion" persistent max-width="600">
            <v-card>
              <v-card-title class="text-h5">
                Confirmar Registro y asignacion de Caja
              </v-card-title>
              <v-card-text
                >Esta seguro de Registrar esta caja con este
                usuario</v-card-text
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="red darken-1"
                  text
                  @click="mostrarConfirmacion = false"
                >
                  Cancelar
                </v-btn>
                <v-btn color="green darken-1" text @click="registrarCaja()">
                  Registrar
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";

import Swal from "sweetalert2";

import {
  LISTAR_EMPLEADOS_SIN_CAJA_ASIGNADA,
  REGISTRAR_CAJA,
  LISTAR_CAJAS,
} from "@/services/usuarios";

export default Vue.extend({
  name: "RegistroCajas",
  data: () => ({
    empleados: [],
    emailEmpleado: "",
    caja: "",
    todasCajas: [],
    mostrarConfirmacion: false,
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
        this.empleados = await LISTAR_EMPLEADOS_SIN_CAJA_ASIGNADA();
      } catch (error) {
        console.log(error);
      }
    },
    async listarCajas() {
      try {
        this.todasCajas = await LISTAR_CAJAS();
      } catch (error) {
        console.log(error);
      }
    },
    obtenerdatosEmpleado(item: any) {
      return item.nombres + " " + item.apellidos;
    },
    async registrarCaja() {
      await REGISTRAR_CAJA(this.emailEmpleado, this.caja);
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
      this.mostrarConfirmacion = false;
    },
  },
  created() {
    this.traerEmpleados();
    this.listarCajas();
  },
});
</script>
