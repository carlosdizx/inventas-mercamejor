<template>
  <v-stepper v-model="etapa" max-width="800" class="mx-auto">
    <v-stepper-header>
      <v-stepper-step :complete="etapa > 1" step="1">
        Datos personales
      </v-stepper-step>
      <v-divider></v-divider>

      <v-stepper-step :complete="etapa > 2" step="2">
        Creación de usuario
      </v-stepper-step>
    </v-stepper-header>

    <v-stepper-items>
      <v-stepper-content step="1">
        <v-btn color="primary" @click="etapa = 2"> Continuar </v-btn>
      </v-stepper-content>

      <v-stepper-content step="2">
        <v-btn color="success" @click="etapa = 3"> Registrar </v-btn>
      </v-stepper-content>
      <v-stepper-content step="3">
        <v-progress-linear indeterminate color="yellow darken-2" />
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "Registro",
  data: () => ({
    etapa: 1,
  }),
});
</script>

<style scoped></style>
