<template>
  <v-toolbar dark :color="color">
    <v-app-bar-nav-icon></v-app-bar-nav-icon>
    <v-toolbar-title>{{ titulo }}</v-toolbar-title>
    <v-spacer></v-spacer>
    <SelectorColor />
    <router-link
      v-for="(btn, index) of botones"
      :key="index"
      :to="btn.link"
      v-slot="{ navigate }"
      custom
    >
      <v-btn @click="navigate" icon>
        <v-icon>{{ btn.icon }}</v-icon>
      </v-btn>
    </router-link>
  </v-toolbar>
</template>

<script lang="ts">
import Vue from "vue";
import SelectorColor from "@/components/generals/SelectorColor.vue";
import { mapState } from "vuex";

export default Vue.extend({
  name: "Toolbar",
  components: { SelectorColor },
  props: {
    titulo: String,
    botones: Array,
  },
  computed: {
    ...mapState(["color"]),
  },
});
</script>

<style scoped></style>
