<template>
  <v-row class="mr-5 ml-5">
    <v-col>
      <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">Código</th>
              <th class="text-left">Descripción Producto</th>
              <th class="text-left">Bodega</th>
              <th class="text-left">Cantidad</th>
              <th class="text-left">Precio Compra</th>
              <th class="text-left">% Ganancia</th>
              <th class="text-left">Precio Venta</th>
              <th class="text-left">Impuesto</th>
              <th class="text-left">Descuento</th>
              <th class="text-left">Subototal</th>
              <th class="text-left">Actividad</th>
            </tr>
          </thead>
          <tbody class="dark" v-if="!anular">
            <tr>
              <td>
                <v-text-field
                  @input="findProduct()"
                  v-model="barCode"
                ></v-text-field>
              </td>
              <td>
                {{ productoNuevo.descripcion }}
              </td>
              <td>
                <v-select
                  v-model="productoNuevo.bodega"
                  :items="bodegasDisponibles"
                  item-text="nombre"
                  item-value="nombre"
                ></v-select>
              </td>
              <td>
                <v-text-field
                  @input="calculateSubtotal()"
                  v-model.number="productoNuevo.cantidad"
                  type="number"
                ></v-text-field>
              </td>
              <td>
                <v-text-field
                  @input="calculateUtilitiesByShop()"
                  type="number"
                  v-model.number="productoNuevo.prec_com"
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
                  v-model.number="productoNuevo.prec_com"
                ></v-text-field>
              </td>
              <td>
                <v-text-field
                  type="number"
                  v-model.number="productoNuevo.impuesto"
                  @input="calculateSubtotal()"
                ></v-text-field>
              </td>
              <td>
                <v-text-field
                  type="number"
                  v-model.number="productoNuevo.descuento"
                  @input="calculateSubtotal()"
                ></v-text-field>
              </td>
              <td>
                {{ productoNuevo.subtotal }}
              </td>
              <td>
                <v-btn
                  color="white"
                  @click="addProduct()"
                  :disabled="!validarProd && false"
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
              <td>{{ item.cod_barras }}</td>
              <td>{{ item.descripcion }}</td>
              <td>{{ item.bodega }}</td>
              <td>{{ item.cantidad }}</td>
              <td>{{ item.prec_com }}</td>
              <td>
                {{
                  Math.trunc(
                    ((item.prec_ven - item.prec_com) / item.prec_com) * 100
                  )
                }}
              </td>
              <td>{{ item.prec_ven }}</td>
              <td>{{ item.impuesto }}</td>
              <td>{{ item.descuento }}</td>
              <td>{{ item.subtotal }}</td>
              <td v-if="!anular">
                <v-btn
                  @click="selectEditShop(item, index)"
                  color="white"
                  icon
                  class="success"
                >
                  <v-icon color="white">mdi-lead-pencil</v-icon>
                </v-btn>
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

export default Vue.extend({
  name: "TablaCompras",
  components: {
    BuscarElemento,
    EditarCompra,
  },
  props: {
    compras: {
      type: Array as () => Array<IProductoCompra>,
    },
    eliminarDatos: Boolean,
    anular: Boolean,
  },
  data: () => ({
    columnas: COLUMNAS,
    productos: [] as IProductoCompra[],
    productosPorGanancia: [],
    productoNuevo: {} as IProductoCompra,
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
        !this.productoNuevo.cod_barras ||
        !this.productoNuevo.descripcion ||
        !this.productoNuevo.bodega ||
        this.productoNuevo.cantidad < 1 ||
        this.productoNuevo.prec_com < 1 ||
        this.productoNuevo.prec_ven < 1 ||
        this.porGanancia < 0 ||
        this.productoNuevo.subtotal < 1 ||
        this.productoNuevo.prec_ven < this.productoNuevo.prec_com
      )
        return false;
      return true;
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
      const product: IProductoCompra = { ...this.productoNuevo };
      const nuevosProductos: IProductoCompra[] = this.productos;
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
      const producto: IProductoCompra = {
        cod_barras: 0,
        descripcion: "",
        bodega: this.productoNuevo.bodega || "",
        cantidad: this.productoNuevo.cantidad || 1,
        prec_com: 0,
        prec_ven: 0,
        impuesto: 0,
        descuento: 0,
        subtotal: 0,
      };
      this.productoNuevo = producto;
    },
    findProduct() {
      this.productosDisponibles.forEach((prod: Product) => {
        if (prod.bar_code == this.barCode) {
          this.productoNuevo.descripcion = prod.name;
          this.productoNuevo.cod_barras = prod.bar_code;
        }
      });
    },
    calculateUtilitiesByShop() {
      if (this.porGanancia > 0 && this.productoNuevo.prec_com > 0) {
        let precio_venta: number =
          this.productoNuevo.prec_com * (1 + this.porGanancia / 100);
        this.productoNuevo.prec_ven = REDONDEAR(precio_venta, -2);
      }
      this.calculateSubtotal();
    },
    calculateSubtotal() {
      const subtotal: number =
        Number(this.productoNuevo.cantidad) *
          Number(this.productoNuevo.prec_com) +
        Number(this.productoNuevo.impuesto) -
        Number(this.productoNuevo.descuento);
      this.productoNuevo.subtotal = subtotal;
    },
    enterGains() {
      if (this.porGanancia >= 0 && this.productoNuevo.prec_com) {
        let precio_venta: number =
          this.productoNuevo.prec_com * (1 + this.porGanancia / 100);
        let precio = REDONDEAR(precio_venta, -2);
        this.productoNuevo.prec_ven = precio;
      }
    },
    enterSale() {
      if (
        Number(this.productoNuevo.prec_ven) >=
        Number(this.productoNuevo.prec_com)
      ) {
        const porGanancia: number =
          ((Number(this.productoNuevo.prec_ven) -
            Number(this.productoNuevo.prec_com)) /
            Number(this.productoNuevo.prec_com)) *
          100;
        this.porGanancia = Math.trunc(porGanancia);
      } else {
        this.porGanancia = 0;
      }
    },
    selectProduct(product: any): void {
      const productoNuevo: IProductoCompra = {
        cod_barras: product.codigo_barras,
        descripcion: product.nombre,
        bodega: this.productoNuevo.bodega,
        cantidad: this.productoNuevo.cantidad,
        prec_com: this.productoNuevo.prec_com,
        prec_ven: this.productoNuevo.prec_ven,
        impuesto: this.productoNuevo.impuesto || 0,
        descuento: this.productoNuevo.descuento || 0,
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
      const nuevasCompras: Array<IProductoCompra> = this.compras;
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
