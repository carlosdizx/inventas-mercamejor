<template>
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
              <th class="text-left">% Ganancia</th>
              <th class="text-left">Precio Venta</th>
              <th class="text-left">Impuesto</th>
              <th class="text-left">Descuento</th>
              <th class="text-left">Subototal</th>
              <th class="text-left">Actividad</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in desserts" :key="item.name">
              <td>{{ item.codigo }}</td>
              <td>{{ item.descripcion }}</td>
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
export default Vue.extend({
  name: "TablaCompras",
  data: () => ({
    desserts: [
      {
        codigo: "9452342312",
        descripcion: "yogurt griego",
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
        cantidad: 10,
        precioCompra: 8000,
        precioVenta: 92000,
        porGanancia: 12,
        impuesto: 0,
        descuento: 0,
        subTotal: 80000,
      },
    ],
  }),
});
</script>
