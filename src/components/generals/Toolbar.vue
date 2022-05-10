<template>
  <v-toolbar dark color="color_a">
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
    <v-btn v-if="permitirLogout" icon @click="logout()">
      <v-icon>mdi-logout</v-icon>
    </v-btn>
  </v-toolbar>
</template>

<script lang="ts">
import Vue from "vue";
import SelectorColor from "@/components/generals/SelectorColor.vue";
import { mapState } from "vuex";
import { LOGOUT } from "@/services/auth";
import Swal from "sweetalert2";

export default Vue.extend({
  name: "Toolbar",
  components: { SelectorColor },
  props: {
    permitirNavdrawer: Boolean,
    permitirLogout: Boolean,
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
    async logout() {
      await LOGOUT();
      await Swal.fire({
        title: "Sessión cerrada",
        timer: 1500,
        icon: "info",
      });
      this.$router.go(0);
    },
  },
});
</script>

<style scoped></style>
