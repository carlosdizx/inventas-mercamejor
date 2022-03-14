<template>
  <v-card max-width="600" class="mx-auto">
    <v-card-title>
      <v-img
        class="mx-auto"
        src="https://cdn.pixabay.com/photo/2017/02/26/11/57/mountaineer-2100050_960_720.jpg"
      />
    </v-card-title>
    <v-card-text>
      <v-form ref="form" v-model="validacion" lazy-validation>
        <v-text-field prepend-icon="mdi-account" />
        <v-text-field
          prepend-icon="mdi-lock"
          :type="showPass ? 'text' : 'password'"
          @click:append="mostrarPassword"
          :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
        />
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-btn block color="primary">Iniciar sesión</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "Login",
  data: () => ({
    validacion: true,
    showPass: false,
  }),
  methods: {
    mostrarPassword(): boolean {
      return (this.showPass = !this.showPass);
    },
  },
});
</script>

<style scoped></style>
