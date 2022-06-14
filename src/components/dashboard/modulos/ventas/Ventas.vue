<template>
  <v-container>
    <FormVentas
      v-on:codigo_barras="buscarProducto($event)"
      v-on:datos_cliente="generarFactura($event)"
    />
    <ListadoItems ref="ListadoItems" />
    <Factura ref="Factura" />
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
    productos: [],
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
    generarFactura(datos_cliente: any) {
      const factura: any = this.$refs.Factura;
      const datos: any = this.$refs.ListadoItems;
      const productos: [] = datos.darItemsFactura().productos;
      if (productos.length > 0) {
        factura.asignarValores(datos_cliente, datos.darItemsFactura());
        factura.cambiarEstado();
      } else {
        Swal.fire({
          title: "Sin productos",
          html: "No se puede generar una factura y registrar venta",
          icon: "error",
          timer: 800,
          showConfirmButton: false,
        });
      }
    },
  },
});
</script>

<style scoped></style>
