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
    <RegistroUsuarios v-if="item === 9" />
    <Sprints v-if="item === 12" />
    <v-btn @click="logout()">Logout</v-btn>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Toolbar from "@/components/generals/Toolbar.vue";
import NavDrawer from "@/components/dashboard/NavDrawer.vue";
import Sprints from "@/components/dashboard/modulos/Sprints.vue";
import RegistroUsuarios from "@/components/dashboard/modulos/RegistroUsuarios.vue";
import { LOGOUT } from "@/services/auth";

export default Vue.extend({
  name: "Dashboard",
  components: { Toolbar, NavDrawer, Sprints, RegistroUsuarios },
  data: () => ({
    item: 9,
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
    async logout() {
      await LOGOUT();
    },
  },
});
</script>

<style scoped></style>
