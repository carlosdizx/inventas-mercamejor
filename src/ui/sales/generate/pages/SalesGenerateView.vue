<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="6">
        <SalesRegisterLayout
          v-on:codigo_barras="buscarProducto($event)"
          v-on:wihtout_product_register="registerProduct($event)"
          v-on:datos_cliente="generarFactura($event)"
          v-on:save_sale_without_factura="saveSaleWithoutInvoice($event)"
          ref="salesRegisterLayout"
        />
      </v-col>
      <v-col cols="12" md="6">
        <v-row>
          <v-col>
            <ItemsList 
              ref="ItemsList" 
            />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { useSaleGenerateStore } from '@/ui/sales/generate/store/SalesGenerateViewStore'
import SalesRegisterLayout from "@/ui/sales/generate/layouts/SalesRegisterLayout.vue";
import ItemsList from "@/ui/sales/generate/layouts/ItemsList.vue";
import { defineComponent, ref } from "vue";
import Swal from "sweetalert2";
import { DAR_NUMERO_FACTURA } from "@/generals/Funciones";
import { CONSULT_ALL_PRODUCT } from "@/UseCases/ProductosUseCases";
import { REGISTER_NEW_SALE } from "@/domain/useCase/sale/saleSaveUseCase";
import { SaleGenerate } from "@/domain/model/sales/generate/model/SaleGenerate";
import { ProductSale } from "@/domain/model/sales/generate/model/product/ProductSale";
import { generatePageToPrint } from "@/ui/sales/generate/layouts/SalesFunction";
import { ProductToList } from "@/domain/model/product/Product";
import addSound from "@/assets/audios/add_product.mp3";
import notFoundSound from "@/assets/audios/not_found_product.mp3";

export default defineComponent({
  name: "Sales",
  components: { SalesRegisterLayout, ItemsList },
  setup() {
    const productsDatabase = ref<ProductToList[]>([]);
    const audio = new Audio();
    const add = addSound;
    const salesRegisterLayout = ref<any>(null);
    const notFound = notFoundSound;

    const saleStore = useSaleGenerateStore()
    
    const focusBarCode = () => {
      if (salesRegisterLayout.value) {
        salesRegisterLayout.value.abrirModal();
      }
    };

    const buscarProducto = async (codigo_barras: string) => {
      const producto = productsDatabase.value.find(
        (p: ProductToList) => p.bar_code === codigo_barras
      );
      if (producto) {
        const newProduct: ProductSale = {
          bar_code: producto.bar_code,
          name: producto.name,
          amount: 1,
          shop_price: producto.unit_price,
          sale_price: producto.sale_price,
          taxes: 0,
          discount: 0,
          subtotal: producto.sale_price,
        };
        saleStore.addProduct(newProduct);
        // audio.src = add;
        // await audio.play();
      } else {
        // audio.src = notFound;
        // await audio.play();
        await Swal.fire({
          title: "Producto no encontrado",
          timer: 1000,
          icon: "error",
          showConfirmButton: false,
        });
      }
    };

    const registerProduct = (product: any) => {
      const newProduct: ProductSale = {
        bar_code: "",
        name: product.description,
        amount: 1,
        shop_price: 0,
        sale_price: Number(product.price),
        taxes: 0,
        discount: 0,
        subtotal: Number(product.price),
      };
      saleStore.addProduct(newProduct);
    };

    const updateProduct = (updatedProduct: ProductSale) => {
      const index = saleStore.currentSale.sales.findIndex(p => 
        (updatedProduct.bar_code && p.bar_code === updatedProduct.bar_code) || 
        (!updatedProduct.bar_code && p.name === updatedProduct.name)
      );
      if (index !== -1) {
        saleStore.updateProduct(index, updatedProduct);
      }
    };

    const deleteProduct = (product: ProductSale) => {
      const index = saleStore.currentSale.sales.findIndex(p => 
        (product.bar_code && p.bar_code === product.bar_code) || 
        (!product.bar_code && p.name === product.name)
      );
      if (index !== -1) {
        saleStore.removeProduct(index);
      }
    };

    const resetProducts = () => {
      saleStore.clearSale();
    };

    const generarFactura = async (sale: SaleGenerate) => {
      if (saleStore.currentSale.sales.length > 0) {
        sale.sales = [...saleStore.currentSale.sales];
        sale.total = saleStore.currentSale.total;
        sale.subtotal = saleStore.currentSale.subtotal;
        print({ ...sale });
        await REGISTER_NEW_SALE({ ...sale });
        const consecutivo = await DAR_NUMERO_FACTURA(1);
        if (typeof consecutivo === "boolean") {
          return;
        }
        resetProducts();
      } else {
        await Swal.fire({
          title: "Sin productos",
          html: "No se puede generar una factura y registrar venta",
          icon: "error",
          timer: 800,
          showConfirmButton: false,
        });
      }
    };

    const saveSaleWithoutInvoice = async (sale: SaleGenerate) => {
      if (saleStore.currentSale.sales.length > 0) {
        sale.sales = [...saleStore.currentSale.sales];
        sale.total = saleStore.currentSale.total;
        sale.subtotal = saleStore.currentSale.subtotal;
        await REGISTER_NEW_SALE({ ...sale });
        const consecutivo = await DAR_NUMERO_FACTURA(1);
        if (typeof consecutivo === "boolean") {
          return;
        }
        resetProducts();
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
    };

    const print = (sale: SaleGenerate) => {
      const ventanaImpresion = window.open("", "_blank");
      if (ventanaImpresion) {
        const contenidoImprimir = generatePageToPrint(
          sale,
          "Autoservicio la econommia"
        );

        ventanaImpresion.document.title = "Impresión";
        ventanaImpresion.document.body.innerHTML = contenidoImprimir;

        ventanaImpresion.print();
        ventanaImpresion.close();
      } else {
        console.error("No se pudo abrir la ventana de impresión");
      }
    };

    const init = async () => {
      productsDatabase.value = await CONSULT_ALL_PRODUCT();
    };

    init();

    return {
      productsDatabase,
      buscarProducto,
      registerProduct,
      updateProduct,
      deleteProduct,
      resetProducts,
      generarFactura,
      saveSaleWithoutInvoice,
      print
    };
  }
});
</script>

<style scoped></style>
