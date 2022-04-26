<template>
  <v-container>
    <v-card>
      <v-btn @click="opcion = 1" :class="opcion == 1 ? `success` : ''"
        >Compras</v-btn
      >
      <v-btn @click="opcion = 2" :class="opcion == 2 ? `success` : ''"
        >Consultar Compras</v-btn
      >
      <v-btn @click="opcion = 3" :class="opcion == 3 ? `success` : ''"
        >Actualizar Compras</v-btn
      >
    </v-card>
    <RegistroCompras v-if="opcion == 1" />
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";

import RegistroCompras from "@/components/dashboard/modulos/compras/comprar/RegistroCompras.vue";

export default Vue.extend({
  name: "Cajas",
  components: { RegistroCompras },
  data: () => ({
    opcion: 1,
    registro: true,
    actualizar: false,
  }),
});
</script>
