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
      elimacion
    />
  </v-container>
</template>

<script lang="ts">
import Tabla from "@/components/crud/Tabla.vue";
import { CAMPOS } from "@/models/Sprints/FormSprint";

import Vue from "vue";

export default Vue.extend({
  name: "Sprints",
  components: { Tabla },
  data: () => ({
    columnas: [],
    campos_detalle: [],
    campos_form: CAMPOS,
    datosUsuario: {},
  }),
});
</script>

<style scoped></style>
