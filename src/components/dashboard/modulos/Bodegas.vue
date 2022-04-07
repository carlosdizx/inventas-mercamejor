<template>
  <v-container>
    <Tabla
      class="my-2"
      coleccion="bodegas"
      titulo="bodegas"
      :columnas="columnas"
      llave="nombre"
      :campos_form="campos_form"
    />
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import Tabla from "@/components/crud/Tabla.vue";
import { COLUMNAS } from "@/models/Bodegas/ColumnasBodega";
import { CAMPOS } from "@/models/Bodegas/FormBodega";

export default Vue.extend({
  name: "Bodegas",
  components: { Tabla },
  data: () => ({
    columnas: COLUMNAS,
    campos_form: CAMPOS,
    datosUsuario: {},
  }),
});
</script>
