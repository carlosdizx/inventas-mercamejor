<template>
  <v-container>
    <Tabla
      class="my-2"
      coleccion="movimientos"
      titulo="movimientos del sistema"
      :columnas="columnas"
      llave="responsable"
      :campos_form="campos_form"
      no-crear
      no-editar
    />
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import Tabla from "@/components/crud/Tabla.vue";
import { COLUMNAS, CAMPOS } from "@/models/Movimiento";

export default Vue.extend({
  name: "Movimientos",
  components: { Tabla },
  data: () => ({
    columnas: [{}],
    campos_form: [{}],
  }),
  beforeMount() {
    this.columnas = COLUMNAS;
    this.campos_form = CAMPOS;
  },
});
</script>
