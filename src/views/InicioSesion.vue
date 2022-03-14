<template>
  <Login />
</template>

<script lang="ts">
import Vue from "vue";
import Login from "@/components/autenticacion/Login.vue";

export default Vue.extend({
  name: "InicioSesion",
  components: { Login },
});
</script>

<style scoped></style>
