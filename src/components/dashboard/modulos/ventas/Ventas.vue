<template>
  <v-container>
    <FormVentas v-on:codigo_barras="buscarProducto($event)" />
    <ListadoItems ref="ListadoItems" />
    <Factura
      tipo_factura="Factura de venta"
      :documento="1082749257"
      nombre="Carlos Díaz"
      caja="#####"
      :productos="productos"
    />
  </v-container>
</template>

<script lang="ts">
import FormVentas from "@/components/dashboard/modulos/ventas/componentes/FormVentas.vue";
import ListadoItems from "@/components/dashboard/modulos/ventas/componentes/ListadoItems.vue";
import Factura from "@/components/generals/Factura.vue";
import Vue from "vue";
import { BUSCAR_PRODUCTOS_CODIGO_BARRAS } from "@/generals/Funciones";
import Swal from "sweetalert2";

export default Vue.extend({
  name: "Ventas",
  components: { FormVentas, ListadoItems, Factura },
  data: () => ({
    productos: [
      {
        nombre: "Leche 1L Colacteos",
        cantidad: 1,
        precio: 3500,
        descuento: 0,
        subtotal: 7000,
      },
      {
        nombre: "Leche alqueria 1L",
        cantidad: 1,
        precio: 3200,
        descuento: 0,
        subtotal: 6400,
      },
      {
        nombre: "Leche Purace 1L",
        cantidad: 2,
        precio: 3300,
        descuento: 0,
        subtotal: 6600,
      },
    ],
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
