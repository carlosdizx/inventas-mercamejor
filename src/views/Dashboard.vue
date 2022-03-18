<template>
  <div>
    <Toolbar
      permitirNavdrawer
      permitirColor
      :titulo="'Inventas - ' + nombre"
      :botones="botones"
    />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Toolbar from "@/components/generals/Toolbar.vue";

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
});
</script>

<style scoped></style>
