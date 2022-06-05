<template>
  <v-dialog v-model="dialog_list" persistent max-width="600">
    <v-btn color="red darken-4" dark @click="dialog_list = !dialog_list">
      <v-icon>mdi-close</v-icon>
    </v-btn>
    <Tabla
      coleccion="clientes"
      titulo="clientes"
      :columnas="columnas"
      :campos_form="campos_form"
      :validaciones="validaciones"
      no-editar
      no-crear
    />
  </v-dialog>
</template>

<script lang="ts">
import Tabla from "@/components/crud/Tabla.vue";
import { COLUMNAS, CAMPOS, VALIDACIONES } from "@/models/Cliente";

import Vue from "vue";

export default Vue.extend({
  name: "DialogClientes",
  components: { Tabla },
  data: () => ({
    dialog_list: true,
    columnas: COLUMNAS,
    campos_form: CAMPOS,
    validaciones: VALIDACIONES,
  }),
});
</script>
