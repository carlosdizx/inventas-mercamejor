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
import Vue from "vue";
import Tabla from "@/components/crud/Tabla.vue";
import { CAMPOS, COLUMNAS } from "@/models/Sprint";

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
