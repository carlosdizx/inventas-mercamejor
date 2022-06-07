<template>
  <div>
    <v-card-text>
      <v-form>
        <v-row>
          <v-col cols="2">
            <v-text-field
              dense
              prefix="$"
              label="Subtotal"
              v-model="subtotal"
              type="number"
              readonly
            />
          </v-col>
          <v-col cols="2">
            <v-text-field
              dense
              prefix="$"
              label="Descuento"
              v-model="descuento"
              type="number"
              readonly
            />
          </v-col>
          <v-col cols="2">
            <v-text-field
              dense
              prefix="$"
              label="Total"
              v-model="total"
              type="number"
              readonly
            />
          </v-col>
          <v-col cols="4">
            <v-text-field
              dense
              prefix="$"
              label="Calculadora rápida"
              v-model="total"
              type="number"
              readonly
            />
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>
    <v-data-table :headers="columnas" :items="filas">
      <template v-slot:item.cantidad="{ item }">
        <v-edit-dialog>
          {{ item.cantidad }}
          <template v-slot:input>
            <v-text-field label="Editar" counter />
          </template>
        </v-edit-dialog>
      </template>
    </v-data-table>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Swal from "sweetalert2";

export default Vue.extend({
  name: "ListadoItems",
  data: () => ({
    total: 0,
    subtotal: 0,
    descuento: 0,
    calculadora: 0,
    columnas: [
      { text: "Codigo", value: "codigo_barras" },
      { text: "Producto", value: "nombre" },
      { text: "Cantidad", value: "cantidad" },
      { text: "Precio", value: "precio_unitario_venta" },
      { text: "Descuento", value: "descuento" },
      { text: "Subtotal", value: "subtotal" },
    ],
    filas: [{}],
  }),
  methods: {
    async agregarProducto(producto: any) {
      let agregado = false;
      for (const fila of this.filas) {
        const temp: any = fila;
        if (temp.id === producto.id) {
          temp.cantidad = temp.cantidad + 1;
          temp.subtotal = temp.cantidad * producto.precio_unitario_venta;
          temp.descuento += temp.producto;
          agregado = true;
        }
      }
      if (!agregado) {
        producto.cantidad = 1;
        producto.subtotal = producto.precio_unitario_venta;
        this.filas.push(producto);
        agregado = true;
      }
      if (agregado) {
        this.calcularValores();
        await Swal.fire({
          title: "Agregado con exito!",
          icon: "success",
          showConfirmButton: false,
          timer: 500,
        });
      }
    },
    calcularValores() {
      this.subtotal = 0;
      this.filas.forEach((item: any) => {
        this.subtotal += item.subtotal;
      });
    },
  },
  created() {
    this.filas = [];
  },
});
</script>

<style scoped></style>
