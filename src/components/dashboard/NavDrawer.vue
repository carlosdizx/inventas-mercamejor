<template>
  <v-navigation-drawer v-model="nav" relative app>
    <v-list shaped dense>
      <v-list-item-group>
        <ListadoFunciones v-on:item="cambiarItem($event)" />
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts">
import { mapState } from "vuex";
import Vue from "vue";
import ListadoFunciones from "@/components/dashboard/ListadoFunciones.vue";

export default Vue.extend({
  name: "NavDrawer",
  components: { ListadoFunciones },
  data: () => ({
    element: null,
    nav: true,
    item: 0,
  }),
  computed: {
    ...mapState(["color"]),
  },
  methods: {
    cambiarEstado() {
      this.nav = !this.nav;
    },
    cambiarItem(id: number) {
      this.item = id;
      this.$emit("item", this.item);
    },
  },
});
</script>

<style scoped></style>
