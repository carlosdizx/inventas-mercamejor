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
      <v-btn
        @click="opcion = 3"
        :color="
          opcion === 3
            ? `error
               ml-1 `
            : 'ml-1'
        "
      >
        Anular Compra
      </v-btn>
    </div>
    <RegistroCompras v-if="opcion === 1" />
    <ConsultarCompras v-if="opcion === 2" />
    <AnularCompra v-if="opcion === 3" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";

import RegistroCompras from "@/components/dashboard/modules/shops/shop/RegistroCompras.vue";
import ConsultarCompras from "@/components/dashboard/modules/shops/shop/ConsultarCompras.vue";
import AnularCompra from "@/components/dashboard/modules/shops/shop/AnularCompra.vue";

export default Vue.extend({
  name: "Cajas",
  components: { RegistroCompras, ConsultarCompras, AnularCompra },
  data: () => ({
    opcion: 1,
    registro: true,
    actualizar: false,
  }),
});
</script>
