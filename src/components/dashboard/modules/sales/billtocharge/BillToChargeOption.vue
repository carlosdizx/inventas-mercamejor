<template>
  <div>
    <div class="d-flex flex-wrap justify-center mt-2">
      <v-btn
        @click="opcion = 1"
        :class="opcion === 1 ? 'success mx-1 mb-1' : 'mx-1 mb-1'"
      >
        Cobrar
      </v-btn>
      <v-btn
        @click="opcion = 2"
        :class="opcion === 2 ? 'success mx-1 mb-1' : 'mx-1 mb-1'"
      >
        Consultar
      </v-btn>
    </div>

    <BillToCharge v-if="opcion === 1" />
    <BillToChargeList v-if="opcion === 2" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";

import BillToCharge from "./charge/BillToCharge.vue";
import BillToChargeList from "./list/BillToChargeList.vue";

export default Vue.extend({
  name: "BillToChargeOption",
  components: { BillToCharge, BillToChargeList },
  data: () => ({
    opcion: 1,
  }),
});
</script>
