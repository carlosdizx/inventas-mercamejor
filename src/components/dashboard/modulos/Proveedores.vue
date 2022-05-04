<template>
  <v-container>
    <Tabla
      class="my-2"
      coleccion="proveedores"
      titulo="proveedores"
      :columnas="columnas"
      llave="nombre"
      :campos_form="campos_form"
    />
  </v-container>
</template>

<script lang="ts">
import Tabla from "@/components/crud/Tabla.vue";
import { CAMPOS, COLUMNAS } from "@/models/Proveedor";

import Vue from "vue";

export default Vue.extend({
  name: "Proveedores",
  components: { Tabla },
  data: () => ({
    columnas: COLUMNAS,
    campos_form: CAMPOS,
    datosUsuario: {},
  }),
});
</script>
