<template>
  <v-container>
    <v-card>
      <v-btn @click="opcion = 1" :class="opcion === 1 ? `success` : ''">
        Compras
      </v-btn>
      <v-btn @click="opcion = 2" :class="opcion === 2 ? `success` : ''">
        Consultar Compras
      </v-btn>
      <v-btn @click="opcion = 3" :class="opcion === 3 ? `success` : ''">
        Actualizar Compras
      </v-btn>
    </v-card>
    <RegistroCompras v-if="opcion === 1" />
    <ConsultarCompras v-if="opcion === 2" />
    <ActualizarCompras v-if="opcion === 3" />
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";

import RegistroCompras from "@/components/dashboard/modulos/compras/comprar/RegistroCompras.vue";
import ConsultarCompras from "@/components/dashboard/modulos/compras/comprar/ConsultarCompras.vue";
import ActualizarCompras from "@/components/dashboard/modulos/compras/comprar/ActualizarCompras.vue";

export default Vue.extend({
  name: "Cajas",
  components: { RegistroCompras, ConsultarCompras, ActualizarCompras },
  data: () => ({
    opcion: 1,
    registro: true,
    actualizar: false,
  }),
});
</script>
