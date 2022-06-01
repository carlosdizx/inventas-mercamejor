<template>
  <v-container>
    <FormVentas />
    <ListadoVue />
  </v-container>
</template>

<script lang="ts">
import FormVentas from "@/components/dashboard/modulos/ventas/SubComponents/FormVentas.vue";
import ListadoVue from "@/components/dashboard/modulos/ventas/SubComponents/LsitadoVentas.vue";
import Vue from "vue";

export default Vue.extend({
  name: "Ventas",
  components: { FormVentas, ListadoVue },
  data: () => ({
    columnas: [],
  }),
});
</script>

<style scoped></style>
