<template>
  <v-container>
    <Tabla
      coleccion="products"
      titulo="productos"
      :columnas="columnas"
      :campos_form="campos_form"
      :validaciones="validaciones"
      elimacion
    />
  </v-container>
</template>

<script lang="ts">
import Tabla from "@/components/crud/Tabla.vue";
import { COLUMNAS, CAMPOS, VALIDACIONES } from "@/models/Producto";

import Vue from "vue";

export default Vue.extend({
  name: "Productos",
  components: { Tabla },
  data: () => ({
    columnas: COLUMNAS,
    campos_form: CAMPOS,
    validaciones: VALIDACIONES,
  }),
});
</script>
