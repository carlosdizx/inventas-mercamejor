<template>
  <v-dialog v-model="dialog">
    <template v-slot:activator="{ on, attrs }">
      <v-btn icon color="white" v-bind="attrs" v-on="on" class="warning ml-1">
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
    </template>
    <v-card class="elevation-5">
      <v-card-title>Buscar datos de {{ nombre }}</v-card-title>
      <v-card-text>
        <v-data-table
          :headers="headers"
          :items="items"
          :custom-filter="filterOnlyCapsText"
          item-key="id"
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
import Vue from "vue";
export default Vue.extend({
  name: "BuscarElemento",
  props: ["nombre", "items", "headers"],
  data() {
    return {
      dialog: false,
      search: "",
    };
  },
  methods: {
    filterOnlyCapsText(value: any, search: string) {
      return (
        value != null &&
        search != null &&
        typeof value === "string" &&
        value.toString().toLocaleLowerCase().indexOf(search) !== -1
      );
    },
    devolverItem(item: any) {
      console.log(item);
      this.$emit("getItem", item);
    },
  },
});
</script>
