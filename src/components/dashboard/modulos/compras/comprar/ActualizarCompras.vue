<template>
  <div>
    <div v-if="!mostrar" class="mt-6 mb-6 text-center">
      <v-btn @click="mostrar = true" class="warning">Buscar compra</v-btn>
    </div>
    <v-dialog v-model="mostrar">
      <v-card>
        <Tabla
          coleccion="compras"
          titulo="Compras"
          :columnas="columnas"
          :campos_form="campos_form"
          :validaciones="validaciones"
          seleccion
          NoEditar
          @getItem="seleccionarItem"
        ></Tabla>
      </v-card>
      <div class="mt-6 mb-6 text-center">
        <v-btn @click="mostrar = false" class="primary">Cerrar</v-btn>
      </div>
    </v-dialog>
    <RegistroCompras :compra="compra" v-if="!mostrar"></RegistroCompras>
  </div>
</template>

<script lang="ts">
import Tabla from "@/components/crud/Tabla.vue";
import RegistroCompras from "@/components/dashboard/modulos/compras/comprar/RegistroCompras.vue";

import { CAMPOS, VALIDACIONES } from "@/models/Producto";
import { COLUMNAS } from "@/models/Compra";

import Vue from "vue";

export default Vue.extend({
  name: "Productos",
  components: { Tabla, RegistroCompras },
  data: () => ({
    columnas: COLUMNAS,
    campos_form: CAMPOS,
    validaciones: VALIDACIONES,
    datosUsuario: {},
    mostrar: true,
    compra: {},
  }),
  methods: {
    seleccionarItem(producto: any) {
      this.mostrar = !this.mostrar;
      this.compra = producto;
    },
  },
});
</script>
