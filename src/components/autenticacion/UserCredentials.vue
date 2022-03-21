<template>
  <v-card-text>
    <ValidationObserver ref="observer" v-slot="{ invalid }">
      <v-form class="my-2" @submit.prevent="crearCuenta" :disabled="cargando">
        <validation-provider
          v-slot="{ errors }"
          name="Correo eléctronico"
          rules="required|email"
        >
          <v-text-field
            outlined
            dense
            label="Correo eléctronico"
            prepend-icon="mdi-account"
            counter
            :error-messages="errors"
            v-model="correo"
          />
        </validation-provider>
        <validation-provider
          v-slot="{ errors }"
          name="Contraseña"
          rules="required|min:8|max:60"
        >
          <v-text-field
            outlined
            dense
            label="Contraseña"
            prepend-icon="mdi-lock"
            counter
            :append-icon="mostrarPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="mostrarPassword = !mostrarPassword"
            :type="mostrarPassword ? 'text' : 'password'"
            :error-messages="errors"
            v-model="pass1"
          />
        </validation-provider>
        <validation-provider
          v-slot="{ errors }"
          name="Verificación de contraseña"
          rules="required|min:8|max:60"
        >
          <v-text-field
            outlined
            dense
            label="Repeta la contraseña"
            prepend-icon="mdi-lock"
            counter
            :append-icon="mostrarPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="mostrarPassword = !mostrarPassword"
            :type="mostrarPassword ? 'text' : 'password'"
            :error-messages="errors"
            v-model="pass2"
          />
        </validation-provider>
        <small>
          <v-chip dense small v-if="invalid" color="orange lighten-2">
            Complete los campos solicitados <v-icon>mdi-alert</v-icon>
          </v-chip>
        </small>

        <v-btn
          block
          color="success"
          :disabled="invalid || cargando"
          type="submit"
          :loading="cargando"
        >
          Registrarme <v-icon>mdi-account-plus</v-icon>
        </v-btn>
      </v-form>
    </ValidationObserver>
  </v-card-text>
</template>

<script lang="ts">
import Vue from "vue";
import { CREAR_CUENTA } from "@/services/auth";
import Swal from "sweetalert2";
import { NOTIFICAR_ERROR } from "@/generals/notificaciones";

export default Vue.extend({
  name: "UserCredentials",
  data: () => ({
    mostrarPassword: false,
    correo: "",
    pass1: "",
    pass2: "",
    cargando: false,
  }),
  methods: {
    async crearCuenta() {
      this.cargando = !this.cargando;
      if (this.pass1.trim() === this.pass2.trim())
        try {
          const registro = JSON.parse(
            JSON.stringify(await CREAR_CUENTA(this.correo, this.pass1))
          );
          await Swal.fire({
            timer: 2000,
            title: "Registro exitoso",
            icon: "success",
            showConfirmButton: false,
          });
          console.log(registro.user);
          console.log(registro._tokenResponse);
          this.cambiarEtapa(3);
        } catch (e) {
          await NOTIFICAR_ERROR(e.code);
        }
      else
        await Swal.fire({
          timer: 1500,
          title: "Las contraseñas no coinciden",
          icon: "error",
          showConfirmButton: false,
        });
      this.cargando = !this.cargando;
    },
    cambiarEtapa(etapa: number) {
      this.$emit("etapa", etapa);
    },
  },
});
</script>

<style scoped></style>
