<template>
  <v-container>
    <Tabla
      coleccion="ventas"
      titulo="Ventas"
      :columnas="columnas"
      no-crear
      no-editar
    />
  </v-container>
</template>

<script lang="ts">
import Tabla from "@/components/crud/Tabla.vue";
import Vue from "vue";

export default Vue.extend({
  name: "Ventas",
  components: {
    Tabla,
  },
  data: () => ({
    columnas: [],
  }),
});
</script>

<style scoped></style>
