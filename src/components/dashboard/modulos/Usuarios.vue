<template>
  <v-container>
    <Tabla
      class="my-2"
      coleccion="usuarios"
      titulo="usuarios"
      :columnas="columnas"
      llave="email"
      :campos_form="campos_form"
      noCrear
    />
  </v-container>
</template>

<script lang="ts">
import Tabla from "@/components/crud/Tabla.vue";
import { COLUMNAS } from "@/models/Usuarios/ColumnasUsuario";
import { CAMPOS } from "@/models/Usuarios/FormUsuarioEmpresa";

import Vue from "vue";

export default Vue.extend({
  name: "Usuarios",
  components: { Tabla },
  data: () => ({
    columnas: COLUMNAS,
    campos_form: CAMPOS,
    datosUsuario: {},
  }),
});
</script>
