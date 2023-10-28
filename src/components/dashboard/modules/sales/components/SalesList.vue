<template>
  <v-card>
    <Tabla
      coleccion="sales"
      titulo="Sales"
      :columnas="columnas"
      no-crear
      no-editar
    />
  </v-card>
</template>

<script lang="ts">
import Tabla from "@/components/crud/Tabla.vue";
import Vue from "vue";

export default Vue.extend({
  name: "SalesList",
  components: {
    Tabla,
  },
  data: () => ({
    columnas: [],
  }),
});
</script>

<style scoped></style>
