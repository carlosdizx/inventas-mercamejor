<template>
  <v-container>
    <v-card>
      <v-card-title class="mr-5 ml-5">Consultar compras</v-card-title>
      <ValidationObserver ref="observer" v-slot="{ invalid }">
        <v-form>
          <v-card-text>
            <v-row class="ml-6 mr-6">
              <v-col>
                <v-text-field
                  label="Ingrese fecha inicial de compras"
                  v-model="rangoFechaInicial"
                  type="date"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              <v-col>
                <v-text-field
                  label="Ingrese fecha Final de compras"
                  v-model="rangoFechaFinal"
                  type="date"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
            </v-row>
            <!-- <v-row class="ml-6 mr-6">
              <v-col>
                <validation-provider type="date" name="Fecha de Compra">
                  <v-text-field
                    label="Documento Inicial de proveedores"
                    v-model="rangoProveedorInicial"
                    type="number"
                    outlined
                    dense
                  ></v-text-field>
                </validation-provider>
              </v-col>
              <v-col>
                <validation-provider type="date" name="Fecha de Compra">
                  <v-text-field
                    label="Documento Final de proveedores"
                    v-model="rangoProveedorFinal"
                    type="number"
                    outlined
                    dense
                  ></v-text-field>
                </validation-provider>
              </v-col>
            </v-row> -->
            <v-row class="mr-5 ml-5">
              <v-col>
                <v-btn
                  @click="buscarCompras()"
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
          <v-card-title>Resultado de busqueda Compras</v-card-title>
          <v-card-text>
            <v-data-table
              :headers="headers"
              :items="datos"
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
import { Purchase } from "@/domain/model/purchase/Purchase";
import { COMPRAS_CONSULTA } from "@/models/ElementoCompra";
import { CONSULTAR_COMPRAS } from "@/services/consultas";
import Vue from "vue";

export default Vue.extend({
  name: "ConsultarCompras",
  data: () => ({
    headers: COMPRAS_CONSULTA,
    dialog: false,
    rangoFechaInicial: "",
    rangoFechaFinal: "",
    rangoProveedorInicial: "",
    rangoProveedorFinal: "",
    search: "",
    datos: [] as Array<Purchase>,
  }),
  computed: {
    validarFormulario() {
      let valid = false;
      if (!this.rangoFechaInicial || !this.rangoFechaFinal) {
        valid = true;
      } else if (
        new Date(this.rangoFechaInicial) > new Date(this.rangoFechaFinal)
      ) {
        valid = true;
      }
      if (this.rangoFechaInicial !== "" && this.rangoFechaFinal !== "") {
        if (
          Number(this.rangoProveedorInicial) > Number(this.rangoProveedorFinal)
        ) {
          valid = true;
        }
      }
      return valid;
    },
  },
  methods: {
    async buscarCompras() {
      const res = await CONSULTAR_COMPRAS(
        this.rangoFechaInicial,
        this.rangoFechaFinal
      );
      this.dialog = true;
      this.datos = res;
    },
  },
  created() {
    const dateNow = new Date();
    const dateYesterday = new Date();
    dateNow.setHours(dateNow.getHours() - 5);
    dateYesterday.setHours(dateYesterday.getHours() - 5);

    dateNow.setDate(dateNow.getDate() - 1);

    this.rangoFechaInicial = dateNow.toISOString().slice(0, 10);
    this.rangoFechaFinal = dateYesterday.toISOString().slice(0, 10);
  },
});
</script>
