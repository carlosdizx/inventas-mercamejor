<template>
  <v-card max-width="600" class="mx-auto mt-12">
    <v-card-title>
      <v-img
        max-width="300"
        alt="Inventas"
        class="mx-auto login"
        src="@/assets/login.jpg"
      />
    </v-card-title>
    <v-card-text>
      <v-form
        ref="form"
        v-model="validacion"
        lazy-validation
        @submit.prevent="loginUser"
      >
        <v-text-field
          placeholder="Email"
          prepend-icon="mdi-account"
          v-model="email"
        />
        <v-text-field
          placeholder="Constraseña"
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

import { INICIAR_SESION } from "@/services/auth";
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

        // if (datos) {
        //   const datosParseados = JSON.parse(datos);
        //   console.log(datosParseados);
        // } else {
        //   console.log("Fallo");
        // }
      } catch (e) {
        console.log(e);
        await NOTIFICAR_ERROR(e.code);
      }
    },
  },
});
</script>

<style scoped>
.login {
  border-radius: 50%;
  width: 30%;
  height: 30%;
}
</style>
