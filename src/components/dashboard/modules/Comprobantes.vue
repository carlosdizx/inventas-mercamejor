<template>
  <v-container>
    <Tabla
      class="my-2"
      coleccion="comprobantes"
      titulo="comprobantes"
      :columnas="columnas"
      :campos_form="campos_form"
      no-editar
    />
  </v-container>
</template>

<script lang="ts">
import Tabla from "@/components/crud/Tabla.vue";
import { CAMPOS, COLUMNAS } from "@/models/Comprobante";

import Vue from "vue";

export default Vue.extend({
  name: "Comprobantes",
  components: { Tabla },
  data: () => ({
    columnas: COLUMNAS,
    campos_form: CAMPOS,
    datosUsuario: {},
  }),
});
</script>
