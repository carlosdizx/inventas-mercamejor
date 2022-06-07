<template>
  <v-container>
    <FormVentas v-on:codigo_barras="buscarProducto($event)" />
    <ListadoItems ref="ListadoItems" />
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
    async buscarProducto(codigo_barras: number) {
      const productos = await BUSCAR_PRODUCTOS_CODIGO_BARRAS(codigo_barras * 1);
      if (productos.size !== 0) {
        const producto: any = productos.docs[0].data();
        producto.id = productos.docs[0].id;
        const listado: any = this.$refs.ListadoItems;
        listado.agregarProducto(producto);
      } else {
        await Swal.fire({
          title: "Producto no encontrado",
          timer: 1000,
          icon: "error",
          showConfirmButton: false,
        });
      }
    },
  },
});
</script>

<style scoped></style>
