<template>
  <div>
    <v-chip class="ma-2" color="red" v-if="errorCodigo">
      Este numero de codigo ya esta registrado.
    </v-chip>
    <v-row class="mr-5 ml-5">
      <v-col>
        <v-simple-table>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">Código</th>
                <th class="text-left">Descripción Producto</th>
                <th class="text-left">Cantidad</th>
                <th class="text-left">Precio Compra</th>
                <th class="text-left">Ganancia</th>
                <th class="text-left">Precio Venta</th>
                <th class="text-left">Subototal</th>
                <th class="text-left">Actividad</th>
              </tr>
            </thead>
            <tbody class="dark" v-if="!anular">
              <tr @keyup.enter="validarProd ? null : addProduct()">
                <td>
                  <v-text-field
                    @input="findProduct()"
                    v-model="barCode"
                  ></v-text-field>
                </td>
                <td>
                  {{ newProduct.name }}
                </td>
                <td>
                  <v-text-field
                    @input="calculateSubtotal()"
                    v-model.number="newProduct.amount"
                    type="number"
                  ></v-text-field>
                </td>
                <td>
                  <v-text-field
                    @input="calculateUtilitiesByShop()"
                    type="number"
                    v-model.number="newProduct.price_shop"
                  ></v-text-field>
                </td>
                <td>
                  <v-text-field
                    @input="enterGains()"
                    type="number"
                    v-model.number="percentGain"
                  ></v-text-field>
                </td>
                <td>
                  <v-text-field
                    @input="enterSale()"
                    type="number"
                    v-model.number="newProduct.price_sale"
                  ></v-text-field>
                </td>
                <td>
                  {{ newProduct.subtotal }}
                </td>
                <td>
                  <v-btn
                    color="white"
                    @click="addProduct()"
                    :disabled="validarProd"
                    icon
                    class="warning ml-1"
                  >
                    <v-icon>mdi-plus</v-icon>
                  </v-btn>
                  <BuscarElemento
                    @getItem="selectProduct"
                    icon="mdi-magnify"
                    :items="availableProducts"
                    :headers="columnas"
                  />
                </td>
              </tr>
            </tbody>
            <tbody class="pt-3">
              <tr v-for="(item, index) in products" :key="index">
                <td>{{ item.bar_code }}</td>
                <td>{{ item.name }}</td>
                <td>{{ item.amount }}</td>
                <td>{{ item.price_shop }}</td>
                <td>
                  {{
                    Math.trunc(
                      ((item.price_sale - item.price_shop) / item.price_shop) *
                        100
                    )
                  }}
                </td>
                <td>{{ item.price_sale }}</td>
                <td>{{ item.subtotal }}</td>
                <td v-if="!anular">
                  <v-btn
                    color="white"
                    icon
                    class="error ml-1"
                    @click="deleteItem(index)"
                  >
                    <v-icon>mdi-trash-can-outline</v-icon>
                  </v-btn>
                </td>
              </tr>
            </tbody>
            <EditarCompra
              v-if="showEditPurchase"
              @actualizar="update"
              @cancelar="showEditPurchase = false"
              :compraAnterior="shopEdit"
              :mostrar="showEditPurchase"
              :indexElement="editPurchaseIndex"
              :wareHouse="wareHouse"
            />
          </template>
        </v-simple-table>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

import { COLUMNAS } from "@/models/Producto";

import { LISTAR_BODEGAS } from "@/generals/Funciones";
import { REDONDEAR } from "@/generals/procesamientos";
import { CARGAR_INFORMACION } from "@/services/crud";

import BuscarElemento from "@/components/crud/BuscarElemento.vue";
import EditarCompra from "./EditarCompra.vue";
import { IProductoCompra } from "@/models/ProductoCompra";

import Swal from "sweetalert2";
import { Product } from "@/domain/model/product/Product";
import { ProductPurchase } from "@/domain/model/productpurchase/ProductPurchase";

