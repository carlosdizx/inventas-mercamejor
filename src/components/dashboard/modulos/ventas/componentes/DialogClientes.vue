<template>
  <v-dialog v-model="dialog_list" persistent max-width="600">
    <v-btn color="red darken-4" dark @click="dialog_list = !dialog_list">
      <v-icon>mdi-close</v-icon>
    </v-btn>
    <Tabla
      coleccion="clients"
      titulo="clientes"
      :columnas="columnas"
      :campos_form="campos_form"
      :validaciones="validaciones"
      no-editar
      no-crear
      v-on:enviarSeleccionado="cambiarCliente($event)"
    />
  </v-dialog>
</template>

<script lang="ts">
import Tabla from "@/components/crud/Tabla.vue";
import { CAMPOS, VALIDACIONES } from "@/models/Cliente";

import Vue from "vue";

export default Vue.extend({
  name: "DialogClientes",
  components: { Tabla },
  data: () => ({
    dialog_list: false,
    columnas: [
      { text: "Nombres", value: "nombres" },
      { text: "Apellidos", value: "apellidos" },
      { text: "Documento", value: "documento" },
      { text: "Selección", value: "seleccion" },
    ],
    campos_form: CAMPOS,
    validaciones: VALIDACIONES,
  }),
  methods: {
    cambiarEstado() {
      this.dialog_list = !this.dialog_list;
      this.$emit("dialog", this.dialog_list);
    },
    cambiarCliente(cliente: any) {
      this.cambiarEstado();
      this.$emit("cliente", cliente);
    },
  },
});
</script>
