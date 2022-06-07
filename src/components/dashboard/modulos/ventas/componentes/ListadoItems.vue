<template>
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
</template>

<script lang="ts">
import Vue from "vue";
import Swal from "sweetalert2";

export default Vue.extend({
  name: "ListadoItems",
  data: () => ({
    columnas: [
      { text: "Codigo", value: "codigo_barras" },
      { text: "Producto", value: "nombre" },
      { text: "Cantidad", value: "cantidad" },
      { text: "Precio", value: "precio_unitario_venta" },
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
        await Swal.fire({
          title: "Agregado con exito!",
          icon: "success",
          showConfirmButton: false,
          timer: 500,
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
