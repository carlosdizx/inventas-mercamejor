<template>
  <v-container>
    <FormVentas
      v-on:codigo_barras="buscarProducto($event)"
      v-on:datos_cliente="generarFactura($event)"
      ref="FormVentas"
    />
    <ListadoItems ref="ListadoItems" />
    <Factura ref="Factura" />
  </v-container>
</template>

<script lang="ts">
import FormVentas from "@/components/dashboard/modules/ventas/componentes/FormVentas.vue";
import ListadoItems from "@/components/dashboard/modules/ventas/componentes/ListadoItems.vue";
import Factura from "@/components/generals/Factura.vue";
import Vue from "vue";
import Swal from "sweetalert2";
import { DAR_NUMERO_FACTURA } from "@/generals/Funciones";
import { BUSCAR_PRODUCTOS_CODIGO_BARRAS } from "@/UseCases/ProductosUseCases";
import { ProductoVenta } from "@/dto/ProductoVenta";
import { REGISTER_NEW_SALE } from "@/domain/useCase/purchase/purchaseSaveUseCase";
import { Purchase } from "@/domain/model/purchase/Purchase";
import { ProductPurchase } from "@/domain/model/productpurchase/ProductPurchase";

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
      const formVentas: any = this.$refs.FormVentas;
      if (producto) {
        const listado: any = this.$refs.ListadoItems;
        listado.agregarProducto(producto.producto);
        formVentas.resetProduct();
        // this.audio.src = this.add;
        // await this.audio.play();
      } else {
        // this.audio.src = this.notFound;
        // await this.audio.play();
        formVentas.resetProduct();
        await Swal.fire({
          title: "Producto no encontrado",
          timer: 1000,
          icon: "error",
          showConfirmButton: false,
        });
      }
    },
    async generarFactura(purchase: Purchase) {
      const factura: any = this.$refs.Factura;
      const datos: any = this.$refs.ListadoItems;
      const formVentas: any = this.$refs.FormVentas;
      const productos: [] = datos.darItemsFactura().productos;
      const newProducts: ProductPurchase[] = productos.map(
        (e: ProductoVenta) => {
          return {
            id: "",
            bar_code: e.codigo,
            description: e.nombre,
            amount: e.getCantidad,
            price_shop: e.precio,
            price_purchase: e.precio,
            taxes: 0,
            discount: 0,
            subtotal: e.getSubtotal,
          };
        }
      );
      if (productos.length > 0) {
        const consecutivo = await DAR_NUMERO_FACTURA(1);
        if (typeof consecutivo === "boolean") {
          return;
        }
        await factura.asignarValores(
          purchase,
          datos.darItemsFactura(),
          consecutivo
        );
        factura.cambiarEstado();
        purchase.sales = [...newProducts];
        await REGISTER_NEW_SALE({ ...purchase });
        datos.resetValues();
        formVentas.resetDatosVenta();
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
