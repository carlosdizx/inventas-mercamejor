<template>
  <v-container>
    <Tabla
      class="my-2"
      coleccion="usuarios"
      titulo="usuarios"
      :columnas="columnas"
      llave="documento"
      :campos_detalle="campos_detalle"
      :campos_form="campos_form"
      elimacion
    />
  </v-container>
</template>

<script lang="ts">
import Tabla from "@/components/crud/Tabla.vue";
import { CAMPOS } from "@/models/Usuarios/FormUsuario";
import { COLUMNAS } from "@/models/Usuarios/ColumnasUsuario";
import { COLUMNAS_DETALLE } from "@/models/Usuarios/ColumnasDetalleUsuario";

import { TRAERDATOSUSUARIO } from "@/services/auth";

import Vue from "vue";

export default Vue.extend({
  name: "Usuarios",
  components: { Tabla },
  data: () => ({
    columnas: COLUMNAS,
    campos_detalle: COLUMNAS_DETALLE,
    campos_form: CAMPOS,
    datosUsuario: {},
    uid: null,
  }),
  methods: {
    async usuarioConectado() {
      this.datosUsuario = await TRAERDATOSUSUARIO(this.uid);
    },
  },
  created() {
    this.usuarioConectado();
  },
});
</script>

<style scoped></style>
