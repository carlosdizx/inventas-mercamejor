<template>
  <v-card max-width="600" class="mx-auto">
    <v-card-title>
      <v-img
        class="mx-auto"
        src="https://cdn.pixabay.com/photo/2017/02/26/11/57/mountaineer-2100050_960_720.jpg"
      />
    </v-card-title>
    <v-card-text>
      <v-form
        ref="form"
        v-model="validacion"
        lazy-validation
        @submit.prevent="loginUser"
      >
        <v-text-field prepend-icon="mdi-account" v-model="email" />
        <v-text-field
          prepend-icon="mdi-lock"
          :type="showPass ? 'text' : 'password'"
          @click:append="mostrarPassword"
          :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
          v-model="passwd"
        />
        <v-btn type="submit" block color="primary">Iniciar sesión</v-btn>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";

import { INICIAR_SESION, BORARR } from "@/services/auth";
import { NOTIFICAR_ERROR } from "@/generals/notificaciones";

export default Vue.extend({
  name: "Login",
  data: () => ({
    validacion: true,
    showPass: false,
    email: "",
    passwd: "",
  }),
  methods: {
    mostrarPassword(): boolean {
      return (this.showPass = !this.showPass);
    },
    async loginUser() {
      try {
        const userCredential = await INICIAR_SESION(this.email, this.passwd);
        const datos = userCredential.user.providerData[0].displayName;
        console.log(userCredential.user);
        if (datos) {
          const datosParseados = JSON.parse(datos);
          console.log(datosParseados);
          await BORARR(userCredential.user);
        } else {
          console.log("Fallo");
        }
      } catch (e) {
        console.log(e);
        await NOTIFICAR_ERROR(e.code);
      }
    },
  },
});
</script>

<style scoped></style>
