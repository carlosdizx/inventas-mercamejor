<template>
  <div>
    <div v-for="(item, index) of lista" :key="index">
      <v-alert v-if="item.tipo === 1" :color="item.color" dark dense>
        {{ item.titulo }}
      </v-alert>
      <v-list-item link v-if="item.tipo === 2" @click="enviarId(item.id)">
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
import { FUNCIONES } from "@/generals/funcionalidades";

export default Vue.extend({
  name: "ListadoFunciones",
  data: () => ({
    lista: [{}],
  }),
  created() {
    this.lista = FUNCIONES;
  },
  methods: {
    enviarId(id: number) {
      this.$emit("item", id);
    },
  },
});
</script>
