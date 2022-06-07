<template>
  <v-data-table :headers="columnas" :items="filas">
    <!--
        <template v-slot:item.name="props">
      <v-edit-dialog
        :return-value.sync="props.item.name"
        @save="save"
        @cancel="cancel"
        @open="open"
        @close="close"
      >
        {{ props.item.name }}
        <template v-slot:input>
          <v-text-field
            v-model="props.item.name"
            :rules="[max25chars]"
            label="Edit"
            single-line
            counter
          ></v-text-field>
        </template>
      </v-edit-dialog>
    </template>
    -->
  </v-data-table>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "ListadoItems",
  data: () => ({
    columnas: [
      { text: "Codigo", value: "codigo_barras" },
      { text: "Producto", value: "nombre" },
      { text: "Cantidad", value: "cantidad" },
      { text: "Precio", value: "precio_unitario_venta" },
      { text: "Impuesto", value: "impuesto" },
      { text: "Subtotal", value: "subtotal" },
      { text: "Acciones", value: "acciones" },
    ],
    filas: [
      {
        codigo_barras: 1000,
        nombre: "verga",
        cantidad: 2,
        precio_unitario_venta: 5000,
        impuesto: 0,
        subtotal: 10000,
        acciones: "eliminar",
      },
    ],
  }),
});
</script>

<style scoped></style>
