<template>
  <v-container>
    <Tabla
      class="my-2"
      coleccion="sprints"
      titulo="sprints"
      :columnas="columnas"
      llave="semana"
      :campos_form="campos_form"
    />
  </v-container>
</template>

<script lang="ts">
import Tabla from "@/components/crud/Tabla.vue";
import { CAMPOS } from "@/models/Sprints/FormSprint";

import Vue from "vue";
import { COLUMNAS } from "@/models/Sprints/ColumnasUsuario";

export default Vue.extend({
  name: "Sprints",
  components: { Tabla },
  data: () => ({
    columnas: COLUMNAS,
    campos_form: CAMPOS,
    datosUsuario: {},
  }),
});
</script>
