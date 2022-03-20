<template>
  <v-navigation-drawer v-model="nav" relative app>
    <v-list nav dense>
      <ListadoFunciones />
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts">
import { mapState } from "vuex";
import Vue from "vue";
import ListadoFunciones from "@/components/Dashboard/ListadoFunciones.vue";

export default Vue.extend({
  name: "NavDrawer",
  components: { ListadoFunciones },
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
