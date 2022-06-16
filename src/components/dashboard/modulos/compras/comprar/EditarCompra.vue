<template>
  <v-dialog persistent v-model="mostrar">
    <v-card class="pt-3">
      <div class="text-center">
        <h1>Editar Compra</h1>
        <ValidationObserver ref="observer" v-slot="{ invalid }">
          <v-simple-table class="ml-3 mt-3">
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
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>
                  <v-text-field
                    placeholder="Ingrese Código"
                    v-model="compra.codigo"
                  ></v-text-field>
                </th>
                <th>
                  <v-text-field
                    placeholder="Ingrese Descripcíon"
                    v-model="compra.descripcion"
                  ></v-text-field>
                </th>
                <th>
                  <v-text-field v-model="compra.bodega"></v-text-field>
                </th>
                <th>
                  <v-text-field v-model="compra.precio_compra"></v-text-field>
                </th>
                <th>
                  <v-text-field v-model="compra.por_ganancia"></v-text-field>
                </th>
                <th>
                  <v-text-field v-model="compra.precio_venta"></v-text-field>
                </th>
                <th>
                  <v-text-field v-model="compra.impuesto"></v-text-field>
                </th>
                <th>
                  <v-text-field v-model="compra.descuento"></v-text-field>
                </th>
                <th>
                  <v-text-field v-model="compra.subtotal"></v-text-field>
                </th>
                <th>
                  <v-text-field v-model="compra.total"></v-text-field>
                </th>
              </tr>
            </tbody>
          </v-simple-table>
          <v-btn class="danger" @click="closeEdicion()">Cancelar</v-btn>
          <v-btn class="success" @click="closeEdicion()">Actualizar</v-btn>
          <v-col v-if="!invalid">.</v-col>
        </ValidationObserver>
      </div>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "EditarCompra",
  props: {
    product: String,
    mostrar: Boolean,
    indexElement: Number,
  },
  data: () => ({
    compra: {
      product: "algo",
      codigo: "",
      descripcion: "",
      bodega: "",
      cantidad: "",
      precio_compra: "",
      por_ganancia: "",
      precio_venta: "",
      impuesto: "",
      descuento: "",
      subtotal: "",
      total: "",
    },
  }),
  methods: {
    closeEdicion() {
      this.$emit("actualizar", this.compra);
    },
  },
});
</script>
