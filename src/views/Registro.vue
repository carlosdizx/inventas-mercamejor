<template>
  <div>
    <v-card max-width="800" class="mx-auto">
      <v-card-subtitle>
        <v-row justify="space-around">
          <v-avatar size="250" color="deep-purple">
            <img src="@/assets/logo.png" alt="logo" />
          </v-avatar>
        </v-row>
      </v-card-subtitle>
      <!--  AQUÍ VA EL STEPSHADER   -->
      <v-stepper max-width="800" class="mx-auto" v-model="etapa">
        <v-stepper-header>
          <v-stepper-step :complete="etapa > 1" step="1">
            Datos personales
          </v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step :complete="etapa > 2" step="2">
            Credenciales de acceso
          </v-stepper-step>

          <v-divider></v-divider>
        </v-stepper-header>
        <v-stepper-items>
          <v-stepper-content step="1">
            <UserPersonalDetails v-on:etapa="etapa = $event" />
          </v-stepper-content>

          <v-stepper-content step="2">
            <v-btn text @click="etapa = etapa - 1">
              <v-icon>mdi-arrow-left</v-icon> Regresar
            </v-btn>
            <UserCredentials v-on:etapa="etapa = $event" />
          </v-stepper-content>
          <v-stepper-content step="3">
            <v-card loading>
              <v-card-text>
                <h1>Registrando usuario</h1>
              </v-card-text>
            </v-card>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </v-card>
  </div>
</template>

<script lang="ts">
import UserPersonalDetails from "@/components/autenticacion/UserPersonalDetails.vue";
import UserCredentials from "@/components/autenticacion/UserCredentials.vue";
import Vue from "vue";
export default Vue.extend({
  name: "Registro",
  components: { UserPersonalDetails, UserCredentials },
  data: () => ({
    etapa: 1,
  }),
});
</script>

<style scoped></style>
