<template>
  <div>
    <v-dialog v-model="dialog" width="1500">
      <template v-slot:activator="{ on, attrs }">
        <v-btn icon color="white" v-bind="attrs" v-on="on" class="warning ml-1">
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
      </template>

      <v-card>
        <v-card-title class="text-h5 grey lighten-2"> Buscar </v-card-title>
        <v-card>
          <v-card-text>
            <v-row>
              <v-col sm="6" md="2">
                <v-text-field label="Descripción" required></v-text-field>
              </v-col>
              <v-col sm="6" md="2">
                <v-text-field label="Código Barras"></v-text-field>
              </v-col>
              <v-col sm="6" md="2">
                <v-text-field label="Marca"></v-text-field>
              </v-col>
              <v-col sm="6" md="2">
                <v-text-field label="Precio unitario compra"></v-text-field>
              </v-col>
              <v-col sm="6" md="1">
                <v-text-field label="Precio unitario venta"></v-text-field>
              </v-col>
              <v-col sm="6" md="1">
                <v-text-field label="Categoria"></v-text-field>
              </v-col>
              <v-col sm="6" md="1">
                <v-text-field label="Subcategoria"></v-text-field>
              </v-col>
              <v-col sm="6" md="1">
                <v-text-field label="Acciones" disabled></v-text-field>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-text>
            <v-row v-for="(prov, index) in proveedores" :key="index">
              <v-col sm="6" md="2">
                <v-label>{{ prov.nombre }}</v-label>
              </v-col>
              <v-col sm="6" md="2">
                <v-label>{{ prov.codigo_barras }}</v-label>
              </v-col>
              <v-col sm="6" md="2">
                <v-label>{{ prov.marca.nombre }}</v-label>
              </v-col>
              <v-col sm="6" md="2">
                <v-label>{{ prov.precio_unitario_compra }}</v-label>
              </v-col>
              <v-col sm="6" md="1">
                <v-label>{{ prov.precio_unitario_venta }}</v-label>
              </v-col>
              <v-col sm="6" md="1">
                <v-label>{{ prov.category.name }}</v-label>
              </v-col>
              <v-col sm="6" md="1">
                <v-label>{{ prov.subcategory }}</v-label>
              </v-col>

              <v-col sm="6" md="1" class="text-center">
                <v-btn
                  @click="devolverUsuario(prov, index)"
                  class="success"
                  text
                  icon
                >
                  <v-icon>mdi-lead-pencil</v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn x-large @click="dialog = false" color="blue darken-1" text>
              Close
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted, PropType } from 'vue';
import { Product } from "@/domain/model/product/Product";
import { LISTAR } from "@/generals/Funciones";

export default defineComponent({
  name: "BuscarProductos",
  props: {
    show: {
      type: Boolean,
      required: true
    }
  },
  emits: ['close', 'select'],
  setup(props, { emit }) {
    const search = ref('');
    const products = ref<Array<Product>>([]);
    const loading = ref(false);

    const filteredProducts = computed(() => {
      if (!search.value) return products.value;
      const searchLower = search.value.toLowerCase();
      return products.value.filter(product => 
        product.name.toLowerCase().includes(searchLower) ||
        product.bar_code.toLowerCase().includes(searchLower)
      );
    });

    const loadProducts = async () => {
      loading.value = true;
      try {
        const productsList = await LISTAR("products");
        products.value = productsList.map(doc => {
          const data = doc.data() as Product;
          data.id = doc.id;
          return data;
        });
      } catch (error) {
        console.error('Error loading products:', error);
      } finally {
        loading.value = false;
      }
    };

    const selectProduct = (product: Product) => {
      emit('select', product);
      emit('close');
    };

    const closeDialog = () => {
      emit('close');
    };

    onMounted(() => {
      loadProducts();
    });

    return {
      search,
      products,
      loading,
      filteredProducts,
      selectProduct,
      closeDialog
    };
  }
});
</script>
