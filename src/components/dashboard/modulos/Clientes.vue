<template>
  <v-container>
    <Tabla
      class="my-2"
      coleccion="clientes"
      titulo="clientes"
      :columnas="columnas"
      :campos_form="campos_form"
    />
  </v-container>
</template>

<script lang="ts">
import Tabla from "@/components/crud/Tabla.vue";
import { COLUMNAS, CAMPOS } from "@/models/Cliente";

import Vue from "vue";

export default Vue.extend({
  name: "Clientes",
  components: { Tabla },
  data: () => ({
    columnas: COLUMNAS,
    campos_form: CAMPOS,
    datosUsuario: {},
  }),
});
</script>
