<template>
  <div>
    <v-chip class="ma-2" color="red" v-if="errorCodigo">
      Este numero de codigo ya esta registrado.
    </v-chip>
    <v-row class="mr-5 ml-5">
      <v-col>
        <v-table>
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
                <v-btn
                  color="white"
                  @click="showBuscarProducto = true"
                  icon
                  class="info ml-1"
                >
                  <v-icon>mdi-magnify</v-icon>
                </v-btn>
                <BuscarElemento
                  @getItem="selectProduct"
                  icon="mdi-magnify"
                  :items="availableProducts"
                  :headers="columnas"
                  nombre="Productos"
                  :show="showBuscarProducto"
                  @close="showBuscarProducto = false"
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
        </v-table>
        <EditarCompra
          v-if="showEditPurchase"
          @actualizar="update"
          @cancelar="showEditPurchase = false"
          :compraAnterior="shopEdit"
          :mostrar="showEditPurchase"
          :indexElement="editPurchaseIndex"
          :bodegasDisponibles="wareHouse"
        />
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

export default defineComponent({
  name: "TablaCompras",
  components: {
    BuscarElemento,
    EditarCompra,
  },
  props: {
    compras: {
      type: Array as PropType<Array<ProductPurchase>>,
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
  emits: ['enviarProductos', 'eliminar', 'anular'],
  setup(props, { emit }) {
    const columnas = ref([
      { text: "Producto", value: "name" },
      { text: "Cantidad", value: "quantity" },
      { text: "Precio", value: "price" },
      { text: "Subtotal", value: "subtotal" },
      { text: "Acciones", value: "acciones" },
    ]);
    const products = ref<Array<ProductPurchase>>([]);
    const newProduct = ref<ProductPurchase>({
      id: '',
      bar_code: '',
      name: '',
      amount: 0,
      price_shop: 0,
      price_sale: 0,
      taxes: 0,
      discount: 0,
      subtotal: 0
    });
    const shopEdit = ref<IProductoCompra>({} as IProductoCompra);
    const wareHouse = ref<Array<Store>>([]);
    const availableProducts = ref<Array<Product>>([]);
    const showEditPurchase = ref(false);
    const editPurchaseIndex = ref(1);
    const percentGain = ref(0);
    const barCode = ref<string | null>(null);
    const errorCodigo = ref(false);
    const showBuscarProducto = ref(false);

    const validarProd = computed(() => {
      return !(
        newProduct.value.bar_code?.toString().length >= 9 &&
        newProduct.value.name !== "" &&
        newProduct.value.amount >= 1 &&
        newProduct.value.price_shop >= 1 &&
        newProduct.value.price_sale >= newProduct.value.price_shop &&
        percentGain.value >= 0 &&
        newProduct.value.subtotal >= 1 &&
        !errorCodigo.value
      );
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

    const findProduct = () => {
      if (barCode.value) {
        const product = availableProducts.value.find(p => p.bar_code === barCode.value);
        if (product) {
          selectProduct(product);
        }
      }
    };

    const addProduct = () => {
      if (newProduct.value.bar_code && newProduct.value.amount > 0) {
        const product: ProductPurchase = {
          id: newProduct.value.id,
          bar_code: newProduct.value.bar_code,
          name: newProduct.value.name,
          amount: newProduct.value.amount,
          price_shop: newProduct.value.price_shop,
          price_sale: newProduct.value.price_sale,
          taxes: newProduct.value.taxes,
          discount: newProduct.value.discount,
          subtotal: newProduct.value.subtotal
        };
        products.value.push(product);
        emit('enviarProductos', products.value);
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
          emit('enviarProductos', products.value);
        }
      });
    };

    const resetNewProduct = () => {
      newProduct.value = {
        id: '',
        bar_code: '',
        name: '',
        amount: 0,
        price_shop: 0,
        price_sale: 0,
        taxes: 0,
        discount: 0,
        subtotal: 0
      };
      barCode.value = null;
      percentGain.value = 0;
    };

    const calculateSubtotal = () => {
      if (newProduct.value.amount > 0 && newProduct.value.price_shop > 0) {
        newProduct.value.subtotal = newProduct.value.amount * newProduct.value.price_shop;
      }
    };

    const calculateUtilitiesByShop = () => {
      if (percentGain.value > 0 && newProduct.value.price_shop > 0) {
        let precio_venta: number = newProduct.value.price_shop * (1 + percentGain.value / 100);
        newProduct.value.price_sale = REDONDEAR(precio_venta, -2);
      }
      calculateSubtotal();
    };

    const enterGains = () => {
      if (percentGain.value >= 0 && newProduct.value.price_shop > 0) {
        let precio_venta: number = newProduct.value.price_shop * (1 + percentGain.value / 100);
        newProduct.value.price_sale = REDONDEAR(precio_venta, -2);
        calculateSubtotal();
      }
    };

    const enterSale = () => {
      if (newProduct.value.price_sale >= newProduct.value.price_shop) {
        const porGanancia: number = ((newProduct.value.price_sale - newProduct.value.price_shop) / newProduct.value.price_shop) * 100;
        percentGain.value = Math.trunc(porGanancia);
      } else {
        percentGain.value = 0;
      }
      calculateSubtotal();
    };

    const selectProduct = (product: Product) => {
      newProduct.value = {
        id: product.id,
        bar_code: product.bar_code,
        name: product.name,
        amount: 1,
        price_shop: product.price_shop || 0,
        price_sale: product.price_sale || 0,
        taxes: 0,
        discount: 0,
        subtotal: product.price_shop || 0
      };
      barCode.value = product.bar_code;
      calculateSubtotal();
    };

    const update = (data: { compra: IProductoCompra; indice: number }) => {
      products.value[data.indice] = data.compra as ProductPurchase;
      emit('anular', data.indice);
      emit('enviarProductos', products.value);
      showEditPurchase.value = false;
    };

    onMounted(async () => {
      await loadProducts();
      await loadWarehouses();
      resetNewProduct();
    });

    watch(() => props.compras, (newVal) => {
      products.value = [...newVal];
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
      showBuscarProducto,
      validarProd,
      findProduct,
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
