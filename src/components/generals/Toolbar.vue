<template>
  <v-app-bar app dark>
    <v-toolbar>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
      <v-toolbar-title>{{ titulo }}</v-toolbar-title>
      <v-spacer></v-spacer>
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
  </v-app-bar>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "Toolbar",
  props: {
    titulo: String,
    botones: Array,
  },
});
</script>

<style scoped></style>
