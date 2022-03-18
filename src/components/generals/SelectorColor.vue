<template>
  <v-menu offset-y>
    <template v-slot:activator="{ on, attrs }">
      <v-btn icon v-bind="attrs" v-on="on">
        <v-icon>mdi-palette</v-icon>
      </v-btn>
    </template>
    <v-list>
      <v-list-item v-for="(color, index) of colores" :key="index">
        <v-btn
          :dark="color.dark"
          block
          :color="color.nombre"
          @click="cambarColor(color.nombre)"
        >
          <v-chip :color="color.nombre">{{ index + 1 }}</v-chip>
        </v-btn>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script lang="ts">
import { mapActions, mapState } from "vuex";
import Vue from "vue";

export default Vue.extend({
  name: "SelectorColor",
  data: () => ({
    colores: [
      { nombre: "orange", dark: false },
      { nombre: "red", dark: true },
      { nombre: "pink", dark: true },
      { nombre: "purple", dark: true },
      { nombre: "indigo", dark: true },
      { nombre: "blue", dark: true },
      { nombre: "cyan", dark: true },
      { nombre: "teal", dark: true },
      { nombre: "green", dark: true },
      { nombre: "grey darken-4", dark: true },
    ],
  }),
  computed: {
    ...mapState(["color"]),
  },
  methods: {
    ...mapActions(["cambarColor"]),
  },
});
</script>
