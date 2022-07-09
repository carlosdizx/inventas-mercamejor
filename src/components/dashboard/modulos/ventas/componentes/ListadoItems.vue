<template>
  <div>
    <v-card-text>
      <v-form>
        <v-row>
          <v-col cols="6">
            <v-slider
              label="Descuento adicional"
              max="100"
              min="0"
              v-model="descuento_adicional"
              thumb-label="always"
            />
            <vuetify-money
              label="Descuento"
              prepend-icon="mdi-percent"
              type="number"
              prefix="%"
              dense
              outlined
              counter
              v-model="descuento_adicional"
              @input="evaluarValorDescuento"
            />
            <v-text-field
              label="Precio final"
              prepend-icon="mdi-cash"
              type="number"
              prefix="$"
              color="success"
              dense
              readonly
              outlined
              :value="total - (total * descuento_adicional) / 100"
            />
            <v-col cols="6">
              <vuetify-money
                label="Calculadora rápida"
                prepend-icon=""
                prefix="$"
                dense
                counter
                v-model="calculadora"
              />
            </v-col>
          </v-col>
          <v-col cols="6">
            <v-chip color="amber" class="ma-2">
              Subtotal: {{ subtotal }}
            </v-chip>
            <v-chip color="info" class="ma-2">
              Descuento: {{ descuento }}
            </v-chip>
            <v-chip color="success" class="ma-2"> Total: {{ total }} </v-chip>
            <v-chip color="success" class="ma-2">
              Descuento adicional: {{ (total * descuento_adicional) / 100 }}
            </v-chip>
            <v-alert
              outlined
              dark
              color="success darken-2"
              class="mx-auto text-center"
            >
              Precio final: $ {{ total - (total * descuento_adicional) / 100 }}
            </v-alert>
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>
    <v-data-table :headers="columnas" :items="filas">
      <template v-slot:item.cantidad="{ item }">
        <v-edit-dialog
          @save="cambiarCantidadProducto"
          @clse="cambiarCantidadProducto"
          @cancel="cambiarCantidadProducto"
        >
          {{ item.cantidad }}
          <template v-slot:input>
            <v-text-field
              @focusout="cambiarCantidadProducto"
              label="Editar"
              counter
              v-model="item.cantidad"
            />
          </template>
        </v-edit-dialog>
      </template>
    </v-data-table>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Swal from "sweetalert2";
import { AGREGAR_PRODUCTO, YA_LISTADO } from "@/UseCases/ProductosUseCases";
import { Producto } from "@/entity/Producto";
import { ProductoVenta } from "@/dto/ProductoVenta";

export default Vue.extend({
  name: "ListadoItems",
  data: () => ({
    total: 0,
    subtotal: 0,
    descuento: 0,
    calculadora: 0,
    columnas: [
      { text: "Codigo", value: "codigo" },
      { text: "Producto", value: "nombre" },
      { text: "Cantidad", value: "cantidad" },
      { text: "Precio*uni", value: "precio" },
      { text: "Subtotal", value: "subtotal" },
    ],
    filas: [] as ProductoVenta[],
    descuento_adicional: 0,
  }),
  methods: {
    async agregarProducto(producto: Producto) {
      const agregado = await YA_LISTADO(this.filas, producto);
      const pv: ProductoVenta = new ProductoVenta(
        producto.codigo_barras,
        producto.nombre,
        1,
        producto.precio_unitario_venta,
        producto.descuento
      );
      if (agregado) {
        this.filas = AGREGAR_PRODUCTO(this.filas, producto);
      } else {
        this.filas.push(pv);
      }
    },
    calcularValores() {
      this.subtotal = 0;
      this.descuento = 0;
      this.total = 0;
      this.calculadora = this.calculadora * 1;
      this.filas.forEach((item: any) => {
        this.subtotal += item.subtotal;
        this.descuento += item.descuento * item.cantidad;
        this.total = this.subtotal - this.descuento;
      });
    },
    cambiarCantidadProducto() {
      for (const fila of this.filas) {
        const producto: any = fila;
        producto.subtotal = producto.cantidad * producto.precio_unitario_venta;
      }
      this.calcularValores();
    },
    darItemsFactura() {
      const datos_factura = {
        productos: this.filas,
        subtotal: this.subtotal,
        descuento: this.descuento,
        total: this.total,
      };
      return datos_factura;
    },
    evaluarValorDescuento() {
      if (this.descuento_adicional > 100) {
        this.descuento_adicional = 0;
        Swal.fire({
          title: "Valor errado",
          icon: "error",
          showConfirmButton: false,
          timer: 800,
        });
      }
    },
  },
  created() {
    this.filas = [];
  },
});
</script>

<style scoped></style>
