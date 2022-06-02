<template>
  <v-container>
    <Tabla
      class="my-2"
      coleccion="marcas"
      titulo="marcas de productos"
      :columnas="columnas"
      :campos_form="campos_form"
      :validaciones="validaciones"
    />
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import Tabla from "@/components/crud/Tabla.vue";
import { COLUMNAS, CAMPOS, VALIDACIONES } from "@/models/Marca";

export default Vue.extend({
  name: "Marcas",
  components: { Tabla },
  data: () => ({
    columnas: [{}],
    campos_form: [{}],
    validaciones: [{}],
  }),
  beforeMount() {
    this.columnas = COLUMNAS;
    this.campos_form = CAMPOS;
    this.validaciones = VALIDACIONES;
  },
});
</script>
