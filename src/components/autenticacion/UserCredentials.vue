<template>
  <v-card-text>
    <ValidationObserver ref="observer" v-slot="{ invalid }">
      <v-form class="my-2">
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
          name="Contraseña"
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
        <v-btn block color="success" :disabled="invalid">
          Registrarme <v-icon>mdi-account-plus</v-icon>
        </v-btn>
      </v-form>
    </ValidationObserver>
  </v-card-text>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "UserCredentials",
  data: () => ({
    mostrarPassword: false,
    correo: "",
    pass1: "",
    pass2: "",
  }),
});
</script>

<style scoped></style>
