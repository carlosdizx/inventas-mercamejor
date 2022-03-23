<template>
  <v-navigation-drawer v-model="nav" relative app>
    <v-list shaped dense>
      <v-list-item-group>
        <ListadoFunciones v-on:item="item = $event" />
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts">
import {mapState} from "vuex";
import Vue from "vue";
import ListadoFunciones from "@/components/Dashboard/ListadoFunciones.vue";

export default Vue.extend({
  name: "NavDrawer",
  components: { ListadoFunciones },
  data: () => ({
    element: null,
    nav: false,
    item: 0,
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
    cambiarItem(id: number) {
      console.log(id);
    },
  },
});
</script>

<style scoped></style>
