<template>
  <v-toolbar dark :color="color">
    <v-app-bar-nav-icon
      v-if="permitirNavdrawer"
      @click="cambiarEstadoNavbar"
    ></v-app-bar-nav-icon>
    <v-toolbar-title>{{ titulo }}</v-toolbar-title>
    <v-spacer></v-spacer>
    <SelectorColor v-if="permitirColor" />
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
    permitirNavdrawer: Boolean,
    permitirColor: Boolean,
    titulo: String,
    botones: Array,
  },
  computed: {
    ...mapState(["color"]),
  },
  methods: {
    cambiarEstadoNavbar() {
      this.$emit("cambiarEstadoNavDrawer");
    },
  },
});
</script>

<style scoped></style>
