<template>
  <div>
    <div
      v-if="!mostrar && Object.keys(compra).length === 0"
      class="mt-6 mb-6 text-center"
    >
      <v-btn @click="mostrar = true" class="warning">Buscar compra</v-btn>
    </div>
    <v-dialog v-model="mostrar">
      <v-card>
        <Tabla
          coleccion="compras"
          titulo="Compras"
          :columnas="columnas"
          :campos_form="campos_form"
          :validaciones="validaciones"
          seleccion
          NoEditar
          @getItem="seleccionarItem"
        ></Tabla>
      </v-card>
      <div class="mt-6 mb-6 text-center">
        <v-btn @click="mostrar = false" class="primary">Cerrar</v-btn>
      </div>
    </v-dialog>
    <RegistroCompras
      :anular="true"
      :compraAnterior="compra"
      :idcompraanterior="idCompraAnterior"
      v-if="Object.keys(compra).length !== 0"
    ></RegistroCompras>
  </div>
</template>

<script lang="ts">
import Tabla from "@/components/crud/Tabla.vue";
import RegistroCompras from "@/components/dashboard/modules/shops/shop/RegistroCompras.vue";

import { CAMPOS, VALIDACIONES } from "@/models/Producto";
import { COLUMNAS } from "@/models/Compra";

import Vue from "vue";
import { ICompra } from "@/models/Compra";

export default Vue.extend({
  name: "Productos",
  components: { Tabla, RegistroCompras },
  data: () => ({
    columnas: COLUMNAS,
    campos_form: CAMPOS,
    validaciones: VALIDACIONES,
    datosUsuario: {},
    mostrar: true,
    compra: {} as ICompra,
    idCompraAnterior: "",
  }),
  methods: {
    seleccionarItem(producto: any) {
      this.mostrar = !this.mostrar;
      this.compra = producto;
      this.idCompraAnterior = producto.id;
    },
  },
});
</script>
