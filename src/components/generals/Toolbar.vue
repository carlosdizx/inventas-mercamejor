<template>
  <v-app-bar app :color="color">
    <v-app-bar-nav-icon @click="cambiarEstadoNavbar"></v-app-bar-nav-icon>
    <v-toolbar-title>Mercamejor</v-toolbar-title>
    <v-spacer></v-spacer>
    <SelectorColor />
    <v-btn icon @click="showLogoutDialog = true">
      <v-icon>mdi-logout</v-icon>
    </v-btn>

    <!-- Diálogo de confirmación de logout -->
    <v-dialog v-model="showLogoutDialog" max-width="400">
      <v-card>
        <v-card-title class="text-h5">
          ¿Desea cerrar sesión?
        </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" variant="text" @click="showLogoutDialog = false">
            Cancelar
          </v-btn>
          <v-btn color="primary" variant="text" @click="confirmLogout">
            Si, cerrar sesión
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app-bar>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import SelectorColor from "@/components/generals/SelectorColor.vue";
import { LOGOUT } from "@/services/auth";

const store = useStore();
const router = useRouter();
const showLogoutDialog = ref(false);

const color = store.state.color;

const cambiarEstadoNavbar = () => {
  emit('cambiarEstadoNavDrawer');
};

const confirmLogout = async () => {
  await LOGOUT();
  showLogoutDialog.value = false;
  router.push("/inicioSesion");
};

const emit = defineEmits<{
  (e: 'cambiarEstadoNavDrawer'): void
}>();
</script>

<style scoped></style>
