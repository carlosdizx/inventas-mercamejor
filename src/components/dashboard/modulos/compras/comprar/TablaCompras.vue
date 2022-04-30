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
                <v-text-field v-model="productoNuevo.cantidad"></v-text-field>
              </td>
              <td>
                <v-text-field
                  v-model="productoNuevo.precioCompra"
                ></v-text-field>
              </td>
              <td>
                <v-text-field
                  v-model="productoNuevo.precioVenta"
                ></v-text-field>
              </td>
              <td>
                <v-text-field
                  v-model="productoNuevo.porGanancia"
                ></v-text-field>
              </td>
              <td>
                <v-text-field v-model="productoNuevo.impuesto"></v-text-field>
              </td>
              <td>
                <v-text-field v-model="productoNuevo.descuento"></v-text-field>
              </td>
              <td>
                {{ productoNuevo.cantidad * productoNuevo.precioCompra }}
              </td>
              <td>
                <v-btn @click="agregarProducto" icon class="warning ml-1">
                  +
                </v-btn>
              </td>
            </tr>
          </tbody>
          <tbody class="pt-3">
            <tr v-for="item in desserts" :key="item.name">
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
                <v-btn icon class="success">
                  <v-icon>mdi-lead-pencil</v-icon>
                </v-btn>
                <v-btn icon class="error ml-1">
                  <v-icon>mdi-trash-can-outline</v-icon>
                </v-btn>
                <v-btn icon class="warning ml-1">
                  <v-icon>mdi-magnify</v-icon>
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

export default Vue.extend({
  name: "TablaCompras",
  data: () => ({
    desserts: [
      {
        codigo: "9452342312",
        descripcion: "yogurt griego",
        bodega: "Princial",
        cantidad: 12,
        precioCompra: 5800,
        precioVenta: 8200,
        porGanancia: 0,
        impuesto: 0,
        descuento: 100,
        subTotal: 70000,
      },
      {
        codigo: "9452342321",
        descripcion: "Ice cream sandwich",
        bodega: "Princial",
        cantidad: 10,
        precioCompra: 8000,
        precioVenta: 92000,
        porGanancia: 12,
        impuesto: 0,
        descuento: 0,
        subTotal: 80000,
      },
    ],
    productoNuevo: {
      codigo: "",
      descripcion: "",
      bodega: "",
      cantidad: 1,
      precioCompra: 0,
      precioVenta: 0,
      porGanancia: 12,
      impuesto: 0,
      descuento: 0,
      subTotal: 0,
    },
    bodegas: [""],
    productos: [""],
  }),
  methods: {
    async listarBodegas() {
      this.bodegas = [];
      const res: any = await LISTAR_BODEGAS();
      res.forEach((bod: any) => this.bodegas.push(bod.data()));
    },
    async listarProductos() {
      this.productos = [];
      const res = await LISTAR_PRODUCTOS();
      res.forEach((prod: any) => this.productos.push(prod.data()));
    },
    agregarProducto() {
      this.desserts.push(this.productoNuevo);
    },
    buscarProducto() {
      this.productos.forEach((prod: any) => {
        if (prod.codigo_barras === this.productoNuevo.codigo) {
          console.log("yes");
          this.productoNuevo.descripcion = prod.nombre;
        }
      });
    },
  },
  created() {
    this.listarBodegas();
    this.listarProductos();
  },
});
</script>
