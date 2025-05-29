<template>
  <v-container>
    <Tabla
      coleccion="bodegas"
      titulo="bodegas"
      :columnas="columnas"
      :campos_form="campos_form"
      :validaciones="validaciones"
    />
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Tabla from "@/components/crud/Tabla.vue";
import { COLUMNAS, CAMPOS, VALIDACIONES } from "@/models/Bodega";

export default defineComponent({
  name: "Bodegas",
  components: { Tabla },
  data: () => ({
    columnas: COLUMNAS,
    campos_form: CAMPOS,
    validaciones: VALIDACIONES,
  }),
});
</script>
