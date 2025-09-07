<template>
  <div>
    <div v-for="(item, index) of lista" :key="index">
      <v-alert color="color_c" dark dense>
        {{ item.titulo }}
      </v-alert>
      <v-list-item
        v-for="(subitem, subindex) of item.items"
        :key="subindex"
        class="my-2 px-4 py-3 rounded-lg grey lighten-3 d-flex align-center"
        dense
        link
        @click="navegarA(subitem.id)"
      >
        <v-icon class="mr-2">{{ subitem.icono }}</v-icon>
        <span class="font-weight-medium">{{ subitem.titulo }}</span>
      </v-list-item>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { FUNCIONES_DASHBOARD } from "@/generals/funcionalidades_dashboard";
import { ASIGNAR_ITEMS_DASHBOARD } from "@/generals/procesamientos";
import { OBTENER_ROL } from "@/services/usuarios";
import { useRouter } from 'vue-router';

interface MenuItem {
  id: number;
  icono: string;
  titulo: string;
  roles: string[];
}

interface MenuSection {
  titulo: string;
  roles: string[];
  items: MenuItem[];
}

export default defineComponent({
  name: "ListadoFunciones",
  setup() {
    const router = useRouter();
    return { router };
  },
  data: () => ({
    lista: [] as MenuSection[],
  }),
  async created() {
    const rol = await OBTENER_ROL();
    this.lista = ASIGNAR_ITEMS_DASHBOARD(FUNCIONES_DASHBOARD, rol);
  },
  methods: {
    navegarA(id: number) {
      const rutas: { [key: number]: string } = {
        1: '/comprar',
        2: '/proveedores',
        3: '/cuentas-por-pagar',
        4: '/vender',
        5: '/consultar-ventas',
        6: '/clientes',
        7: '/cuentas-por-cobrar',
        8: '/productos',
        9: '/categorias',
        10: '/marcas',
        11: '/bodegas',
        12: '/movimientos',
        13: '/registro-empleados',
        14: '/actualizar-empleados',
        15: '/cajas',
        16: '/movimientos',
        17: '/comprobantes'
      };

      if (rutas[id]) {
        this.router.push(rutas[id]);
      }
    }
  },
});
</script>
