<template>
  <v-container>
    <FormVentas />
    <ListadoItems />
  </v-container>
</template>

<script lang="ts">
import FormVentas from "@/components/dashboard/modulos/ventas/componentes/FormVentas.vue";
import ListadoItems from "@/components/dashboard/modulos/ventas/componentes/ListadoItems.vue";
import Vue from "vue";

export default Vue.extend({
  name: "Ventas",
  components: { FormVentas, ListadoItems },
  data: () => ({
    columnas: [],
  }),
});
</script>

<style scoped></style>
