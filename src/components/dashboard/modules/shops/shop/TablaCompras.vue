<template>
  <div>
    <v-chip class="ma-2" color="red" v-if="errorCodigo">
      Este numero de codigo ya esta registrado.
    </v-chip>
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
                <th class="text-left">Ganancia</th>
                <th class="text-left">Precio Venta</th>
                <th class="text-left">Subototal</th>
                <th class="text-left">Actividad</th>
              </tr>
            </thead>
            <tbody class="dark" v-if="!anular">
              <tr @keyup.enter="validarProd ? null : addProduct()">
                <td>
                  <v-text-field
                    @input="findProduct()"
                    v-model="barCode"
                  ></v-text-field>
                </td>
                <td>
                  {{ newProduct.name }}
                </td>
                <td>
                  <v-text-field
                    @input="calculateSubtotal()"
                    v-model.number="newProduct.amount"
                    type="number"
                  ></v-text-field>
                </td>
                <td>
                  <v-text-field
                    @input="calculateUtilitiesByShop()"
                    type="number"
                    v-model.number="newProduct.price_shop"
                  ></v-text-field>
                </td>
                <td>
                  <v-text-field
                    @input="enterGains()"
                    type="number"
                    v-model.number="percentGain"
                  ></v-text-field>
                </td>
                <td>
                  <v-text-field
                    @input="enterSale()"
                    type="number"
                    v-model.number="newProduct.price_sale"
                  ></v-text-field>
                </td>
                <td>
                  {{ newProduct.subtotal }}
                </td>
                <td>
                  <v-btn
                    color="white"
                    @click="addProduct()"
                    :disabled="validarProd"
                    icon
                    class="warning ml-1"
                  >
                    <v-icon>mdi-plus</v-icon>
                  </v-btn>
                  <BuscarElemento
                    @getItem="selectProduct"
                    icon="mdi-magnify"
                    :items="availableProducts"
                    :headers="columnas"
                  />
                </td>
              </tr>
            </tbody>
            <tbody class="pt-3">
              <tr v-for="(item, index) in products" :key="index">
                <td>{{ item.bar_code }}</td>
                <td>{{ item.name }}</td>
                <td>{{ item.amount }}</td>
                <td>{{ item.price_shop }}</td>
                <td>
                  {{
                    Math.trunc(
                      ((item.price_sale - item.price_shop) / item.price_shop) *
                        100
                    )
                  }}
                </td>
                <td>{{ item.price_sale }}</td>
                <td>{{ item.subtotal }}</td>
                <td v-if="!anular">
                  <v-btn
                    color="white"
                    icon
                    class="error ml-1"
                    @click="deleteItem(index)"
                  >
                    <v-icon>mdi-trash-can-outline</v-icon>
                  </v-btn>
                </td>
              </tr>
            </tbody>
            <EditarCompra
              v-if="showEditPurchase"
              @actualizar="update"
              @cancelar="showEditPurchase = false"
              :compraAnterior="shopEdit"
              :mostrar="showEditPurchase"
              :indexElement="editPurchaseIndex"
              :bodegasDisponibles="wareHouse"
            />
          </template>
        </v-simple-table>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch, onMounted, PropType } from 'vue';
import { COLUMNAS } from "@/models/Producto";
import { LISTAR_BODEGAS } from "@/generals/Funciones";
import { REDONDEAR } from "@/generals/procesamientos";
import { CARGAR_INFORMACION, LISTAR } from "@/services/crud";
import BuscarElemento from "@/components/crud/BuscarElemento.vue";
import EditarCompra from "./EditarCompra.vue";
import { IProductoCompra } from "@/models/ProductoCompra";
import Swal from "sweetalert2";
import { Product } from "@/domain/model/product/Product";
import { ProductPurchase } from "@/domain/model/productpurchase/ProductPurchase";
import { Store } from "@/domain/model/store/Store";
import { ProductSale } from "@/domain/model/productsale/ProductSale";

