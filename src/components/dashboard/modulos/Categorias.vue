<template>
  <v-container>
    <Tabla
      class="my-2"
      coleccion="categorias"
      titulo="categorias"
      :columnas="columnas"
      llave="nombre"
      :campos_form="campos_form"
    />
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import Tabla from "@/components/crud/Tabla.vue";
import { COLUMNAS, CAMPOS } from "@/models/Categoria";

export default Vue.extend({
  name: "Categorias",
  components: { Tabla },
  data: () => ({
    columnas: COLUMNAS,
    campos_form: CAMPOS,
    datosUsuario: {},
  }),
});
</script>
