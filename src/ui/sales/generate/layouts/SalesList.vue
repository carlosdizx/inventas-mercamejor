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
import { defineComponent } from "vue";
import Tabla from "@/components/crud/Tabla.vue";

export default defineComponent({
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
