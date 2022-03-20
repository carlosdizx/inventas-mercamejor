<template>
  <div>
    <div v-for="(item, index) of lista" :key="index">
      <v-alert v-if="item.tipo === 1" :color="item.color" dark dense>
        Estudiantes
      </v-alert>
      <v-list-item link v-if="item.tipo === 2">
        <v-list-item-icon>
          <v-icon>{{ item.icono }}</v-icon>
        </v-list-item-icon>
        <v-list-item-title>{{ item.titulo }}</v-list-item-title>
      </v-list-item>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "ListadoFunciones",
  data: () => ({
    lista: [
      { tipo: 1, titulo: "Básicos", color: "deep-purple darken-1" },
      { tipo: 2, icono: "mdi-airplane", titulo: "Avión" },
      { tipo: 1, titulo: "Intermedio", color: "indigo" },
      { tipo: 2, icono: "mdi-home", titulo: "Home" },
      { tipo: 1, titulo: "Avanzado", color: "amber" },
      { tipo: 2, icono: "mdi-account", titulo: "Cuentas" },
      { tipo: 2, icono: "mdi-account-plus", titulo: "Agregar cuentas" },
    ],
  }),
});
</script>

<style scoped></style>
