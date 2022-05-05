<template>
  <v-row class="mr-5 ml-5">
    <v-dialog v-model="dialog" persistent max-width="900px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn height="45" color="primary" dark v-bind="attrs" v-on="on">
          Buscar Usuario
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="text-h5 text-center">Busqueda</span>
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col sm="6" md="2">
              <v-text-field label="Documento" required></v-text-field>
            </v-col>
            <v-col sm="6" md="3">
              <v-text-field label="Nombres"></v-text-field>
            </v-col>
            <v-col sm="6" md="2">
              <v-text-field label="Apellidos"></v-text-field>
            </v-col>
            <v-col sm="6" md="2">
              <v-text-field label="Email"></v-text-field>
            </v-col>
            <v-col sm="6" md="2">
              <v-text-field label="Acciones" disabled></v-text-field>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-text>
          <v-row v-for="(user, index) in usuarios" :key="index">
            <v-col sm="6" md="2">
              <v-label>{{ user.documento }}</v-label>
            </v-col>
            <v-col sm="6" md="3">
              <v-label>{{ user.nombres }}</v-label>
            </v-col>
            <v-col sm="6" md="2">
              <v-label>{{ user.apellidos }}</v-label>
            </v-col>
            <v-col sm="6" md="2">
              <v-label>{{ user.email }}</v-label>
            </v-col>
            <v-col sm="6" md="2">
              <v-btn @click="devolverUsuario(user, index)" class="success" text>
                Seleccionar
              </v-btn>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn x-large @click="dialog = false" color="blue darken-1" text>
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script lang="ts">
import { LISTAR_EMPLEADOS } from "@/services/usuarios";
import Vue from "vue";
export default Vue.extend({
  name: "BuscarUsuario",
  data: () => ({
    dialog: false,
    usuarios: [""],
    idents: [""],
  }),
  methods: {
    devolverUsuario(usuario: any, index: number) {
      this.dialog = false;
      this.$emit("devolverUsuario", {
        usuario,
        ident: this.idents[index],
      });
    },
    async listarUsuarios() {
      const res = await LISTAR_EMPLEADOS();
      this.idents = res?.ids;
      this.usuarios = res?.empleados;
    },
  },
  created() {
    this.listarUsuarios();
  },
});
</script>
