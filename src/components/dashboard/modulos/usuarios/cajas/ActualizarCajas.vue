<template>
  <v-container>
    <v-card class="ml-4 mr-4">
      <v-card-title>
        <h3>Actualizar cajas</h3>
      </v-card-title>
      <v-card-text class="ml-3 mr-3">
        <v-row>
          <v-col sm="6" md="6">
            <v-select
              :item-text="obtenerCaja"
              :items="todasCajas"
              v-model="caja"
              label="Seleccione Caja"
              outlined
            ></v-select>
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
              class="warning"
              :disabled="validar"
              @click="mostrarConfirmacion = true"
              >Actualizar Caja</v-btn
            >
          </v-col>
        </v-row>

        <v-row justify="center">
          <v-dialog v-model="mostrarConfirmacion" persistent max-width="600">
            <v-card>
              <v-card-title class="text-h5">
                Confirmar Actualizacion de caja
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
                <v-btn color="green darken-1" text @click="actualizarCaja()">
                  Actualizar
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
  LISTAR_EMPLEADOS,
  LISTAR_CAJAS,
  ACTUALIZAR_CAJA,
} from "@/services/usuarios";

export default Vue.extend({
  name: "ActualizarCajas",
  data: () => ({
    caja: "",
    emailEmpleado: "",
    empleados: [],
    todasCajas: [],
    mostrarConfirmacion: false,
  }),
  computed: {
    validar() {
      let value = false;
      if (!this.caja || !this.emailEmpleado) {
        value = true;
      }
      return value;
    },
  },
  methods: {
    async traerEmpleados() {
      try {
        const res = await LISTAR_EMPLEADOS();
        this.empleados = res?.empleados;
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
    async actualizarCaja() {
      try {
        await ACTUALIZAR_CAJA(this.emailEmpleado, this.caja);
        await Swal.fire({
          timer: 3000,
          title: "Actualizacion de caja exitoso",
          text: "Exito de Actualizacion",
          icon: "success",
          showConfirmButton: false,
        });
        this.traerEmpleados();
        this.listarCajas();
        this.limpiarDatos();
      } catch (error) {
        console.log(error);
      }
    },
    obtenerdatosEmpleado(item: any) {
      return item.nombres + " " + item.apellidos;
    },
    obtenerCaja(item: any) {
      return item.caja;
    },
    limpiarDatos() {
      this.caja = "";
      this.emailEmpleado = "";
      this.mostrarConfirmacion = false;
    },
  },
  created() {
    this.traerEmpleados();
    this.listarCajas();
  },
});
</script>
