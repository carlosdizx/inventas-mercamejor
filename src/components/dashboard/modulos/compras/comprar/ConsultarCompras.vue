<template>
  <v-container> consultar compra </v-container>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "ConsultarCompras",
  data: () => ({
    opcion: 1,
    registro: true,
    actualizar: false,
  }),
});
</script>
