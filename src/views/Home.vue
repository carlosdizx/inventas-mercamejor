<template>
  <v-container>
    <Tabla
      class="my-2"
      coleccion="personas"
      titulo="personas"
      :columnas="columnas"
      llave="documento"
      :campos_detalle="campos_detalle"
      :campos_form="campos_form"
    />
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import Tabla from "@/components/Tabla.vue";

export default Vue.extend({
  name: "Home",
  components: { Tabla },
  data: () => ({
    columnas: [
      { text: "Detalle", value: "detalle" },
      { text: "Nombres", value: "nombres" },
      { text: "Apellidos", value: "apellidos" },
      { text: "Documento", value: "documento" },
      { text: "Fecha de nacimiento", value: "fecha_nacimiento" },
      { text: "Fecha de expedición", value: "fecha_expedicion" },
      { text: "Género", value: "genero" },
      { text: "Salario", value: "salario" },
      { text: "Calificación", value: "calificacion" },
      { text: "Estado", value: "estado" },
      { text: "Acciones", value: "acciones" },
    ],
    campos_detalle: [
      { text: "Nombres", value: "nombres" },
      { text: "Apellidos", value: "apellidos" },
      { text: "Documento", value: "documento" },
      { text: "Fecha de nacimiento", value: "fecha_nacimiento" },
      { text: "Fecha de expedición", value: "fecha_expedicion" },
      { text: "Género", value: "genero" },
      { text: "Salario", value: "salario" },
      { text: "Calificación", value: "calificacion" },
      { text: "Estado", value: "estado" },
      { text: "Celular", value: "celular" },
      { text: "Correo", value: "correo" },
      { text: "Dirección", value: "direccion" },
    ],
    campos_form: [
      { label: "Campo de texto 1", prepend_icon: "mdi-home", type: 1 },
      {
        label: "Campo de texto 2",
        prepend_icon: "mdi-airplane",
        type: 2,
        items: [
          { a1: 1, a2: 2 },
          { a1: 3, a2: 4 },
          { a1: 5, a2: 6 },
        ],
        llave: "a2",
      },
      {
        label: "Campo de texto 3",
        prepend_icon: "mdi-account",
        type: 2,
        items: [
          { b1: "voces", b2: 2 },
          { b1: "locas", b2: 4 },
          { b1: "en mi cabez", b2: 6 },
        ],
        llave: "b2",
        multiple: true,
      },
    ],
  }),
  created() {
    //this.$router.push("/asistance");
  },
});
</script>
