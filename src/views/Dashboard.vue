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
    <CuentasOpcion v-if="item === 3" />
    <Sales v-if="item === 4" />
    <ConsultSales v-if="item === 5" />
    <Clientes v-if="item === 6" />
    <BillToChargeOption v-if="item === 7" />
    <Productos v-if="item === 8" />
    <Bodegas v-if="item === 9" />
    <RegistroUsuarios v-if="item === 10" />
    <ActualizarUsuarios v-if="item === 11" />
    <Cajas v-if="item === 12" />
    <Categorias v-if="item === 13" />
    <Marcas v-if="item === 14" />
    <Movimientos v-if="item === 15" />
    <Comprobantes v-if="item === 16" />
    <cuadre-cuentas v-if="item === 17" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Toolbar from "@/components/generals/Toolbar.vue";
import NavDrawer from "@/components/dashboard/NavDrawer.vue";
import Comprar from "@/components/dashboard/modules/shops/shop/Comprar.vue";
import RegistroUsuarios from "@/components/dashboard/modules/usuarios/RegistroUsuarios.vue";
import ActualizarUsuarios from "@/components/dashboard/modules/usuarios/ActualizarUsuarios.vue";
import Categorias from "@/components/dashboard/modules/Categorias.vue";
import Cajas from "@/components/dashboard/modules/usuarios/Cajas.vue";
import Bodegas from "@/components/dashboard/modules/Bodegas.vue";
import Marcas from "@/components/dashboard/modules/Marcas.vue";
import Movimientos from "@/components/dashboard/modules/Movimientos.vue";
import Productos from "@/components/dashboard/modules/Productos.vue";
import Proveedores from "@/components/dashboard/modules/Proveedores.vue";
import Comprobantes from "@/components/dashboard/modules/Comprobantes.vue";
import Clientes from "@/components/dashboard/modules/Clientes.vue";
import BillToChargeOption from "@/components/dashboard/modules/sales/billtocharge/BillToChargeOption.vue";
import CuentasOpcion from "@/components/dashboard/modules/shops/cuentasporpagar/CuentasOpcion.vue";
import Sales from "@/components/dashboard/modules/sales/Sales.vue";
import ConsultSales from "@/components/dashboard/modules/sales/consultsales/ConsultSales.vue";
import CuadreCuentas from "@/components/dashboard/modules/cuandre_cuentas/CuadreCuentas.vue";
export default Vue.extend({
  name: "Dashboard",
  components: {
    Toolbar,
    NavDrawer,
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
    BillToChargeOption,
    CuentasOpcion,
    Sales,
    ConsultSales,
    CuadreCuentas,
  },
  data: () => ({
    item: 0,
    navigation: true,
    nombre: "Autoservio la Economia - Vicente Tobar",
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
