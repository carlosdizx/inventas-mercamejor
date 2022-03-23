<template>
  <v-container>
    <Tabla
      class="my-2"
      coleccion="springs"
      titulo="springs"
      :columnas="columnas"
      llave="semana"
      :campos_detalle="campos_detalle"
      :campos_form="campos_form"
    />
  </v-container>
</template>

<script lang="ts">
import Tabla from "@/components/crud/Tabla.vue";
import { CAMPOS } from "@/models/Sprints/FormSprint";

import Vue from "vue";
import { COLUMNAS } from "@/models/Sprints/ColumnasUsuario";
import { COLUMNAS_DETALLE } from "@/models/Sprints/ColumnasDetalleUsuario";

export default Vue.extend({
  name: "Sprints",
  components: { Tabla },
  data: () => ({
    columnas: COLUMNAS,
    campos_detalle: COLUMNAS_DETALLE,
    campos_form: CAMPOS,
    datosUsuario: {},
  }),
});
</script>

<style scoped></style>
