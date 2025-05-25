<template>
  <v-navigation-drawer v-model="nav" app>
    <ListadoFunciones @item="cambiarItem" />
  </v-navigation-drawer>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import ListadoFunciones from "@/components/dashboard/ListadoFunciones.vue";

export default defineComponent({
  name: "NavDrawer",
  components: { ListadoFunciones },
  setup(props, { emit }) {
    const nav = ref(false);
    const item = ref(0);

    const cambiarEstado = () => {
      nav.value = !nav.value;
    };

    const cambiarItem = (id: number) => {
      item.value = id;
      emit("item", item.value);
    };

    return {
      nav,
      item,
      cambiarEstado,
      cambiarItem
    };
  }
});
</script>

<style scoped></style>
