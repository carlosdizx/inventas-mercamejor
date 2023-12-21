<template>
  <v-container>
    <Tabla
      coleccion="categories"
      titulo="categorias"
      :columnas="columnas"
      :campos_form="campos_form"
      :validaciones="validaciones"
    />
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import Tabla from "@/components/crud/Tabla.vue";
import { COLUMNAS, CAMPOS, VALIDACIONES } from "@/models/Categoria";

export default Vue.extend({
  name: "Categorias",
  components: { Tabla },
  data: () => ({
    columnas: COLUMNAS,
    campos_form: CAMPOS,
    validaciones: VALIDACIONES,
  }),
});
</script>
