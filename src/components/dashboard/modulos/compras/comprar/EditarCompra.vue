<template>
  <v-dialog v-model="mostrar">
    <h1>Mostrar</h1>
  </v-dialog>
</template>

<script lang="ts">
export default {
  props: {
    mostrar: Boolean,
  },
  name: "EditarCompra",
  methods: {
    closeEdicion(): void {
      this.$emit("cerrar");
    },
  },
};
</script>
