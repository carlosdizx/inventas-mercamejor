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
                  {{ productoNuevo.name }}
                </td>
                <td>
                  <v-text-field
                    @input="calculateSubtotal()"
                    v-model.number="productoNuevo.amount"
                    type="number"
                  ></v-text-field>
                </td>
                <td>
                  <v-text-field
                    @input="calculateUtilitiesByShop()"
                    type="number"
                    v-model.number="productoNuevo.price_shop"
                  ></v-text-field>
                </td>
                <td>
                  <v-text-field
                    @input="enterGains()"
                    type="number"
                    v-model.number="porGanancia"
                  ></v-text-field>
                </td>
                <td>
                  <v-text-field
                    @input="enterSale()"
                    type="number"
                    v-model.number="productoNuevo.price_sale"
                  ></v-text-field>
                </td>
                <td>
                  {{ productoNuevo.subtotal }}
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
                    :items="productosDisponibles"
                    :headers="columnas"
                  />
                </td>
              </tr>
            </tbody>
            <tbody class="pt-3">
              <tr v-for="(item, index) in productos" :key="index">
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
              v-if="mostrarEditarCompra"
              @actualizar="update"
              @cancelar="mostrarEditarCompra = false"
              :compraAnterior="compraEditar"
              :mostrar="mostrarEditarCompra"
              :indexElement="editarCompraIndice"
              :bodegasDisponibles="bodegasDisponibles"
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
    productos: [] as ProductPurchase[],
    productosPorGanancia: [],
    productoNuevo: {} as ProductPurchase,
    compraEditar: {} as IProductoCompra,
    bodegasDisponibles: [{}],
    productosDisponibles: [],
    mostrarEditarCompra: false,
    editarCompraIndice: 1,
    porGanancia: 0,
    barCode: null,
  }),
  computed: {
    validarProd() {
      if (
        this.productoNuevo.bar_code.toString().length >= 9 &&
        this.productoNuevo.name !== "" &&
        this.productoNuevo.amount >= 1 &&
        this.productoNuevo.price_shop >= 1 &&
        this.productoNuevo.price_sale >= this.productoNuevo.price_shop &&
        this.porGanancia >= 0 &&
        this.productoNuevo.subtotal >= 1 &&
        this.productoNuevo.price_sale > this.productoNuevo.price_shop &&
        !this.errorCodigo
      ) {
        return false;
      }
      return true;
    },
    errorCodigo() {
      if (
        this.productos.find((producto) => producto.bar_code == this.barCode)
      ) {
        return true;
      }
      return false;
    },
  },
  methods: {
    async listStores() {
      this.bodegasDisponibles = [];
      const res: any = await LISTAR_BODEGAS();
      res.forEach((bod: any) => this.bodegasDisponibles.unshift(bod.data()));
    },
    async listProducts() {
      this.productosDisponibles = [];
      const res = await CARGAR_INFORMACION("products");
      this.productosDisponibles = res;
    },
    addProduct() {
      const product: ProductPurchase = { ...this.productoNuevo };
      const nuevosProductos: ProductPurchase[] = this.productos;
      nuevosProductos.push(product);
      this.productos = nuevosProductos;
      this.$emit("enviarProductos", this.productos);
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
          this.productos.splice(index, 1);
          this.$emit("enviarProductos", this.productos);
        }
      });
    },
    resetNewProduct() {
      const producto: ProductPurchase = {
        id: "",
        bar_code: "",
        name: "",
        amount: this.productoNuevo.amount || 1,
        price_shop: 0,
        price_sale: 0,
        taxes: 0,
        discount: 0,
        subtotal: 0,
      };
      this.barCode = null;
      this.productoNuevo = producto;
    },
    findProduct() {
      this.productosDisponibles.forEach((prod: Product) => {
        if (prod.bar_code == this.barCode) {
          this.productoNuevo.name = prod.name;
          this.productoNuevo.bar_code = prod.bar_code;
          this.productoNuevo.price_sale = prod.sale_price;
        }
      });
    },
    calculateUtilitiesByShop() {
      if (this.porGanancia > 0 && this.productoNuevo.price_shop > 0) {
        let precio_venta: number =
          this.productoNuevo.price_shop * (1 + this.porGanancia / 100);
        this.productoNuevo.price_sale = REDONDEAR(precio_venta, -2);
      }
      this.calculateSubtotal();
    },
    calculateSubtotal() {
      const subtotal: number =
        Number(this.productoNuevo.amount) *
          Number(this.productoNuevo.price_shop) +
        Number(this.productoNuevo.taxes) -
        Number(this.productoNuevo.discount);
      this.productoNuevo.subtotal = subtotal;
    },
    enterGains() {
      if (this.porGanancia >= 0 && this.productoNuevo.price_shop) {
        let precio_venta: number =
          this.productoNuevo.price_shop * (1 + this.porGanancia / 100);
        this.productoNuevo.price_sale = REDONDEAR(precio_venta, -2);
      }
    },
    enterSale() {
      if (
        Number(this.productoNuevo.price_sale) >=
        Number(this.productoNuevo.price_shop)
      ) {
        const porGanancia: number =
          ((Number(this.productoNuevo.price_sale) -
            Number(this.productoNuevo.price_shop)) /
            Number(this.productoNuevo.price_shop)) *
          100;
        this.porGanancia = Math.trunc(porGanancia);
      } else {
        this.porGanancia = 0;
      }
    },
    selectProduct(product: ProductPurchase): void {
      const productoNuevo: ProductPurchase = {
        id: product.id,
        bar_code: product.bar_code,
        name: product.name,
        amount: this.productoNuevo.amount,
        price_shop: this.productoNuevo.price_shop,
        price_sale: this.productoNuevo.price_sale,
        taxes: this.productoNuevo.taxes || 0,
        discount: this.productoNuevo.discount || 0,
        subtotal: this.productoNuevo.subtotal,
      };
      this.productoNuevo = productoNuevo;
    },
    selectEditShop(compra: IProductoCompra, index: number) {
      this.mostrarEditarCompra = true;
      this.editarCompraIndice = index;
      this.compraEditar = compra;
    },
    update(element: any) {
      this.mostrarEditarCompra = false;
      this.productos[element.indice] = element.compra;
      this.$emit("enviarProductos", this.productos);
    },
  },
  created: function () {
    this.listStores();
    this.listProducts();
    this.resetNewProduct();
    if (this.compras) {
      const nuevasCompras: Array<ProductPurchase> = this.compras;
      this.productos = nuevasCompras;
    }
    this.columnas = this.columnas.filter((col: any) => {
      return col.value !== "detalle";
    });
  },
  watch: {
    eliminarDatos() {
      this.productos = [];
    },
  },
});
</script>
