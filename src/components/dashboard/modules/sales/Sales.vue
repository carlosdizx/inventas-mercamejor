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
import { REGISTER_NEW_SALE } from "@/domain/useCase/sale/saleSaveUseCase";
import { Sale } from "@/domain/model/sale/Sale";
import { ProductSale } from "@/domain/model/productsale/ProductSale";

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
        listado.agregarProducto(producto);
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
    async generarFactura(sale: Sale) {
      const factura: any = this.$refs.Factura;
      const datos: any = this.$refs.ItemsList;
      const formVentas: any = this.$refs.SalesForm;
      const productos: ProductSale[] = datos.darItemsFactura().productos;
      const newProducts: ProductSale[] = productos.map((e: ProductSale) => {
        return {
          bar_code: e.bar_code,
          name: e.name,
          amount: e.amount,
          shop_price: e.shop_price,
          sale_price: e.sale_price,
          taxes: 0,
          discount: 0,
          subtotal: e.subtotal,
        } as ProductSale;
      });
      if (productos.length > 0) {
        sale.sales = [...newProducts];
        let subtotal = 0;
        let descuento = 0;
        let total = 0;
        for (const temp of productos) {
          subtotal += temp.subtotal;
          descuento += temp.discount * temp.amount;
          total = subtotal - descuento;
        }
        sale.total = total;
        sale.subtotal = total;
        await REGISTER_NEW_SALE({ ...sale });
        const consecutivo = await DAR_NUMERO_FACTURA(1);
        if (typeof consecutivo === "boolean") {
          return;
        }
        await factura.asignarValores(
          sale,
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
