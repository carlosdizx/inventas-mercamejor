<template>
  <v-card>
    <v-card-text>
      <h1>Formulario para registro de ventas</h1>
    </v-card-text>
    <v-form>
      <v-text-field />
    </v-form>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "FormVentas",
  components: {},
  data: () => ({
    columnas: [],
  }),
});
</script>

<style scoped></style>
