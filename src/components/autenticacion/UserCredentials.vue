<template>
  <v-form>
    <v-text-field
      outlined
      dense
      label="Correo eléctronico"
      prepend-icon="mdi-account"
      counter
    />
    <v-text-field
      outlined
      dense
      label="Contraseña"
      prepend-icon="mdi-lock"
      counter
    />
    <v-text-field
      outlined
      dense
      label="Repita la contraseña"
      prepend-icon="mdi-lock"
      counter
    />
  </v-form>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "UserCredentials",
});
</script>

<style scoped></style>
