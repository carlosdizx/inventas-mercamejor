<template>
  <v-dialog v-model="mostrar">
    <h1>Mostrsar</h1>
  </v-dialog>
</template>

<script lang="ts">
export default {
  props: {
    mostrar: Boolean,
  },
  name: "EditarCompra",
  methods: {},
};
</script>
