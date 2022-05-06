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
            <UserPersonalDetails
              v-on:etapa="etapa = $event"
              v-on:datos="datos = $event"
            />
          </v-stepper-content>

          <v-stepper-content step="2">
            <v-btn text @click="etapa = etapa - 1">
              <v-icon>mdi-arrow-left</v-icon> Regresar
            </v-btn>
            <UserCredentials
              v-on:etapa="etapa = $event"
              v-on:credenciales="credenciales = $event"
              @registrar="registrarUsuario"
            />
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
import { CREAR_CUENTA } from "@/services/auth";
import { NOTIFICAR_ERROR } from "@/generals/notificaciones";
import Swal from "sweetalert2";
import Vue from "vue";

export default Vue.extend({
  name: "Registro",
  components: { UserPersonalDetails, UserCredentials },
  data: () => ({
    etapa: 1,
    datos: {
      nombre: "",
      documento: "",
    },
    credenciales: { correo: "", password: "" },
  }),
  methods: {
    async registrarUsuario() {
      try {
        await CREAR_CUENTA(
          this.credenciales.correo,
          this.credenciales.password
        );
        await Swal.fire({
          timer: 2000,
          title: "Registro exitoso",
          icon: "success",
          showConfirmButton: false,
        });
      } catch (e) {
        await NOTIFICAR_ERROR(e.code);
        console.log(e);
      }
    },
  },
});
</script>

<style scoped></style>
