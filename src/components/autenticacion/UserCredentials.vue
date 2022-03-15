<template>
  <v-card-text>
    <v-form class="my-2">
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
        :append-icon="mostrarPassword ? 'mdi-eye' : 'mdi-eye-off'"
        @click:append="mostrarPassword = !mostrarPassword"
        :type="mostrarPassword ? 'text' : 'password'"
      />
      <v-text-field
        outlined
        dense
        label="Repita la contraseña"
        prepend-icon="mdi-lock"
        counter
        :append-icon="mostrarPassword ? 'mdi-eye' : 'mdi-eye-off'"
        @click:append="mostrarPassword = !mostrarPassword"
        :type="mostrarPassword ? 'text' : 'password'"
      />
      <v-btn block color="success">
        Registrarme <v-icon>mdi-account-plus</v-icon>
      </v-btn>
    </v-form>
  </v-card-text>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "UserCredentials",
  data: () => ({
    mostrarPassword: false,
  }),
});
</script>

<style scoped></style>
