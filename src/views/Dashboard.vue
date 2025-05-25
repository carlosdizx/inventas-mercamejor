<template>
  <v-app>
    <Toolbar @cambiarEstadoNavDrawer="cambiarEstadoNavDrawer" />
    <NavDrawer ref="NavDrawer" />
    <v-main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import Toolbar from "@/components/generals/Toolbar.vue";
import NavDrawer from "@/components/dashboard/NavDrawer.vue";
import ConsultSales from "@/components/dashboard/modules/sales/consultsales/ConsultSales.vue";
import CuadreCuentas from "@/components/dashboard/modules/cuandre_cuentas/CuadreCuentas.vue";

export default defineComponent({
  name: "Dashboard",
  components: {
    Toolbar,
    NavDrawer,
    ConsultSales,
    CuadreCuentas,
  },
  setup() {
    const navigation = ref(false);
    const NavDrawer = ref(null);

    const cambiarEstadoNavDrawer = () => {
      navigation.value = !navigation.value;
      if (NavDrawer.value) {
        NavDrawer.value.cambiarEstado();
      }
    };

    return {
      navigation,
      NavDrawer,
      cambiarEstadoNavDrawer
    };
  }
});
</script>

<style scoped></style>
