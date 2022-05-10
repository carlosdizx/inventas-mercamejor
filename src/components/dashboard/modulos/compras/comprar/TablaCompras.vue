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
                  v-model="productoNuevo.codigo_barras"
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
                  v-model="productoNuevo.cantidad"
                  type="number"
                ></v-text-field>
              </td>
              <td>
                <v-text-field
                  @input="calcularSubtotal()"
                  type="number"
                  v-model="productoNuevo.precio_compra"
                ></v-text-field>
              </td>
              <td>
                <v-text-field
                  @input="ingresarGanancia()"
                  type="number"
                  v-model="productoNuevo.porGanancia"
                ></v-text-field>
              </td>
              <td>
                <v-text-field
                  @input="ingresarVenta()"
                  type="number"
                  v-model="productoNuevo.precio_venta"
                ></v-text-field>
              </td>
              <td>
                <v-text-field
                  type="number"
                  v-model="productoNuevo.impuesto"
                ></v-text-field>
              </td>
              <td>
                <v-text-field
                  type="number"
                  v-model="productoNuevo.descuento"
                ></v-text-field>
              </td>
              <td>
                {{ productoNuevo.subtotal }}
              </td>
              <td>
                <v-btn
                  color="white"
                  @click="agregarProducto"
                  :disabled="!validarProd"
                  icon
                  class="warning ml-1"
                >
                  <v-icon>mdi-plus</v-icon>
                </v-btn>
                <BuscarElemento
                  @getItem="selecionarUsuario"
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
              <td>{{ item.porGanancia }}</td>
              <td>{{ item.precio_venta }}</td>
              <td>{{ item.impuesto }}</td>
              <td>{{ item.descuento }}</td>
              <td>{{ item.subtotal }}</td>
              <td>
                <v-btn color="white" icon class="success">
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

export default Vue.extend({
  name: "TablaCompras",
  components: {
    BuscarElemento,
  },
  data: () => ({
    columnas: COLUMNAS,
    productos: [""],
    productoNuevo: {
      codigo_barras: "",
      descripcion_producto: "",
      bodega: "",
      cantidad: 1,
      precio_compra: 0,
      precio_venta: 0,
      porGanancia: 0,
      impuesto: 0,
      descuento: 0,
      subtotal: 0,
    },
    bodegasDisponibles: [""],
    productosDisponibles: [""],
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
        this.productoNuevo.porGanancia < 0 ||
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
      const product: any = { ...this.productoNuevo };
      this.productos.unshift(product);
      this.resetNuevoProducto();
      this.$emit("enviarProductos", this.productos);
    },
    eliminarItem(index: number) {
      this.productos.splice(index, 1);
      this.$emit("enviarProductos", this.productos);
    },
    resetNuevoProducto(): void {
      this.productoNuevo.codigo_barras = "";
      this.productoNuevo.descripcion_producto = "";
      this.productoNuevo.cantidad = 1;
      this.productoNuevo.precio_compra = 0;
      this.productoNuevo.precio_venta = 0;
      this.productoNuevo.impuesto = 0;
      this.productoNuevo.descuento = 0;
      this.productoNuevo.subtotal = 10;
    },
    buscarProducto() {
      let producto = "";
      this.productosDisponibles.forEach((prod: any) => {
        if (prod.codigo_barras === this.productoNuevo.codigo_barras) {
          producto = prod.nombre;
        }
      });
      this.productoNuevo.descripcion_producto = producto;
    },
    calcularSubtotal() {
      const subtotal: number =
        this.productoNuevo.cantidad * this.productoNuevo.precio_compra;
      this.productoNuevo.subtotal = subtotal;
    },
    ingresarGanancia() {
      if (this.productoNuevo.porGanancia >= 0) {
        let precio_venta: number =
          this.productoNuevo.precio_compra *
          (1 + this.productoNuevo.porGanancia / 100);
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
        this.productoNuevo.porGanancia = Math.trunc(porGanancia);
      } else {
        this.productoNuevo.porGanancia = 0;
      }
    },
    selecionarUsuario(product: any) {
      this.productoNuevo.codigo_barras = product.codigo_barras;
      this.productoNuevo.descripcion_producto = product.nombre;
    },
  },
  created() {
    this.listarBodegas();
    this.listarProductos();
    this.productos = [];
    this.columnas = this.columnas.filter((col: any) => {
      if (col.value !== "detalle") return true;
      return false;
    });
  },
});
</script>
