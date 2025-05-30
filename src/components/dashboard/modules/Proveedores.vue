<template>
  <v-container>
    <Tabla
      coleccion="suppliers"
      titulo="proveedores"
      :columnas="columnas"
      :campos_form="campos_form"
      :validaciones="validaciones"
      elimacion
    />
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Tabla from "@/components/crud/Tabla.vue";
import { COLUMNAS, CAMPOS, VALIDACIONES } from "@/models/Proveedor";

export default defineComponent({
  name: "Proveedores",
  components: { Tabla },
  data: () => ({
    columnas: COLUMNAS,
    campos_form: CAMPOS,
    validaciones: VALIDACIONES,
    datosUsuario: {},
  }),
});
</script>