export default defineComponent({
  name: "TablaCompras",
  components: {
    BuscarElemento,
    EditarCompra,
  },
  props: {
    compras: {
      type: Array as PropType<Array<ProductSale>>,
      required: true
    },
    eliminarDatos: {
      type: Boolean,
      default: false
    },
    anular: {
      type: Boolean,
      default: false
    }
  },
  emits: ['eliminar', 'anular'],
  setup(props, { emit }) {
    const columnas = ref([
      { text: "Producto", value: "name" },
      { text: "Cantidad", value: "quantity" },
      { text: "Precio", value: "price" },
      { text: "Subtotal", value: "subtotal" },
      { text: "Acciones", value: "acciones" },
    ]);
    const products = ref<Array<Product>>([]);
    const newProduct = ref({
      product: null as Product | null,
      quantity: 1,
      price: 0,
      subtotal: 0,
    });
    const shopEdit = ref<IProductoCompra>({} as IProductoCompra);
    const wareHouse = ref<Array<Store>>([]);
    const availableProducts = ref<Array<Product>>([]);
    const showEditPurchase = ref(false);
    const editPurchaseIndex = ref(1);
    const percentGain = ref(0);
    const barCode = ref<string | null>(null);
    const errorCodigo = ref(false);

    const validarProd = computed(() => {
      if (
        newProduct.value.product?.bar_code?.toString().length >= 9 &&
        newProduct.value.product?.name !== "" &&
        newProduct.value.quantity >= 1 &&
        newProduct.value.price >= 1 &&
        newProduct.value.price >= newProduct.value.price &&
        percentGain.value >= 0 &&
        newProduct.value.subtotal >= 1 &&
        newProduct.value.price > newProduct.value.price &&
        !errorCodigo.value
      ) {
        return false;
      }
      return true;
    });

    const loadProducts = async () => {
      try {
        const productsSnapshot = await LISTAR("products");
        availableProducts.value = productsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Product[];
      } catch (error) {
        console.error('Error loading products:', error);
        Swal.fire({
          title: "Error",
          text: "Error al cargar los productos",
          icon: "error"
        });
      }
    };

    const loadWarehouses = async () => {
      try {
        const warehousesSnapshot = await LISTAR("stores");
        wareHouse.value = warehousesSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Store[];
      } catch (error) {
        console.error('Error loading warehouses:', error);
        Swal.fire({
          title: "Error",
          text: "Error al cargar las bodegas",
          icon: "error"
        });
      }
    };

    const addProduct = () => {
      if (newProduct.value.product && newProduct.value.quantity > 0) {
        const product = {
          id: newProduct.value.product.id,
          name: newProduct.value.product.name,
          quantity: newProduct.value.quantity,
          price: newProduct.value.price,
          subtotal: newProduct.value.quantity * newProduct.value.price,
        };
        emit('add', product);
        resetNewProduct();
      }
    };

    const deleteItem = (index: number) => {
      Swal.fire({
        title: "¿Esta seguro de Eliminar este item?",
        showDenyButton: true,
        confirmButtonColor: "red",
        confirmButtonText: "Eliminar",
        denyButtonColor: "green",
        denyButtonText: `Cancelar`,
      }).then(async (result) => {
        if (result.isConfirmed) {
          products.value.splice(index, 1);
          emit('eliminar', index);
        }
      });
    };

    const resetNewProduct = () => {
      newProduct.value = {
        product: null,
        quantity: 1,
        price: 0,
        subtotal: 0,
      };
      barCode.value = null;
    };

    const calculateSubtotal = computed(() => {
      if (newProduct.value.product && newProduct.value.quantity > 0) {
        return newProduct.value.quantity * newProduct.value.price;
      }
      return 0;
    });

    const calculateUtilitiesByShop = () => {
      if (percentGain.value > 0 && newProduct.value.price > 0) {
        let precio_venta: number = newProduct.value.price * (1 + percentGain.value / 100);
        let precio = REDONDEAR(precio_venta, -2);
        newProduct.value.price = precio;
      }
      newProduct.value.subtotal = calculateSubtotal.value;
    };

    const enterGains = () => {
      if (percentGain.value >= 0 && newProduct.value.price > 0) {
        let precio_venta: number = newProduct.value.price * (1 + percentGain.value / 100);
        let precio = REDONDEAR(precio_venta, -2);
        newProduct.value.price = precio;
      }
    };

    const enterSale = () => {
      if (Number(newProduct.value.price) >= Number(newProduct.value.price)) {
        const porGanancia: number = ((Number(newProduct.value.price) - Number(newProduct.value.price)) / Number(newProduct.value.price)) * 100;
        percentGain.value = Math.trunc(porGanancia);
      } else {
        percentGain.value = 0;
      }
    };

    const selectProduct = (product: Product) => {
      newProduct.value.product = product;
      newProduct.value.price = product.price;
      newProduct.value.quantity = 1;
      newProduct.value.subtotal = calculateSubtotal.value;
    };

    const update = (data: { compra: IProductoCompra; indice: number }) => {
      products.value[data.indice] = data.compra;
      emit('anular', data.indice);
      showEditPurchase.value = false;
    };

    onMounted(async () => {
      await loadProducts();
      await loadWarehouses();
      resetNewProduct();
    });

    watch(() => props.compras, (newVal) => {
      products.value = newVal;
    });

    watch(() => props.eliminarDatos, () => {
      products.value = [];
      resetNewProduct();
    });

    return {
      columnas,
      products,
      newProduct,
      shopEdit,
      wareHouse,
      availableProducts,
      showEditPurchase,
      editPurchaseIndex,
      percentGain,
      barCode,
      errorCodigo,
      validarProd,
      addProduct,
      deleteItem,
      resetNewProduct,
      calculateSubtotal,
      calculateUtilitiesByShop,
      enterGains,
      enterSale,
      selectProduct,
      update
    };
  }
});
</script>
