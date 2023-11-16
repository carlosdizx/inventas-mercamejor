<template>
  <v-container>
    <SalesForm
      v-on:codigo_barras="buscarProducto($event)"
      v-on:datos_cliente="generarFactura($event)"
      ref="SalesForm"
    />
    <ItemsList ref="ItemsList" />
    <Factura ref="Factura" />
  </v-container>
</template>

<script lang="ts">
import SalesForm from "@/components/dashboard/modules/sales/components/SalesForm.vue";
import ItemsList from "@/components/dashboard/modules/sales/components/ItemsList.vue";
import Factura from "@/components/generals/Factura.vue";
import Vue from "vue";
import Swal from "sweetalert2";
import { DAR_NUMERO_FACTURA } from "@/generals/Funciones";
import { BUSCAR_PRODUCTOS_CODIGO_BARRAS } from "@/UseCases/ProductosUseCases";
import { REGISTER_NEW_PURCHASE } from "@/domain/useCase/purchase/purchaseSaveUseCase";
import { Purchase } from "@/domain/model/purchase/Purchase";
import { ProductPurchase } from "@/domain/model/productpurchase/ProductPurchase";

export default Vue.extend({
  name: "Sales",
  components: { SalesForm, ItemsList, Factura },
  data: () => ({
    productos: [],
    audio: new Audio(),
    add: require("@/assets/audios/add_product.mp3"),
    notFound: require("@/assets/audios/not_found_product.mp3"),
  }),
  methods: {
    async buscarProducto(codigo_barras: number) {
      const producto = await BUSCAR_PRODUCTOS_CODIGO_BARRAS(codigo_barras * 1);
      const formVentas: any = this.$refs.SalesForm;
      if (producto) {
        const listado: any = this.$refs.ItemsList;
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
      const datos: any = this.$refs.ItemsList;
      const formVentas: any = this.$refs.SalesForm;
      const productos: [] = datos.darItemsFactura().productos;
      const newProducts: ProductPurchase[] = productos.map(
        (e: ProductPurchase) => {
          return {
            id: "",
            bar_code: e.bar_code,
            name: e.name,
            amount: e.amount,
            price_shop: e.price_shop,
            price_purchase: e.price_purchase,
            taxes: 0,
            discount: 0,
            subtotal: e.subtotal,
          } as ProductPurchase;
        }
      );
      if (productos.length > 0) {
        purchase.sales = [...newProducts];
        await REGISTER_NEW_PURCHASE({ ...purchase });
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
