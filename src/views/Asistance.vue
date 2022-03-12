<template>
  <v-container>
    <v-card>
      <v-card-title class="text--center">
        <h2 class="text--center">Asistencia</h2>
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col>
            <h2>Description</h2>
            <v-text-field v-model="dat.description"></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <h2>Autor</h2>
            <v-select :items="integrantes" v-model="dat.autor"></v-select>
          </v-col>
          <v-col>
            <h2>Fecha:</h2>
            <v-text-field
              readonly
              v-model="dat.fecha"
              append-icon="mdi-calendar"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <h2>Tareas Actuales</h2>
            <v-text-field v-model="dat.currentTasks"></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <h2>Tareas Siguientes</h2>
            <v-text-field v-model="dat.nextTasks"></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <h2>Ideas</h2>
            <v-text-field v-model="dat.ideas"></v-text-field>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-btn
          :disabled="
            !dat.description ||
            !dat.autor ||
            !dat.fecha ||
            !dat.currentTasks ||
            !dat.nextTasks ||
            !dat.ideas
          "
          @click="saveAsistance()"
          class="success"
          block
          >Registrar</v-btn
        >
      </v-card-actions>
      <Tabla
        class="my-2"
        :coleccion="colecction"
        titulo="Personas"
        :columnas="columnas"
        llave="autor"
      />
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { GUARDAR } from "@/services/crud";
import Vue from "vue";
import { toDate } from "@/generals/formats";
import Swal from "sweetalert2";
import Tabla from "../components/Tabla.vue";

export default Vue.extend({
  name: "Asistance",
  components: { Tabla },
  data: () => ({
    colecction: "asistances",
    columnas: [
      { text: "Descripción", value: "description" },
      { text: "Autor", value: "autor" },
      { text: "Fecha", value: "fecha" },
      { text: "Tareas actual", value: "currentTasks" },
      { text: "Proximas tareas", value: "nextTasks" },
      { text: "Ideas", value: "ideas" },
      { text: "Acciones", value: "acciones" },
    ],
    dat: {
      description: null,
      autor: null,
      fecha: "",
      currentTasks: null,
      nextTasks: null,
      ideas: null,
    },
    integrantes: [
      "Brayan Tobar",
      "Cristhian Rosas",
      "Edwin Valencia",
      "Carlos Diaz",
    ],
  }),
  methods: {
    async saveAsistance() {
      await GUARDAR(this.colecction, this.dat);
      this.dat = {
        description: null,
        autor: null,
        fecha: "",
        currentTasks: null,
        nextTasks: null,
        ideas: null,
      };
      this.dat.fecha = toDate(new Date());
      Swal.fire("Asistencia registrada", "", "success");
    },
  },
  created() {
    this.dat.fecha = toDate(new Date());
  },
});
</script>
