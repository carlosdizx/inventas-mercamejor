<template>
  <div>
    <div class="mt-1 mb-1">
      <v-btn
        @click="opcion = 1"
        :class="opcion === 1 ? `success ml-1` : 'ml-1'"
      >
        Cruzar
      </v-btn>
      <v-btn
        @click="opcion = 2"
        :class="opcion === 2 ? `success ml-1` : 'ml-1'"
      >
        Consultar
      </v-btn>
      <v-btn
        @click="opcion = 3"
        :class="opcion === 3 ? `success ml-1` : 'ml-1'"
      >
        Actualizar
      </v-btn>
    </div>
    <CuentasPorPagar v-if="opcion === 1" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";

import CuentasPorPagar from "./CuentasPorPagar.vue";

export default Vue.extend({
  name: "CuentasOpcion",
  components: { CuentasPorPagar },
  data: () => ({
    opcion: 1,
  }),
});
</script>
