<template>
  <div>
    <div class="mt-1 mb-1">
      <v-btn
        @click="opcion = 1"
        :class="opcion === 1 ? `success ml-1` : 'ml-1'"
      >
        Compras
      </v-btn>
      <v-btn
        @click="opcion = 2"
        :class="opcion === 2 ? `success ml-1` : 'ml-1'"
      >
        Consultar Compras
      </v-btn>
    </div>
    <RegistroCompras v-if="opcion === 1" />
    <ConsultarCompras v-if="opcion === 2" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";

import RegistroCompras from "@/components/dashboard/modulos/compras/comprar/RegistroCompras.vue";
import ConsultarCompras from "@/components/dashboard/modulos/compras/comprar/ConsultarCompras.vue";

export default Vue.extend({
  name: "Cajas",
  components: { RegistroCompras, ConsultarCompras },
  data: () => ({
    opcion: 1,
    registro: true,
    actualizar: false,
  }),
});
</script>
