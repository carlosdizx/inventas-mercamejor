<template>
  <div>
    <div v-for="(item, index) of lista" :key="index">
      <v-alert color="color_c" dark dense>
        {{ item.titulo }}
      </v-alert>
      <v-list-item
        v-for="(subitem, subindex) of item.items"
        :key="subindex"
        link
        @click="enviarId(subitem.id)"
      >
        <v-list-item-icon>
          <v-icon>{{ subitem.icono }}</v-icon>
        </v-list-item-icon>
        <v-list-item-title>{{ subitem.titulo }}</v-list-item-title>
      </v-list-item>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { FUNCIONES_DASHBOARD } from "@/generals/funcionalidades_dashboard";
import { ASIGNAR_ITEMS_DASHBOARD } from "@/generals/procesamientos";
import { OBTENER_ROL } from "@/services/usuarios";

export default Vue.extend({
  name: "ListadoFunciones",
  data: () => ({
    lista: [{}],
  }),
  async created() {
    const rol = await OBTENER_ROL();
    this.lista = ASIGNAR_ITEMS_DASHBOARD(FUNCIONES_DASHBOARD, rol);
  },
  methods: {
    enviarId(id: number) {
      this.$emit("item", id);
    },
  },
});
</script>
