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
                  v-model="productoNuevo.codigo"
                ></v-text-field>
              </td>
              <td>
                {{ productoNuevo.descripcion }}
              </td>
              <td>
                <v-select
                  v-model="productoNuevo.bodega"
                  :items="bodegas"
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
                  v-model="productoNuevo.precioCompra"
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
                  v-model="productoNuevo.precioVenta"
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
                {{ productoNuevo.subTotal }}
              </td>
              <td>
                <v-btn
                  color="white"
                  @click="agregarProducto"
                  :disabled="!validarProd"
                  icon
                  class="warning ml-1"
                >
                  Add
                </v-btn>
                <v-btn icon color="white" class="warning ml-1">
                  <v-icon>mdi-magnify</v-icon>
                </v-btn>
              </td>
            </tr>
          </tbody>
          {{ typeof productoNuevo.precioCompra }}
          <tbody class="pt-3">
            <tr v-for="(item, index) in desserts" :key="index">
              <td>{{ item.codigo }}</td>
              <td>{{ item.descripcion }}</td>
              <td>{{ item.bodega }}</td>
              <td>{{ item.cantidad }}</td>
              <td>{{ item.precioCompra }}</td>
              <td>{{ item.porGanancia }}</td>
              <td>{{ item.precioVenta }}</td>
              <td>{{ item.impuesto }}</td>
              <td>{{ item.descuento }}</td>
              <td>{{ item.subTotal }}</td>
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

import { LISTAR_BODEGAS, LISTAR_PRODUCTOS } from "@/generals/Funciones";
import { REDONDEAR, VALIDARCAMPOSNULOS } from "@/generals/procesamientos";

export default Vue.extend({
  name: "TablaCompras",
  data: () => ({
    desserts: [""],
    productoNuevo: {
      codigo: "",
      descripcion: "",
      bodega: "",
      cantidad: 1,
      precioCompra: 0,
      precioVenta: 0,
      porGanancia: 0,
      impuesto: 0,
      descuento: 0,
      subTotal: 0,
    },
    bodegas: [""],
    productos: [""],
  }),
  computed: {
    validarNuevoProducto() {
      return VALIDARCAMPOSNULOS(this.productoNuevo);
    },
    validarProd() {
      if (
        !this.productoNuevo.codigo ||
        !this.productoNuevo.descripcion ||
        !this.productoNuevo.descripcion ||
        !this.productoNuevo.bodega ||
        this.productoNuevo.cantidad < 1 ||
        this.productoNuevo.precioCompra < 1 ||
        this.productoNuevo.precioVenta < 1 ||
        this.productoNuevo.porGanancia < 0 ||
        this.productoNuevo.subTotal < 1 ||
        this.productoNuevo.precioVenta < this.productoNuevo.precioCompra
      )
        return false;
      return true;
    },
  },
  methods: {
    async listarBodegas() {
      this.bodegas = [];
      const res: any = await LISTAR_BODEGAS();
      res.forEach((bod: any) => this.bodegas.unshift(bod.data()));
    },
    async listarProductos() {
      this.productos = [];
      const res = await LISTAR_PRODUCTOS();
      res.forEach((prod: any) => this.productos.push(prod.data()));
    },
    agregarProducto() {
      const product: any = { ...this.productoNuevo };
      this.desserts.unshift(product);
      this.resetNuevoProducto();
    },
    eliminarItem(index: number) {
      this.desserts.splice(index, 1);
    },
    resetNuevoProducto() {
      this.productoNuevo.codigo = "";
      this.productoNuevo.descripcion = "";
      this.productoNuevo.cantidad = 1;
      this.productoNuevo.precioCompra = 0;
      this.productoNuevo.precioVenta = 0;
      this.productoNuevo.impuesto = 0;
      this.productoNuevo.descuento = 0;
      this.productoNuevo.subTotal = 10;
    },
    buscarProducto() {
      let producto = "";
      this.productos.forEach((prod: any) => {
        if (prod.codigo_barras === this.productoNuevo.codigo) {
          producto = prod.nombre;
        }
      });
      this.productoNuevo.descripcion = producto;
    },
    calcularSubtotal() {
      const subTotal: number =
        this.productoNuevo.cantidad * this.productoNuevo.precioCompra;
      this.productoNuevo.subTotal = subTotal;
    },
    ingresarGanancia() {
      if (this.productoNuevo.porGanancia >= 0) {
        let precioVenta: number =
          this.productoNuevo.precioCompra *
          (1 + this.productoNuevo.porGanancia / 100);
        let precio = REDONDEAR(precioVenta, -2);
        this.productoNuevo.precioVenta = precio;
      }
    },
    ingresarVenta() {
      if (this.productoNuevo.precioVenta >= this.productoNuevo.precioCompra) {
        const porGanancia: number =
          ((this.productoNuevo.precioVenta - this.productoNuevo.precioCompra) /
            this.productoNuevo.precioCompra) *
          100;
        this.productoNuevo.porGanancia = Math.trunc(porGanancia);
      } else {
        this.productoNuevo.porGanancia = 0;
      }
    },
  },
  created() {
    this.listarBodegas();
    this.listarProductos();
    console.log(this.productoNuevo.impuesto > 0);
  },
  mounted() {
    this.desserts = [];
  },
});
</script>
