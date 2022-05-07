<template>
  <div>
    <Toolbar
      permitir-navdrawer
      permitir-color
      permitir-logout
      :titulo="'Inventas - ' + nombre"
      :botones="botones"
      @cambiarEstadoNavDrawer="cambiarEstadoNavDrawer"
    />
    <NavDrawer ref="NavDrawer" v-on:item="item = $event" />
    <Comprar v-if="item === 1" />
    <Proveedores v-if="item === 2" />
    <Clientes v-if="item === 5" />
    <Productos v-if="item === 8" />
    <Categorias v-if="item === 9" />
    <Marcas v-if="item === 10" />
    <Bodegas v-if="item === 11" />
    <RegistroUsuarios v-if="item === 13" />
    <ActualizarUsuarios v-if="item === 14" />
    <Cajas v-if="item === 15" />
    <Sprints v-if="item === 18" />
    <Movimientos v-if="item === 16" />
    <Comprobantes v-if="item === 17" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Toolbar from "@/components/generals/Toolbar.vue";
import NavDrawer from "@/components/dashboard/NavDrawer.vue";
import Comprar from "@/components/dashboard/modulos/compras/comprar/Comprar.vue";
import Sprints from "@/components/dashboard/modulos/Sprints.vue";
import RegistroUsuarios from "@/components/dashboard/modulos/usuarios/RegistroUsuarios.vue";
import ActualizarUsuarios from "@/components/dashboard/modulos/usuarios/ActualizarUsuarios.vue";
import Categorias from "@/components/dashboard/modulos/Categorias.vue";
import Cajas from "@/components/dashboard/modulos/usuarios/Cajas.vue";
import Bodegas from "@/components/dashboard/modulos/Bodegas.vue";
import Marcas from "@/components/dashboard/modulos/Marcas.vue";
import Movimientos from "@/components/dashboard/modulos/Movimientos.vue";
import Productos from "@/components/dashboard/modulos/Productos.vue";
import Proveedores from "@/components/dashboard/modulos/Proveedores.vue";
import Comprobantes from "@/components/dashboard/modulos/Comprobantes.vue";
import Clientes from "@/components/dashboard/modulos/Clientes.vue";

export default Vue.extend({
  name: "Dashboard",
  components: {
    Toolbar,
    NavDrawer,
    Sprints,
    RegistroUsuarios,
    ActualizarUsuarios,
    Categorias,
    Cajas,
    Bodegas,
    Marcas,
    Movimientos,
    Productos,
    Proveedores,
    Comprar,
    Comprobantes,
    Clientes,
  },
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
