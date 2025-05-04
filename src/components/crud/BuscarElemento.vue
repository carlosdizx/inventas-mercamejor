<template>
  <v-dialog v-model="show" persistent>
    <v-btn color="red darken-4" dark @click="closeElement">
      <v-icon>mdi-close</v-icon>
    </v-btn>
    <v-card class="elevation-5">
      <v-card-title>Buscar datos de {{ nombre }}</v-card-title>
      <v-card-text>
        <v-data-table
          :headers="headers"
          :items="items"
          :custom-filter="filterFind"
          item-key="id"
          :search="search"
          class="elevation-1"
        >
          <template v-slot:top>
            <v-text-field
              v-model="search"
              label="Buscar ventas"
              class="mx-4"
            ></v-text-field>
          </template>
          <template v-slot:item.acciones="{ item }">
            <v-btn fab bottom small color="green" @click="devolverItem(item)">
              <v-icon color="white">mdi-send</v-icon>
            </v-btn>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'BuscarElemento',
  props: {
    nombre: {
      type: String,
      required: true
    },
    items: {
      type: Array,
      required: true
    },
    headers: {
      type: Array,
      required: true
    },
    show: {
      type: Boolean,
      required: true
    }
  },
  emits: ['getItem', 'closeElement'],
  setup(props: any, { emit }: any) {
    const search = ref('');

    const filterFind = (value: any, search: string): boolean => {
      if (typeof value === 'string' && typeof search === 'string') {
        if (search.trim().length !== 0) {
          return value.toString().toLocaleUpperCase().indexOf(search.toUpperCase()) !== -1;
        }
      }
      return false;
    };

    const devolverItem = (item: any) => {
      emit('getItem', item);
    };

    const closeElement = () => {
      emit('closeElement');
    };

    return {
      search,
      filterFind,
      devolverItem,
      closeElement
    };
  }
});
</script>
