<template>
  <v-dialog v-model="mostrar">
    <h1>Mostrsar</h1>
  </v-dialog>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: {
    mostrar: Boolean,
  },
  name: "EditarCompra",
  methods: {
    closeEdicion() {
      this.$emit("cerrar");
    },
  },
});
</script>
