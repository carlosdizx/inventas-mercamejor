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
        <v-edit-dialog>
          {{ item.cantidad }}
          <template v-slot:input>
            <v-text-field
              @keydown.enter="
                cambiarCantidadProducto($event.target.value, item)
              "
              label="Editar"
              type="number"
              counter
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
import {
  AGREGAR_PRODUCTO,
  CAMBIAR_CANTIDAD,
  TOTALIZAR_VALORES,
  YA_LISTADO,
} from "@/UseCases/ProductosUseCases";
import { Product } from "@/domain/model/product/Product";
import { ProductPurchase } from "@/domain/model/productpurchase/ProductPurchase";

export default Vue.extend({
  name: "ItemsList",
  data: () => ({
    total: 0,
    subtotal: 0,
    descuento: 0,
    calculadora: 0,
    descuento_adicional: 0,
    columnas: [
      { text: "Codigo", value: "bar_code" },
      { text: "Producto", value: "name" },
      { text: "Cantidad", value: "cantidad" },
      { text: "Precio*uni", value: "sale_price" },
      { text: "Subtotal", value: "subtotal" },
    ],
    filas: [] as ProductPurchase[],
  }),
  methods: {
    async agregarProducto(newProduct: Product) {
      const agregado = YA_LISTADO(this.filas, newProduct);
      const producto: ProductPurchase = {
        id: newProduct.id,
        bar_code: newProduct.bar_code,
        name: newProduct.description,
        amount: 1,
        price_shop: newProduct.unit_price,
        price_purchase: newProduct.sale_price,
        taxes: 0,
        discount: 0,
        subtotal: newProduct.sale_price,
      };
      if (agregado) {
        this.filas = AGREGAR_PRODUCTO(this.filas, newProduct);
      } else {
        this.filas.push(producto);
      }
      await this.calcularValores();
    },
    async calcularValores() {
      const valores = TOTALIZAR_VALORES(this.filas);
      this.subtotal = valores.subtotal;
      this.descuento = valores.descuento;
      this.total = valores.total;
      this.calculadora = this.calculadora * 1;
    },
    async cambiarCantidadProducto(
      valor: number | string,
      item: ProductPurchase
    ) {
      if (valor == 0) {
        this.filas = this.filas.filter((producto) => producto !== item);
        return;
      }
      await CAMBIAR_CANTIDAD(valor, item);
      await this.calcularValores();
    },
    darItemsFactura() {
      return {
        productos: this.filas,
        subtotal: this.subtotal,
        descuento: this.descuento,
        total: this.total,
      };
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
    resetValues() {
      this.filas = [];
      this.total = 0;
      this.subtotal = 0;
      this.descuento = 0;
      this.calculadora = 0;
      this.descuento_adicional = 0;
    },
  },
  created() {
    this.filas = [];
  },
});
</script>

<style scoped></style>
