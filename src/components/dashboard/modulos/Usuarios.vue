<template>
  <v-container>
    <v-alert color="red" dark>
      <v-icon>mdi-alert-circle</v-icon>
      <v-icon class="float-end" dark>mdi-alert-circle</v-icon>
      <v-alert color="red" dark dense class="text-center">
        No usar esta tabla, solo es de prueba
      </v-alert>
      <v-icon>mdi-alert-circle</v-icon>
      <v-icon class="float-end" dark>mdi-alert-circle</v-icon>
    </v-alert>
    <Tabla
      class="my-2"
      coleccion="usuarios"
      titulo="usuarios"
      :columnas="columnas"
      llave="email"
      :campos_form="campos_form"
      noCrear
    />
  </v-container>
</template>

<script lang="ts">
import Tabla from "@/components/crud/Tabla.vue";
import { COLUMNAS, CAMPOS } from "@/models/Usuario";

import Vue from "vue";

export default Vue.extend({
  name: "Usuarios",
  components: { Tabla },
  data: () => ({
    columnas: COLUMNAS,
    campos_form: CAMPOS,
    datosUsuario: {},
  }),
});
</script>
