<template>
  <div>
    <v-card-text>
      <v-form>
        <v-row>
          <!-- <v-col cols="12" sm="6">
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
            <v-col cols="12" sm="6">
              <vuetify-money
                label="Calculadora rápida"
                prepend-icon=""
                prefix="$"
                dense
                counter
                v-model="calculadora"
              />
            </v-col>
          </v-col>  -->
          <v-col>
            <!-- <v-chip color="xamber" class="ma-2">
              Subtotal: {{ subtotal }}
            </v-chip>
            <v-chip color="info" class="ma-2">
              Descuento: {{ descuento }}
            </v-chip>
            <v-chip color="success" class="ma-2">Total: {{ total }}</v-chip>
            <v-chip color="success" class="ma-2">
              Descuento adicional: {{ (total * descuento_adicional) / 100 }}
            </v-chip> -->
            <v-alert
              outlined
              dark
              color="success darken-2"
              class="mx-auto text-h3 text-center"
            >
              Precio final: $
              {{
                (total - (total * descuento_adicional) / 100)
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ".")
              }}
            </v-alert>
            <v-btn v-if="total > 0" color="red" @click="resetValues">
              Reiniciar Venta
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>
    <v-container class="d-flex justify-center align-center">
      <v-data-table :headers="headers" :items="items">
        <template v-slot:item.amount="{ item }">
          <v-text-field
            v-model="item.amount"
            type="number"
            density="compact"
            variant="outlined"
            hide-details
            @update:model-value="updateQuantity(item)"
          />
        </template>
        <template v-slot:item.actions="{ item }">
          <v-btn
            icon="mdi-delete"
            color="error"
            variant="text"
            @click="deleteItem(item)"
          />
        </template>
      </v-data-table>
    </v-container>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, PropType } from 'vue';
import Swal from "sweetalert2";
import {
  AGREGAR_PRODUCTO,
  CAMBIAR_CANTIDAD,
  TOTALIZAR_VALORES,
  YA_LISTADO,
} from "@/UseCases/ProductosUseCases";
import { ProductToList } from "@/domain/model/product/Product";
import { ProductSale } from "@/domain/model/productsale/ProductSale";

export default defineComponent({
  name: "ItemsList",
  props: {
    items: {
      type: Array as PropType<Array<ProductSale>>,
      required: true
    }
  },
  emits: ['update', 'delete', 'reset'],
  setup(props, { emit }) {
    const headers = ref([
      { title: "Producto", key: "name" },
      { title: "Cantidad", key: "amount" },
      { title: "Precio", key: "sale_price" },
      { title: "Subtotal", key: "subtotal" },
      { title: "Acciones", key: "actions", sortable: false }
    ]);

    const descuento_adicional = ref(0);

    const total = computed(() => {
      return props.items.reduce((sum, item) => sum + item.subtotal, 0);
    });

    const updateQuantity = (item: ProductSale) => {
      if (item.amount <= 0) {
        deleteItem(item);
        return;
      }
      item.subtotal = item.amount * item.sale_price;
      emit('update', item);
    };

    const deleteItem = (item: ProductSale) => {
      emit('delete', item);
    };

    const resetValues = () => {
      descuento_adicional.value = 0;
      emit('reset');
    };

    return {
      headers,
      total,
      descuento_adicional,
      updateQuantity,
      deleteItem,
      resetValues
    };
  },
  data: () => ({
    total: 0,
    subtotal: 0,
    descuento: 0,
    calculadora: 0,
    columnas: [
      { text: "Producto", value: "name" },
      { text: "Cantidad", value: "amount" },
      { text: "Precio*uni", value: "sale_price" },
      { text: "Subtotal", value: "subtotal" },
    ],
    sales: [] as ProductSale[],
  }),
  methods: {
    async agregarProducto(product: ProductToList) {
      const agregado = YA_LISTADO(this.sales, product);
      const producto: ProductSale = {
        bar_code: product.bar_code,
        name: product.name,
        amount: 1,
        shop_price: product.unit_price,
        sale_price: product.sale_price,
        taxes: 0,
        discount: 0,
        subtotal: product.sale_price,
      };
      if (agregado) {
        this.sales = AGREGAR_PRODUCTO(this.sales, product);
      } else {
        this.sales.push(producto);
      }
      await this.calcularValores();
    },
    addProductNotRegister(productNotRegister: any) {
      const producto: ProductSale = {
        bar_code: "",
        name: productNotRegister.description,
        amount: 0,
        shop_price: 0,
        sale_price: Number(productNotRegister.price),
        taxes: 0,
        discount: 0,
        subtotal: Number(productNotRegister.price),
      };
      this.sales.push(producto);
      this.calcularValores();
    },
    async calcularValores() {
      const valores = TOTALIZAR_VALORES(this.sales);
      this.subtotal = valores.subtotal;
      this.descuento = valores.descuento;
      this.total = valores.total;
      this.calculadora = this.calculadora * 1;
    },
    async cambiarCantidadProducto(valor: number | string, item: ProductSale) {
      if (valor == 0) {
        this.sales = this.sales.filter(
          (producto) => producto.bar_code !== item.bar_code
        );
        return;
      }
      await CAMBIAR_CANTIDAD(valor, item);
      await this.calcularValores();
    },
    darItemsFactura() {
      return {
        productos: this.sales,
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
  },
  created() {
    this.sales = [];
  },
});
</script>
