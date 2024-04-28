<template>
  <v-container>
    <v-card>
      <v-card-title class="mr-5 ml-5">Consultar Ventas</v-card-title>
      <ValidationObserver ref="observer" v-slot="{ invalid }">
        <v-form>
          <v-card-text>
            <v-row class="ml-6 mr-6">
              <v-col>
                <v-text-field
                  label="Ingrese fecha inicial de ventas"
                  v-model="initialDate"
                  type="date"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              <v-col>
                <v-text-field
                  label="Ingrese fecha Final de ventas"
                  v-model="finalDate"
                  type="date"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row class="mr-5 ml-5">
              <v-col>
                <v-btn
                  @click="findSales()"
                  x-large
                  dark
                  class="color_a mb-3"
                  block
                  outlined
                  dense
                  :disabled="validarFormulario"
                  >Buscar Compras</v-btn
                >
              </v-col>
            </v-row>
          </v-card-text>
        </v-form>
        <v-col v-if="!invalid">.</v-col>
      </ValidationObserver>
      <v-dialog v-model="dialog" persistent>
        <v-card class="elevation-5">
          <v-card-title>Saldo Total ventas: {{ getTotalSales }}</v-card-title>
          <v-card-text>
            <v-data-table
              :headers="headers"
              :items="sales"
              item-key="id"
              class="elevation-1"
              sort-by="created_at"
              sort-asc="created_at"
            >
              <template v-slot:top>
                <v-text-field
                  v-model="search"
                  label="Buscar ventas"
                  class="mx-4"
                ></v-text-field>
              </template>
            </v-data-table>
          </v-card-text>
          <v-card-text>
            <v-row>
              <v-col cols="10"></v-col>
              <v-col cols="2">
                <v-btn @click="dialog = false">Cerrar</v-btn>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { Sale } from "@/domain/model/sale/Sale";
import { CONSULT_SALES } from "@/domain/useCase/sale/saleSaveUseCase";
import { COLUMNAS_SALE } from "@/models/SaleModel";
import Vue from "vue";

export default Vue.extend({
  name: "ConsultSales",
  data: () => ({
    headers: COLUMNAS_SALE,
    dialog: false,
    initialDate: "",
    finalDate: "",
    search: "",
    sales: [] as Array<Sale>,
  }),
  computed: {
    getTotalSales() {
      return this.sales.reduce(
        (accumulator: number, currentValue: Sale) =>
          accumulator + currentValue.total,
        0
      );
    },
    validarFormulario() {
      let valid = false;
      if (!this.initialDate || !this.finalDate) {
        valid = true;
      } else if (new Date(this.initialDate) > new Date(this.finalDate)) {
        valid = true;
      }
      return valid;
    },
  },
  methods: {
    async findSales() {
      this.sales = await CONSULT_SALES(this.initialDate, this.finalDate);
      this.dialog = true;
    },
  },
  created() {
    const dateNow = new Date();
    const dateYesterday = new Date();
    dateNow.setHours(dateNow.getHours() - 5);
    dateYesterday.setHours(dateYesterday.getHours() - 5);

    dateNow.setDate(dateNow.getDate() - 1);

    this.initialDate = dateNow.toISOString().slice(0, 10);
    this.finalDate = dateYesterday.toISOString().slice(0, 10);
  },
});
</script>
