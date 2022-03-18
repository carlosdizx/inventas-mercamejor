<template>
  <div>
    <Toolbar :titulo="'Inventas - ' + nombre" :botones="botones" />
    {{ color }}
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Toolbar from "@/components/generals/Toolbar.vue";
import { mapState } from "vuex";

export default Vue.extend({
  name: "Dashboard",
  components: { Toolbar },
  data: () => ({
    item: 0,
    navigation: false,
    nombre: "Mercamejor",
    botones: [
      { icon: "mdi-airplane", link: "registro" },
      { icon: "mdi-pipe", link: "/" },
    ],
  }),
  computed: {
    ...mapState(["color"]),
  },
});
</script>

<style scoped></style>
