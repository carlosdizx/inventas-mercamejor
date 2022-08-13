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
          <tbody class="dark">
            <tr>
              <td>
                <v-text-field
                  @input="buscarProducto()"
                  v-model.number="productoNuevo.codigo_barras"
                ></v-text-field>
              </td>
              <td>
                {{ productoNuevo.descripcion_producto }}
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
                  @input="calcularSubtotal()"
                  v-model.number="productoNuevo.cantidad"
                  type="number"
                ></v-text-field>
              </td>
              <td>
                <v-text-field
                  @input="calcularGananciaPrecioCompra()"
                  type="number"
                  v-model.number="productoNuevo.precio_compra"
                ></v-text-field>
              </td>
              <td>
                <v-text-field
                  @input="ingresarGanancia()"
                  type="number"
                  v-model.number="porGanancia"
                ></v-text-field>
              </td>
              <td>
                <v-text-field
                  @input="ingresarVenta()"
                  type="number"
                  v-model.number="productoNuevo.precio_venta"
                ></v-text-field>
              </td>
              <td>
                <v-text-field
                  type="number"
                  v-model.number="productoNuevo.impuesto"
                  @input="calcularSubtotal()"
                ></v-text-field>
              </td>
              <td>
                <v-text-field
                  type="number"
                  v-model.number="productoNuevo.descuento"
                  @input="calcularSubtotal()"
                ></v-text-field>
              </td>
              <td>
                {{ productoNuevo.subtotal }}
              </td>
              <td>
                <v-btn
                  color="white"
                  @click="agregarProducto()"
                  :disabled="!validarProd"
                  icon
                  class="warning ml-1"
                >
                  <v-icon>mdi-plus</v-icon>
                </v-btn>
                <BuscarElemento
                  @getItem="seleccionaProducto"
                  icon="mdi-magnify"
                  :items="productosDisponibles"
                  :headers="columnas"
                />
              </td>
            </tr>
          </tbody>
          <tbody class="pt-3">
            <tr v-for="(item, index) in productos" :key="index">
              <td>{{ item.codigo_barras }}</td>
              <td>{{ item.descripcion_producto }}</td>
              <td>{{ item.bodega }}</td>
              <td>{{ item.cantidad }}</td>
              <td>{{ item.precio_compra }}</td>
              <td>
                {{
                  Math.trunc(
                    ((item.precio_venta - item.precio_compra) /
                      item.precio_compra) *
                      100
                  )
                }}
              </td>
              <td>{{ item.precio_venta }}</td>
              <td>{{ item.impuesto }}</td>
              <td>{{ item.descuento }}</td>
              <td>{{ item.subtotal }}</td>
              <td>
                <v-btn
                  @click="seleccionarCompraEditar(item, index)"
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
                  @click="eliminarItem(index)"
                >
                  <v-icon>mdi-trash-can-outline</v-icon>
                </v-btn>
              </td>
            </tr>
          </tbody>
          <EditarCompra
            v-if="mostrarEditarCompra"
            @actualizar="actualizar"
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
import { ProductoCompra } from "@/interfaces/ProductoCompra";

import Swal from "sweetalert2";

