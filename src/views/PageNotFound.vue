<template>
  <v-container>
    <v-card>
      <v-card-text>
        <h1>Página no encontrada!</h1>
        <h4>Asegurate que la url a la que ingresaste es correcta</h4>
        <v-img
          class="rounded-xl"
          src="https://cdn.pixabay.com/photo/2017/03/09/12/31/error-2129569_960_720.jpg"
        />
        <router-link to="/" v-slot="{ navigate }" custom>
          <v-btn text @click="navigate" type="link">
            {{ "Volver al inicio" }} <v-icon>mdi-home</v-icon>
          </v-btn>
        </router-link>
        <v-alert>
          Si cree que esto es un error, comuniquese con su administrador
        </v-alert>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "PageNotFound",
});
</script>

<style scoped></style>
