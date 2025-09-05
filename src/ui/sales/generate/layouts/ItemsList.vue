<template>
  <div>
    <v-card-text>
      <v-form>
        <v-row>
          <v-col>
            <v-alert
              outlined
              dark
              color="success darken-2"
              class="mx-auto text-h3 text-center"
            >
              Precio final: $
              {{ salesStore.totalPrice }}
            </v-alert>
            <v-btn v-if="total > 0" color="red" @click="resetValues">
              Reiniciar Venta
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>
    <v-container class="d-flex justify-center align-center">
      <v-data-table :headers="headers" :items="salesStore.salesProducts">
        <template v-slot:item.name="{ item }">
          <span 
            @click="increaseQuantity(item)"
            @contextmenu.prevent="decreaseQuantity(item)"
            class="product-name-clickable"
            :class="{
              'quantity-increased': visualEffects[getItemKey(item)] === 'increase',
              'quantity-decreased': visualEffects[getItemKey(item)] === 'decrease'
            }"
            :title="'Clic izquierdo: sumar | Clic derecho: restar (mín. 1)'"
          >
            {{ item.name }}
          </span>
        </template>
        <template v-slot:item.amount="{ item }">
          <span 
            :class="{
              'quantity-value': true,
              'quantity-increased': visualEffects[getItemKey(item)] === 'increase',
              'quantity-decreased': visualEffects[getItemKey(item)] === 'decrease'
            }"
          >
            {{ item.amount }}
          </span>
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
import { useSaleGenerateStore } from '@/ui/sales/generate/store/SalesGenerateViewStore'
import { defineComponent, ref, computed, reactive } from 'vue';
import { ProductSale } from "@/domain/model/sales/generate/model/product/ProductSale";

export default defineComponent({
  name: "ItemsList",
  setup() {
    const salesStore = useSaleGenerateStore()
    const salesProducts = salesStore.salesProducts;
    const visualEffects = reactive<Record<string, string | null>>({});
    const headers = ref([
      { text: "Producto", value: "name" },
      { text: "Cantidad", value: "amount" },
      { text: "Precio", value: "sale_price" },
      { text: "Subtotal", value: "subtotal" },
      { text: "Acciones", value: "actions", sortable: false }
    ]);

    const getItemKey = (item: ProductSale) => {
      return item.bar_code || item.name;
    };

    const updateQuantity = (item: ProductSale) => {
      const identifier = item.bar_code || item.name;
      salesStore.changeAmountProduct(identifier, item.amount);
    };

    const increaseQuantity = (item: ProductSale) => {
      const identifier = item.bar_code || item.name;
      const newAmount = item.amount + 1;
      const itemKey = getItemKey(item);
      
      // Marcar la acción y mostrar efecto visual
      visualEffects[itemKey] = 'increase';
      salesStore.changeAmountProduct(identifier, newAmount);
      
      // Limpiar el efecto después de 1 segundo
      setTimeout(() => {
        visualEffects[itemKey] = null;
      }, 1000);
    };

    const decreaseQuantity = (item: ProductSale) => {
      const identifier = item.bar_code || item.name;
      const newAmount = Math.max(1, item.amount - 1);
      const itemKey = getItemKey(item);
      
      // Solo mostrar efecto visual si realmente se puede disminuir
      if (item.amount > 1) {
        // Marcar la acción y mostrar efecto visual
        visualEffects[itemKey] = 'decrease';
        salesStore.changeAmountProduct(identifier, newAmount);
        
        // Limpiar el efecto después de 1 segundo
        setTimeout(() => {
          visualEffects[itemKey] = null;
        }, 1000);
      } else {
        // Si ya está en 1, solo actualizar sin efecto visual
        salesStore.changeAmountProduct(identifier, newAmount);
      }
    };

    const deleteItem = (item: ProductSale) => {
      const index = salesStore.currentSale.sales.findIndex(p => 
        (item.bar_code && p.bar_code === item.bar_code) || 
        (!item.bar_code && p.name === item.name)
      );
      if (index !== -1) {
        salesStore.removeProduct(index);
      }
    };

    const resetValues = () => {
      salesStore.clearSale();
    };

    const total = computed(() => salesStore.currentSale.sales.length);

    return {
      headers,
      salesProducts,
      salesStore,
      visualEffects,
      getItemKey,
      updateQuantity,
      increaseQuantity,
      decreaseQuantity,
      deleteItem,
      resetValues,
      total
    };
  },
});
</script>

<style scoped>
.product-name-clickable {
  cursor: pointer;
  user-select: none;
  padding: 4px 8px;
  border-radius: 4px;
  transition: all 0.3s ease;
  position: relative;
}

.product-name-clickable:hover {
  background-color: rgba(0, 0, 0, 0.04);
}

.product-name-clickable:active {
  background-color: rgba(0, 0, 0, 0.08);
}

.quantity-increased {
  background-color: rgba(76, 175, 80, 0.2) !important;
  color: #2e7d32;
  font-weight: 600;
  animation: pulseGreen 0.6s ease-in-out;
}

.quantity-decreased {
  background-color: rgba(244, 67, 54, 0.2) !important;
  color: #c62828;
  font-weight: 600;
  animation: pulseRed 0.6s ease-in-out;
}

/* Estilos para el valor de cantidad */
.quantity-value {
  display: inline-block;
  padding: 8px 12px;
  border-radius: 4px;
  font-weight: 500;
  font-size: 16px;
  min-width: 40px;
  text-align: center;
  transition: all 0.3s ease;
}

@keyframes pulseGreen {
  0% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(76, 175, 80, 0.4);
  }
  50% {
    transform: scale(1.05);
    box-shadow: 0 0 0 8px rgba(76, 175, 80, 0.1);
  }
  100% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(76, 175, 80, 0);
  }
}

@keyframes pulseRed {
  0% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(244, 67, 54, 0.4);
  }
  50% {
    transform: scale(1.05);
    box-shadow: 0 0 0 8px rgba(244, 67, 54, 0.1);
  }
  100% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(244, 67, 54, 0);
  }
}
</style>
