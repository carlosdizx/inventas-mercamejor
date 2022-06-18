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
                    v-model="compra.codigo_barras"
                  ></v-text-field>
                </th>
                <th>
                  <v-text-field
                    placeholder="Ingrese Descripcíon"
                    v-model="compra.descripcion_producto"
                  ></v-text-field>
                </th>
                <th>
                  <v-text-field v-model="compra.bodega"></v-text-field>
                </th>
                <th>
                  <v-text-field v-model="compra.cantidad"></v-text-field>
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
import Vue, { PropType } from "vue";

import { ProductoCompra } from "@/interfaces/ProductoCompra";

export default Vue.extend({
  name: "EditarCompra",
  props: {
    mostrar: Boolean,
    indexElement: Number,
    compraAnterior: {
      type: Object as PropType<ProductoCompra>,
    },
  },
  data: () => ({
    compra: {} as ProductoCompra,
  }),
  methods: {
    closeEdicion() {
      this.$emit("actualizar", {
        compra: this.compra,
        indice: this.indexElement,
      });
    },
  },
  created() {
    console.log(this.compraAnterior);
    this.compra = this.compraAnterior;
  },
});
</script>
