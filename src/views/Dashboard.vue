<template>
  <div>
    <Toolbar
      permitirNavdrawer
      permitirLogout
      permitirColor
      :titulo="'Inventas - ' + nombre"
      :botones="botones"
      @cambiarEstadoNavDrawer="cambiarEstadoNavDrawer"
    />
    <NavDrawer ref="NavDrawer" v-on:item="item = $event" />
    <Usuarios v-if="item === 9" />
    <RegistroUsuarios v-if="item === 9" />
    <Sprints v-if="item === 10" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Toolbar from "@/components/generals/Toolbar.vue";
import NavDrawer from "@/components/dashboard/NavDrawer.vue";
import Sprints from "@/components/dashboard/modulos/Sprints.vue";
import RegistroUsuarios from "@/components/dashboard/modulos/RegistroUsuarios.vue";
import Usuarios from "@/components/dashboard/modulos/Usuarios.vue";

export default Vue.extend({
  name: "Dashboard",
  components: { Toolbar, NavDrawer, Sprints, RegistroUsuarios, Usuarios },
  data: () => ({
    item: 0,
    navigation: true,
    nombre: "Mercamejor",
    botones: [],
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
