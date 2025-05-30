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
import { defineComponent } from "vue";
import Tabla from "@/components/crud/Tabla.vue";
import { CAMPOS, COLUMNAS } from "@/models/Comprobante";

export default defineComponent({
  name: "Comprobantes",
  components: { Tabla },
  data: () => ({
    columnas: COLUMNAS,
    campos_form: CAMPOS,
    datosUsuario: {},
  }),
});
</script>
