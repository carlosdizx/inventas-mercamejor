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
        <PersonalDetails />
        <v-btn color="primary" @click="etapa = etapa + 1" outlined class="mx-2">
          Continuar
          <v-icon>mdi-arrow-right</v-icon>
        </v-btn>
      </v-stepper-content>

      <v-stepper-content step="2">
        <UserCredentials />
        <v-btn color="success" @click="etapa = etapa + 1" class="mx-2 my-2">
          Registrar
          <v-icon>mdi-plus</v-icon>
        </v-btn>
        <br />
        <v-btn
          color="dark"
          @click="etapa = etapa - 1"
          outlined
          class="mx-2 my-2"
        >
          Volver
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
      </v-stepper-content>
      <v-stepper-content step="3">
        <v-progress-linear indeterminate color="yellow darken-2" />
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>

<script lang="ts">
import PersonalDetails from "@/components/autenticacion/PersonalDetails.vue";
import UserCredentials from "@/components/autenticacion/UserCredentials.vue";
import Vue from "vue";
export default Vue.extend({
  name: "Registro",
  components: { PersonalDetails, UserCredentials },
  data: () => ({
    etapa: 1,
  }),
});
</script>

<style scoped></style>
