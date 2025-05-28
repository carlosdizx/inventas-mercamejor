<template>
  <Login />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Login from "@/components/autenticacion/Login.vue";

export default defineComponent({
  name: "InicioSesion",
  components: { Login },
});
</script>

<style scoped></style>
