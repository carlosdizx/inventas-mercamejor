<template>
  <v-container>
    <v-card>
      <v-card-title>Cuentas por pagar</v-card-title>
      <v-card-text>
        <v-row>
          <v-container>
            <v-btn @click="mostrar = true" class="primary">Buscar compra</v-btn>
            <v-col cols="2">
              <v-text-field
                type="date"
                label="Ingrese fecha pago"
                v-model="fechaRegistro"
              ></v-text-field>
            </v-col>
            <v-dialog v-model="mostrar">
              <v-card>
                <Tabla
                  coleccion="compras"
                  titulo="Cuentas por pagar"
                  :columnas="columnas"
                  seleccion
                  NoEditar
                  noCrear
                  @getItem="seleccionarItem"
                  :consulta="[['estado', '==', 'Realizado']]"
                ></Tabla>
              </v-card>
              <div class="mt-6 mb-6 text-center">
                <v-btn @click="mostrar = false" class="primary">Cerrar</v-btn>
              </div>
            </v-dialog>
          </v-container>
        </v-row>
        <v-simple-table>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">Cédula</th>
                <th class="text-left">Nombre</th>
                <th class="text-left">Cruzar (factura)</th>
                <th class="text-left">Valor Abono</th>
                <th class="text-left">Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{{ compra.documento_proveedor }}</td>
                <td>{{ compra.nombre_proveedor }}</td>
                <td>{{ compra.cod_factura }}</td>
                <td><v-text-field v-model="valorAbono"></v-text-field></td>
                <td>
                  <v-btn class="success">Abonar</v-btn>
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-card-text>
      {{ cuentaPorPagar }}
    </v-card>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";

import { COLUMNAS, CAMPOS, CuentaPorPagar } from "@/models/CuentasPorPagar";

import Tabla from "@/components/crud/Tabla.vue";

export default Vue.extend({
  name: "CuentasPorPagar",
  data: () => ({
    mostrar: false,
    columnas: COLUMNAS,
    campos_form: CAMPOS,
    compra: {},
    fechaRegistro: "",
    cuentaPorPagar: {} as CuentaPorPagar,
    valorAbono: 0,
  }),
  components: {
    Tabla,
  },
  methods: {
    seleccionarItem(item: any) {
      console.log(item);
      this.mostrar = false;
      this.compra = item;
      this.cuentaPorPagar = item;
      this.valorAbono = item;
    },
  },
  created() {
    this.fechaRegistro = new Date().toISOString().slice(0, 10);
  },
});
</script>
