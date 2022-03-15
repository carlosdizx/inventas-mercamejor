<template>
  <v-card max-width="600" class="mx-auto">
    <v-card-subtitle>
      <v-row justify="space-around">
        <v-avatar size="250" color="deep-purple">
          <img src="@/assets/logo.png" alt="logo" />
        </v-avatar>
      </v-row>
    </v-card-subtitle>
    <UserCredentials />
  </v-card>
</template>

<script lang="ts">
import UserCredentials from "@/components/autenticacion/UserCredentials.vue";
import Vue from "vue";
export default Vue.extend({
  name: "Registro",
  components: { UserCredentials },
  data: () => ({
    etapa: 1,
  }),
});
</script>

<style scoped></style>
