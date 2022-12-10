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
import Swal from "sweetalert2";
import { DAR_NUMERO_FACTURA } from "@/generals/Funciones";
import { BUSCAR_PRODUCTOS_CODIGO_BARRAS } from "@/UseCases/ProductosUseCases";

export default Vue.extend({
  name: "Ventas",
  components: { FormVentas, ListadoItems, Factura },
  data: () => ({
    productos: [],
    audio: new Audio(),
    add: require("@/assets/audios/add_product.mp3"),
    notFound: require("@/assets/audios/not_found_product.mp3"),
  }),
  methods: {
    async buscarProducto(codigo_barras: number) {
      const producto = await BUSCAR_PRODUCTOS_CODIGO_BARRAS(codigo_barras * 1);
      if (producto) {
        const listado: any = this.$refs.ListadoItems;
        const form: any = this.$refs.FormVentas;
        listado.agregarProducto(producto.producto);
        // this.audio.src = this.add;
        // await this.audio.play();
      } else {
        // this.audio.src = this.notFound;
        // await this.audio.play();

        await Swal.fire({
          title: "Producto no encontrado",
          timer: 1000,
          icon: "error",
          showConfirmButton: false,
        });
      }
    },
    async generarFactura(datos_cliente: any) {
      const factura: any = this.$refs.Factura;
      const datos: any = this.$refs.ListadoItems;
      const productos: [] = datos.darItemsFactura().productos;
      if (productos.length > 0) {
        const consecutivo = await DAR_NUMERO_FACTURA(1);
        if (typeof consecutivo === "boolean") {
          return;
        }
        await factura.asignarValores(
          datos_cliente,
          datos.darItemsFactura(),
          consecutivo
        );
        factura.cambiarEstado();
      } else {
        await Swal.fire({
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
