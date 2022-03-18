<template>
  <v-navigation-drawer v-model="nav" relative app>
    <v-list nav dense>
      <h1>Item 1</h1>
      <h1>Item 2</h1>
      <h1>Item 3</h1>
      <h1>Item 4</h1>
      <h1>Item 5</h1>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts">
import { mapState } from "vuex";
import Vue from "vue";

export default Vue.extend({
  name: "NavDrawer",
  data: () => ({
    element: null,
    nav: false,
  }),
  computed: {
    ...mapState(["color"]),
  },
  methods: {
    changeElement(idItem: any) {
      this.$emit("changeDrawer", idItem);
    },
    change() {
      this.nav = !this.nav;
    },
  },
});
</script>

<style scoped></style>
