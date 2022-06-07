<template>
  <v-container>
    <FormVentas v-on:codigo_barras="buscarProducto($event)" />
    <ListadoItems />
  </v-container>
</template>

<script lang="ts">
import FormVentas from "@/components/dashboard/modulos/ventas/componentes/FormVentas.vue";
import ListadoItems from "@/components/dashboard/modulos/ventas/componentes/ListadoItems.vue";
import Vue from "vue";
import { BUSCAR_PRODUCTOS_CODIGO_BARRAS } from "@/generals/Funciones";
import Swal from "sweetalert2";

export default Vue.extend({
  name: "Ventas",
  components: { FormVentas, ListadoItems },
  data: () => ({
    columnas: [],
  }),
  methods: {
    buscarProducto: async (codigo_barras: number) => {
      const productos = await BUSCAR_PRODUCTOS_CODIGO_BARRAS(codigo_barras * 1);
      if (productos.size !== 0) {
        const producto = productos.docs[0].data();
        await Swal.fire({
          title: producto.nombre,
          timer: 2000,
          html: "$" + producto.precio_unitario_venta,
          icon: "info",
          showConfirmButton: false,
        });
      } else {
        await Swal.fire({
          title: "Producto no encontrado",
          timer: 2000,
          icon: "error",
          showConfirmButton: false,
        });
      }
    },
  },
});
</script>

<style scoped></style>
