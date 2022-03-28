<template>
  <div>
    <Toolbar
      permitirNavdrawer
      permitirColor
      :titulo="'Inventas - ' + nombre"
      :botones="botones"
      @cambiarEstadoNavDrawer="cambiarEstadoNavDrawer"
    />
    <NavDrawer ref="NavDrawer" v-on:item="item = $event" />
    <Sprints v-if="item === 10" />
    <Productos v-if="item === 11" />
    <Proveedores v-if="item === 12" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Toolbar from "@/components/generals/Toolbar.vue";
import NavDrawer from "@/components/dashboard/NavDrawer.vue";
import Sprints from "@/components/dashboard/modulos/Sprints.vue";
import Productos from "@/components/dashboard/modulos/Productos.vue";
import Proveedores from "@/components/dashboard/modulos/Proveedores.vue";

export default Vue.extend({
  name: "Dashboard",
  components: { Toolbar, NavDrawer, Sprints, Productos, Proveedores },
  data: () => ({
    item: 0,
    navigation: true,
    nombre: "Mercamejor",
    botones: [
      { icon: "mdi-airplane", link: "registro" },
      { icon: "mdi-pipe", link: "/" },
    ],
  }),
  methods: {
    cambiarEstadoNavDrawer() {
      this.navigation = !this.navigation;
      const nav_drawer: any = this.$refs.NavDrawer;
      if (nav_drawer) {
        nav_drawer.cambiarEstado();
      }
    },
  },
});
</script>

<style scoped></style>
