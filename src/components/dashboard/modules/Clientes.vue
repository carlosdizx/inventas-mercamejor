<template>
  <v-container>
    <Tabla
      coleccion="clients"
      titulo="clientes"
      :columnas="columnas"
      :campos_form="campos_form"
      :validaciones="validaciones"
    />
  </v-container>
</template>

<script lang="ts">
import Tabla from "@/components/crud/Tabla.vue";
import { COLUMNAS, CAMPOS, VALIDACIONES } from "@/models/Cliente";
import { defineComponent } from "vue";

export default defineComponent({
  name: "Clientes",
  components: { Tabla },
  data: () => ({
    columnas: COLUMNAS,
    campos_form: CAMPOS,
    validaciones: VALIDACIONES,
  }),
});
</script>
