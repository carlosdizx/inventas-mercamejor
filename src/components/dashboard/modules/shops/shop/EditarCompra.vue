<template>
  <v-dialog persistent v-model="mostrar">
    <v-card class="pt-3">
      <div class="text-center">
        <h1>Editar item de compra</h1>
        <v-form @submit.prevent="actualizarItem">
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
                  <h2>
                    {{ compra.cod_barras }}
                  </h2>
                </th>
                <th>
                  <h2>
                    {{ compra.descripcion }}
                  </h2>
                </th>
                <th>
                  <v-select
                    v-model="compra.bodega"
                    :items="bodegasDisponibles"
                    item-text="nombre"
                    item-value="nombre"
                    :rules="[v => !!v || 'La bodega es requerida']"
                  ></v-select>
                </th>
                <th>
                  <v-text-field
                    @input="calcularSubtotal()"
                    v-model.number="compra.cantidad"
                    :rules="[v => v > 0 || 'La cantidad debe ser mayor a 0']"
                  ></v-text-field>
                </th>
                <th>
                  <v-text-field
                    @input="calcularGananciaPrecioCompra()"
                    v-model.number="compra.prec_com"
                    :rules="[v => v > 0 || 'El precio de compra debe ser mayor a 0']"
                  ></v-text-field>
                </th>
                <th>
                  <v-text-field
                    @input="ingresarGanancia()"
                    v-model.number="porGanancia"
                    :rules="[v => v >= 0 || 'La ganancia no puede ser negativa']"
                  ></v-text-field>
                </th>
                <th>
                  <v-text-field
                    @input="ingresarVenta()"
                    v-model.number="compra.prec_ven"
                    :rules="[v => v >= compra.prec_com || 'El precio de venta debe ser mayor o igual al de compra']"
                  ></v-text-field>
                </th>
                <th>
                  <v-text-field
                    @input="calcularSubtotal()"
                    v-model.number="compra.impuesto"
                    :rules="[v => v >= 0 || 'El impuesto no puede ser negativo']"
                  ></v-text-field>
                </th>
                <th>
                  <v-text-field
                    @input="calcularSubtotal()"
                    v-model.number="compra.descuento"
                    :rules="[v => v >= 0 || 'El descuento no puede ser negativo']"
                  ></v-text-field>
                </th>
                <th>
                  <h2>
                    {{ compra.subtotal }}
                  </h2>
                </th>
              </tr>
            </tbody>
          </v-simple-table>
          <v-btn class="danger" @click="cancelar()">Cancelar</v-btn>
          <v-btn
            type="submit"
            class="success"
            :disabled="!validarDatos"
          >Actualizar</v-btn>
        </v-form>
      </div>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted, PropType } from 'vue';
import { Product } from "@/domain/model/product/Product";
import { ProductSale } from "@/domain/model/productsale/ProductSale";
import { REDONDEAR } from "@/generals/procesamientos";

export default defineComponent({
  name: "EditarCompra",
  props: {
    mostrar: {
      type: Boolean,
      required: true
    },
    indexElement: {
      type: Number,
      required: true
    },
    compraAnterior: {
      type: Object as PropType<ProductSale>,
      required: true
    },
    bodegasDisponibles: {
      type: Array,
      required: true
    }
  },
  emits: ['update', 'cancelar'],
  setup(props, { emit }) {
    const editedProduct = ref<ProductSale>({ ...props.compraAnterior });
    const percentGain = ref(0);

    const validarProd = computed(() => {
      if (
        editedProduct.value.quantity >= 1 &&
        editedProduct.value.price >= 1 &&
        editedProduct.value.subtotal >= 1
      ) {
        return false;
      }
      return true;
    });

    const calculateSubtotal = () => {
      if (editedProduct.value.quantity && editedProduct.value.price) {
        editedProduct.value.subtotal = editedProduct.value.quantity * editedProduct.value.price;
      }
    };

    const calculateUtilitiesByShop = () => {
      if (percentGain.value > 0 && editedProduct.value.price > 0) {
        let precio_venta: number = editedProduct.value.price * (1 + percentGain.value / 100);
        let precio = REDONDEAR(precio_venta, -2);
        editedProduct.value.price = precio;
      }
      calculateSubtotal();
    };

    const enterGains = () => {
      if (percentGain.value >= 0 && editedProduct.value.price > 0) {
        let precio_venta: number = editedProduct.value.price * (1 + percentGain.value / 100);
        let precio = REDONDEAR(precio_venta, -2);
        editedProduct.value.price = precio;
      }
    };

    const enterSale = () => {
      if (Number(editedProduct.value.price) >= Number(editedProduct.value.price)) {
        const porGanancia: number = ((Number(editedProduct.value.price) - Number(editedProduct.value.price)) / Number(editedProduct.value.price)) * 100;
        percentGain.value = Math.trunc(porGanancia);
      } else {
        percentGain.value = 0;
      }
    };

    const updateProduct = () => {
      emit('update', {
        compra: editedProduct.value,
        indice: props.indexElement
      });
    };

    const cancelar = () => {
      emit('cancelar');
    };

    onMounted(() => {
      calculateSubtotal();
    });

    return {
      editedProduct,
      percentGain,
      validarProd,
      calculateSubtotal,
      calculateUtilitiesByShop,
      enterGains,
      enterSale,
      updateProduct,
      cancelar
    };
  }
});
</script>
