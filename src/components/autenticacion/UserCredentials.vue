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
        <v-chip v-if="invalid" class="ma-2" color="amber lighten-2">
          Complete los campos solicitados <v-icon>mdi-alert</v-icon>
        </v-chip>
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
      } catch (e) {
        await Swal.fire({
          timer: 2000,
          title: e.code,
          icon: "error",
          showConfirmButton: false,
        });
      }
      this.cargando = !this.cargando;
    },
  },
});
</script>

<style scoped></style>
