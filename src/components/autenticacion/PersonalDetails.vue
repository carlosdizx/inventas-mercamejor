<template>
  <v-form>
    <v-text-field
      outlined
      dense
      label="Nombres"
      prepend-icon="mdi-account"
      counter
    />
    <v-text-field
      outlined
      dense
      label="Apellidos"
      prepend-icon="mdi-account"
      counter
    />
    <v-select
      outlined
      dense
      label="Tipo de documento"
      prepend-icon="mdi-card-account-details"
      :items="tipos_documento"
    />
    <v-text-field
      outlined
      dense
      label="Documento"
      prepend-icon="mdi-card-account-details"
    />
    <v-text-field
      outlined
      dense
      label="Celular"
      prepend-icon="mdi-cellphone"
      counter
    />
    <v-text-field
      outlined
      dense
      label="Dirección"
      prepend-icon="mdi-home"
      counter
    />
    <v-select
      outlined
      dense
      label="Género"
      prepend-icon="mdi-gender-male-female-variant"
      :items="generos"
    />
    <v-menu
      v-model="menu_fecha"
      :close-on-content-click="false"
      max-width="290"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-text-field
          outlined
          dense
          :value="fecha_nacimiento"
          clearable
          label="Fecha de nacimiento"
          readonly
          v-bind="attrs"
          v-on="on"
          prepend-icon="mdi-cake"
          @click:clear="fecha_nacimiento = null"
        />
      </template>
    </v-menu>
    <v-combobox
      label="Roles"
      prepend-icon="mdi-account-details"
      :items="roles"
      item-text="name"
      multiple
      hide-selected
      small-chips
      dense
      outlined
      v-model="roles_asignados"
    />
    <v-select
      outlined
      dense
      label="Estado de cuenta"
      prepend-icon="mdi-list-status"
      :items="generos"
    />
  </v-form>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "PersonalDetails",
  data: () => ({
    tipos_documento: [""],
    generos: [""],
    menu_fecha: false,
    fecha_nacimiento: null,
    roles: [
      { id: 1, name: "algo" },
      { id: 2, name: "algo2" },
      { id: 3, name: "algo3" },
    ],
    roles_asignados: [],
  }),
});
</script>

<style scoped></style>
