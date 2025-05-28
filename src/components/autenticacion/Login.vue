<template>
  <v-card max-width="600" class="mx-auto mt-12">
    <v-card-title>
      <v-img
        max-width="300"
        alt="Inventas"
        class="mx-auto login"
        src="@/assets/login.png"
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
import { defineComponent, ref } from 'vue'
import { INICIAR_SESION } from "@/services/auth";
import { NOTIFICAR_ERROR } from "@/generals/notificaciones";

export default defineComponent({
  name: "Login",
  setup() {
    const validacion = ref(true)
    const showPass = ref(false)
    const email = ref("")
    const passwd = ref("")

    const mostrarPassword = () => {
      showPass.value = !showPass.value
    }

    const loginUser = async () => {
      try {
        await INICIAR_SESION(email.value, passwd.value)
      } catch (e) {
        await NOTIFICAR_ERROR(e.code)
      }
    }

    return {
      validacion,
      showPass,
      email,
      passwd,
      mostrarPassword,
      loginUser
    }
  }
});
</script>

<style scoped>
.login {
  border-radius: 50%;
  width: 30%;
  height: 30%;
}
</style>
