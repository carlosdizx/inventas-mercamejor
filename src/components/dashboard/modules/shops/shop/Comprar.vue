<template>
  <div>
    <div class="mt-1 mb-1">
      <v-btn
        @click="currentTab = 1"
        :class="currentTab === 1 ? `success ml-1` : 'ml-1'"
      >
        Compras
      </v-btn>
      <v-btn
        @click="currentTab = 2"
        :class="currentTab === 2 ? `success ml-1` : 'ml-1'"
      >
        Consultar Compras
      </v-btn>
      <v-btn
        @click="currentTab = 3"
        :color="currentTab === 3 ? 'error' : ''"
        class="ml-1"
      >
        Anular Compra
      </v-btn>
    </div>
    <RegistroCompras v-if="currentTab === 1" :idcompraanterior="''" />
    <ConsultarCompras v-if="currentTab === 2" />
    <AnularCompra v-if="currentTab === 3" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { GUARDAR } from "@/services/crud";
import { PROCESAR_FORMULARIO } from "@/generals/procesamientos";
import { CAMPOS, VALIDACIONES } from "@/models/Producto";
import { COLUMNAS } from "@/models/Compra";
import TablaCompras from "./TablaCompras.vue";
import BuscarElemento from "@/components/crud/BuscarElemento.vue";
import { ICompra } from "@/models/Compra";
import { Purchase } from "@/domain/model/purchase/Purchase";
import { ProductSale } from "@/domain/model/productsale/ProductSale";
import Swal from "sweetalert2";

import RegistroCompras from "@/components/dashboard/modules/shops/shop/RegistroCompras.vue";
import ConsultarCompras from "@/components/dashboard/modules/shops/shop/ConsultarCompras.vue";
import AnularCompra from "@/components/dashboard/modules/shops/shop/AnularCompra.vue";

export default defineComponent({
  name: "Comprar",
  components: {
    RegistroCompras,
    ConsultarCompras,
    AnularCompra,
    TablaCompras,
    BuscarElemento
  },
  setup() {
    const router = useRouter();
    const currentTab = ref(1);
    const products = ref<Array<ProductSale>>([]);
    const loading = ref(false);
    const showForm = ref(false);
    const purchase = ref<Purchase>({
      id: '',
      provider: '',
      products: [],
      subtotal: 0,
      taxes: 0,
      discount: 0,
      total: 0,
      state: 'Pendiente',
      created_at: new Date(),
      updated_at: new Date()
    });

    const total = computed(() => {
      return products.value.reduce((sum, item) => sum + (item.subtotal || 0), 0);
    });

    const addProduct = (product: ProductSale) => {
      products.value.push(product);
      updatePurchase();
    };

    const deleteProduct = (index: number) => {
      products.value.splice(index, 1);
      updatePurchase();
    };

    const updatePurchase = () => {
      purchase.value.products = products.value;
      purchase.value.subtotal = total.value;
      purchase.value.total = total.value;
    };

    const savePurchase = async () => {
      if (products.value.length === 0) {
        Swal.fire({
          title: "Error",
          text: "Debe agregar al menos un producto",
          icon: "error"
        });
        return;
      }

      loading.value = true;
      try {
        await GUARDAR("purchases", purchase.value);
        Swal.fire({
          title: "Éxito",
          text: "Compra registrada correctamente",
          icon: "success"
        });
        router.push("/compras");
      } catch (error) {
        console.error('Error saving purchase:', error);
        Swal.fire({
          title: "Error",
          text: "Error al registrar la compra",
          icon: "error"
        });
      } finally {
        loading.value = false;
      }
    };

    const resetForm = () => {
      products.value = [];
      purchase.value = {
        id: '',
        provider: '',
        products: [],
        subtotal: 0,
        taxes: 0,
        discount: 0,
        total: 0,
        state: 'Pendiente',
        created_at: new Date(),
        updated_at: new Date()
      };
    };

    return {
      currentTab,
      products,
      loading,
      showForm,
      purchase,
      total,
      addProduct,
      deleteProduct,
      savePurchase,
      resetForm
    };
  }
});
</script>