export default Vue.extend({
  name: "TablaCompras",
  components: {
    BuscarElemento,
    EditarCompra,
  },
  props: {
    compras: {
      type: Array as () => Array<ProductoCompra>,
    },
    eliminarDatos: Boolean,
  },
  data: () => ({
    columnas: COLUMNAS,
    productos: [] as ProductoCompra[],
    productosPorGanancia: [],
    productoNuevo: {} as ProductoCompra,
    compraEditar: {} as ProductoCompra,
    bodegasDisponibles: [{}],
    productosDisponibles: [{}],
    mostrarEditarCompra: false,
    editarCompraIndice: 1,
    porGanancia: 0,
  }),
  computed: {
    validarProd() {
      if (
        !this.productoNuevo.codigo_barras ||
        !this.productoNuevo.descripcion_producto ||
        !this.productoNuevo.descripcion_producto ||
        !this.productoNuevo.bodega ||
        this.productoNuevo.cantidad < 1 ||
        this.productoNuevo.precio_compra < 1 ||
        this.productoNuevo.precio_venta < 1 ||
        this.porGanancia < 0 ||
        this.productoNuevo.subtotal < 1 ||
        this.productoNuevo.precio_venta < this.productoNuevo.precio_compra
      )
        return false;
      return true;
    },
  },
  methods: {
    async listarBodegas() {
      this.bodegasDisponibles = [];
      const res: any = await LISTAR_BODEGAS();
      res.forEach((bod: any) => this.bodegasDisponibles.unshift(bod.data()));
    },
    async listarProductos() {
      this.productosDisponibles = [];
      const res = await CARGAR_INFORMACION("productos");
      this.productosDisponibles = res;
    },
    agregarProducto() {
      const product: ProductoCompra = { ...this.productoNuevo };
      const nuevosProductos: ProductoCompra[] = this.productos;
      nuevosProductos.push(product);
      this.productos = nuevosProductos;
      this.$emit("enviarProductos", this.productos);
      this.resetNuevoProducto();
    },
    eliminarItem(index: number) {
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
    resetNuevoProducto() {
      const producto: ProductoCompra = {
        codigo_barras: null,
        descripcion_producto: "",
        bodega: this.productoNuevo.bodega || "",
        cantidad: this.productoNuevo.cantidad || 1,
        precio_compra: 0,
        precio_venta: 0,
        impuesto: 0,
        descuento: 0,
        subtotal: 0,
      };
      this.productoNuevo = producto;
    },
    buscarProducto() {
      let producto = "";
      this.productosDisponibles.forEach((prod: any) => {
        if (prod.codigo_barras === Number(this.productoNuevo.codigo_barras)) {
          producto = prod.nombre;
        }
      });
      this.productoNuevo.descripcion_producto = producto;
    },
    calcularGananciaPrecioCompra() {
      if (this.porGanancia > 0 && this.productoNuevo.precio_compra > 0) {
        let precio_venta: number =
          this.productoNuevo.precio_compra * (1 + this.porGanancia / 100);
        let precio = REDONDEAR(precio_venta, -2);
        this.productoNuevo.precio_venta = precio;
      }
      this.calcularSubtotal();
    },
    calcularSubtotal() {
      const subtotal: number =
        Number(this.productoNuevo.cantidad) *
          Number(this.productoNuevo.precio_compra) +
        Number(this.productoNuevo.impuesto) -
        Number(this.productoNuevo.descuento);
      this.productoNuevo.subtotal = subtotal;
    },
    ingresarGanancia() {
      if (this.porGanancia >= 0 && this.productoNuevo.precio_compra) {
        let precio_venta: number =
          this.productoNuevo.precio_compra * (1 + this.porGanancia / 100);
        let precio = REDONDEAR(precio_venta, -2);
        this.productoNuevo.precio_venta = precio;
      }
    },
    ingresarVenta() {
      if (
        Number(this.productoNuevo.precio_venta) >=
        Number(this.productoNuevo.precio_compra)
      ) {
        const porGanancia: number =
          ((Number(this.productoNuevo.precio_venta) -
            Number(this.productoNuevo.precio_compra)) /
            Number(this.productoNuevo.precio_compra)) *
          100;
        this.porGanancia = Math.trunc(porGanancia);
      } else {
        this.porGanancia = 0;
      }
    },
    seleccionaProducto(product: any): void {
      const productoNuevo: ProductoCompra = {
        codigo_barras: product.codigo_barras,
        descripcion_producto: product.nombre,
        bodega: this.productoNuevo.bodega,
        cantidad: this.productoNuevo.cantidad,
        precio_compra: this.productoNuevo.precio_compra,
        precio_venta: this.productoNuevo.precio_venta,
        impuesto: this.productoNuevo.impuesto || 0,
        descuento: this.productoNuevo.descuento || 0,
        subtotal: this.productoNuevo.subtotal,
      };
      this.productoNuevo = productoNuevo;
    },
    seleccionarCompraEditar(compra: ProductoCompra, index: number) {
      this.mostrarEditarCompra = true;
      this.editarCompraIndice = index;
      this.compraEditar = compra;
    },
    actualizar(element: any) {
      this.mostrarEditarCompra = false;
      this.productos[element.indice] = element.compra;
      this.$emit("enviarProductos", this.productos);
    },
  },
  created() {
    this.listarBodegas();
    this.listarProductos();
    this.resetNuevoProducto();
    if (this.compras) {
      const nuevasCompras: Array<ProductoCompra> = this.compras;
      this.productos = nuevasCompras;
    }
    this.columnas = this.columnas.filter((col: any) => {
      if (col.value !== "detalle") return true;
      return false;
    });
  },
  watch: {
    eliminarDatos() {
      this.productos = [];
    },
  },
});
</script>
