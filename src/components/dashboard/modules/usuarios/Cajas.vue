<template>
  <v-container>
    <v-btn
      @click="
        registro = true;
        actualizar = false;
      "
      :class="registro ? 'success' : ''"
      >Registro</v-btn
    >
    <v-btn
      @click="
        registro = false;
        actualizar = true;
      "
      :class="actualizar ? 'success' : ''"
      >Actualizar</v-btn
    >
    <RegistroCajas v-if="registro" />
    <ActualizarCajas v-if="actualizar" />
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ActualizarCajas from "./cajas/ActualizarCajas.vue";
import RegistroCajas from "./cajas/RegistroCajas.vue";

export default defineComponent({
  name: "Cajas",
  components: {
    RegistroCajas,
    ActualizarCajas,
  },
  data: () => ({
    algo: "hola",
    registro: true,
    actualizar: false,
  }),
});
</script>
