<template>
  <v-container>
    <Tabla
      class="my-2"
      coleccion="productos"
      titulo="productos"
      :columnas="columnas"
      llave="nombre"
      :campos_form="campos_form"
    />
  </v-container>
</template>

<script lang="ts">
import Tabla from "@/components/crud/Tabla.vue";
import { CAMPOS } from "@/models/Productos/FormProducto";
import { COLUMNAS } from "@/models/Productos/ColumnasProducto";

import Vue from "vue";

export default Vue.extend({
  name: "Productos",
  components: { Tabla },
  data: () => ({
    columnas: COLUMNAS,
    campos_form: CAMPOS,
    datosUsuario: {},
  }),
});
</script>