export default Vue.extend({
  name: "TablaCompras",
  components: {
    BuscarElemento,
    EditarCompra,
  },
  props: {
    compras: {
      type: Array as () => Array<ProductPurchase>,
    },
    eliminarDatos: Boolean,
    anular: Boolean,
  },
  data: () => ({
    columnas: COLUMNAS,
    products: [] as ProductPurchase[],
    newProduct: {} as ProductPurchase,
    shopEdit: {} as IProductoCompra,
    wareHouse: [{}],
    availableProducts: [],
    showEditPurchase: false,
    editPurchaseIndex: 1,
    percentGain: 0,
    barCode: null,
  }),
  computed: {
    validarProd() {
      if (
        this.newProduct.bar_code.toString().length >= 9 &&
        this.newProduct.name !== "" &&
        this.newProduct.amount >= 1 &&
        this.newProduct.price_shop >= 1 &&
        this.newProduct.price_sale >= this.newProduct.price_shop &&
        this.percentGain >= 0 &&
        this.newProduct.subtotal >= 1 &&
        this.newProduct.price_sale > this.newProduct.price_shop &&
        !this.errorCodigo
      ) {
        return false;
      }
      return true;
    },
    errorCodigo() {
      if (this.products.find((producto) => producto.bar_code == this.barCode)) {
        return true;
      }
      return false;
    },
  },
  methods: {
    async listStores() {
      this.wareHouse = [];
      const res: any = await LISTAR_BODEGAS();
      res.forEach((bod: any) => this.wareHouse.unshift(bod.data()));
    },
    async listProducts() {
      this.availableProducts = [];
      const res = await CARGAR_INFORMACION("products");
      this.availableProducts = res;
    },
    addProduct() {
      const product: ProductPurchase = { ...this.newProduct };
      const nuevosProductos: ProductPurchase[] = this.products;
      nuevosProductos.push(product);
      this.products = nuevosProductos;
      this.$emit("enviarProductos", this.products);
      this.resetNewProduct();
    },
    deleteItem(index: number) {
      Swal.fire({
        title: "¿Esta seguro de Eliminar este item?",
        showDenyButton: true,
        confirmButtonColor: "red",
        confirmButtonText: "Eliminar",
        denyButtonColor: "green",
        denyButtonText: `Cancelar`,
      }).then(async (result) => {
        if (result.isConfirmed) {
          this.products.splice(index, 1);
          this.$emit("enviarProductos", this.products);
        }
      });
    },
    resetNewProduct() {
      const producto: ProductPurchase = {
        id: "",
        bar_code: "",
        name: "",
        amount: this.newProduct.amount || 1,
        price_shop: 0,
        price_sale: 0,
        taxes: 0,
        discount: 0,
        subtotal: 0,
      };
      this.barCode = null;
      this.newProduct = producto;
    },
    findProduct() {
      this.availableProducts.forEach((prod: Product) => {
        if (prod.bar_code == this.barCode) {
          this.newProduct.name = prod.name;
          this.newProduct.bar_code = prod.bar_code;
          this.newProduct.price_sale = prod.sale_price;
          this.newProduct.price_shop = prod.unit_price;
          this.percentGain = REDONDEAR(
            ((prod.sale_price - prod.unit_price) / prod.sale_price) * 100,
            0
          );
        }
      });
    },
    calculateUtilitiesByShop() {
      if (this.percentGain > 0 && this.newProduct.price_shop > 0) {
        let precio_venta: number =
          this.newProduct.price_shop * (1 + this.percentGain / 100);
        this.newProduct.price_sale = REDONDEAR(precio_venta, -2);
      }
      this.calculateSubtotal();
    },
    calculateSubtotal() {
      const subtotal: number =
        Number(this.newProduct.amount) * Number(this.newProduct.price_shop) +
        Number(this.newProduct.taxes) -
        Number(this.newProduct.discount);
      this.newProduct.subtotal = subtotal;
    },
    enterGains() {
      if (this.percentGain >= 0 && this.newProduct.price_shop) {
        let precio_venta: number =
          this.newProduct.price_shop * (1 + this.percentGain / 100);
        this.newProduct.price_sale = REDONDEAR(precio_venta, -2);
      }
    },
    enterSale() {
      if (
        Number(this.newProduct.price_sale) >= Number(this.newProduct.price_shop)
      ) {
        const percentGain: number =
          ((Number(this.newProduct.price_sale) -
            Number(this.newProduct.price_shop)) /
            Number(this.newProduct.price_shop)) *
          100;
        this.percentGain = Math.trunc(percentGain);
      } else {
        this.percentGain = 0;
      }
    },
    selectProduct(product: ProductPurchase): void {
      const newProduct: ProductPurchase = {
        id: product.id,
        bar_code: product.bar_code,
        name: product.name,
        amount: this.newProduct.amount,
        price_shop: this.newProduct.price_shop,
        price_sale: this.newProduct.price_sale,
        taxes: this.newProduct.taxes || 0,
        discount: this.newProduct.discount || 0,
        subtotal: this.newProduct.subtotal,
      };
      this.newProduct = newProduct;
    },
    selectEditShop(compra: IProductoCompra, index: number) {
      this.showEditPurchase = true;
      this.editPurchaseIndex = index;
      this.shopEdit = compra;
    },
    update(element: any) {
      this.showEditPurchase = false;
      this.products[element.indice] = element.compra;
      this.$emit("enviarProductos", this.products);
    },
  },
  created: function () {
    this.listStores();
    this.listProducts();
    this.resetNewProduct();
    if (this.compras) {
      const nuevasCompras: Array<ProductPurchase> = this.compras;
      this.products = nuevasCompras;
    }
    this.columnas = this.columnas.filter((col: any) => {
      return col.value !== "detalle";
    });
  },
  watch: {
    eliminarDatos() {
      this.products = [];
    },
  },
});
</script>
