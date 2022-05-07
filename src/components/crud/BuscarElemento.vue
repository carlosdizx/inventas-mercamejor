<template>
  <v-card class="elevation-5">
    <v-card-title>Buscar datos de {{ nombre }}</v-card-title>
    <v-card-text>
      <v-data-table
        :headers="headers"
        :items="items"
        :search="search"
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
        <template v-slot:body.append>
          <tr>
            <td></td>
            <td>
              <v-text-field
                v-model="calories"
                type="number"
                label="Less than"
              ></v-text-field>
            </td>
            <td colspan="4"></td>
          </tr>
        </template>
        <template v-slot:item.acciones="{ item }">
          <v-btn fab bottom small color="green" @click="devolverItem(item)">
            <v-icon color="white">mdi-send</v-icon>
          </v-btn>
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "BuscarElemento",
  props: ["nombre", "items", "headers"],
  data() {
    return {
      search: "",
      calories: "",
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
