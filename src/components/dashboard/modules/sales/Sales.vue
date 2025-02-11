<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="6">
        <SalesForm
          v-on:codigo_barras="buscarProducto($event)"
          v-on:wihtout_product_register="registerProduct($event)"
          v-on:datos_cliente="generarFactura($event)"
          v-on:save_sale_without_factura="saveSaleWithoutInvoice($event)"
          ref="SalesForm"
        />
      </v-col>
      <v-col cols="12" md="6">
        <v-row>
          <v-col>
            <ItemsList ref="ItemsList" />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import SalesForm from "@/components/dashboard/modules/sales/components/SalesForm.vue";
import ItemsList from "@/components/dashboard/modules/sales/components/ItemsList.vue";
import Vue from "vue";
import Swal from "sweetalert2";
import { DAR_NUMERO_FACTURA } from "@/generals/Funciones";
import { CONSULT_ALL_PRODUCT } from "@/UseCases/ProductosUseCases";
import { REGISTER_NEW_SALE } from "@/domain/useCase/sale/saleSaveUseCase";
import { Sale } from "@/domain/model/sale/Sale";
import { ProductSale } from "@/domain/model/productsale/ProductSale";
import { generatePageToPrint } from "@/components/dashboard/modules/sales/components/SalesFunction";
import { ProductToList } from "@/domain/model/product/Product";

export default Vue.extend({
  name: "Sales",
  components: { SalesForm, ItemsList },
  data: () => ({
    productos: [],
    productsDatabase: [] as Array<ProductToList>,
    audio: new Audio(),
    add: require("@/assets/audios/add_product.mp3"),
    notFound: require("@/assets/audios/not_found_product.mp3"),
  }),
  methods: {
    async buscarProducto(codigo_barras: string) {
      const producto = this.productsDatabase.find(
        (p: ProductToList) => p.bar_code === codigo_barras
      );
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
    registerProduct(product: any) {
      const listado: any = this.$refs.ItemsList;
      const formVentas: any = this.$refs.SalesForm;

      listado.addProductNotRegister(product);
      formVentas.resetProductNotRegister();
    },
    async generarFactura(sale: Sale) {
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
        this.print({ ...sale });
        await REGISTER_NEW_SALE({ ...sale });
        const consecutivo = await DAR_NUMERO_FACTURA(1);
        if (typeof consecutivo === "boolean") {
          return;
        }
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
    async saveSaleWithoutInvoice(sale: Sale) {
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
        datos.resetValues();
        formVentas.resetDatosVenta();
        await Swal.fire({
          title: "Registro exitoso",
          icon: "success",
          timer: 500,
          showConfirmButton: false,
        });
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
    print(sale: Sale) {
      const ventanaImpresion = window.open("", "_blank");
      if (ventanaImpresion) {
        const contenidoImprimir = generatePageToPrint(
          sale,
          "Autoservicio la econommia"
        );
        ventanaImpresion.document.write("<html><head><title>Impresión</title>");
        ventanaImpresion.document.write("</head><body>");
        ventanaImpresion.document.write(contenidoImprimir);
        ventanaImpresion.document.write("</body></html>");
        ventanaImpresion.document.close();
        ventanaImpresion.print();
        ventanaImpresion.close();
      } else {
        console.error("No se pudo abrir la ventana de impresión");
      }
    },
  },
  async created() {
    this.productsDatabase = await CONSULT_ALL_PRODUCT();
  },
});
</script>

<style scoped></style>
