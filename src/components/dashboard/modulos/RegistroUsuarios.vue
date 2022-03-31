<template>
  <v-container>
    <v-card>
      <v-card-title>Registrar Usuarios</v-card-title>
      <v-card-text>
        <v-row class="mr-5 ml-5">
          <v-col>
            <v-select
              label="Tipo de usuario"
              :items="rolesDisponibles"
              v-model="datosUsuario.rol"
            ></v-select>
          </v-col>
        </v-row>
        <v-row class="mr-5 ml-5">
          <v-col>
            <v-text-field
              v-model="datosUsuario.nombres"
              label="Nombres"
            ></v-text-field>
          </v-col>
          <v-col>
            <v-text-field
              v-model="datosUsuario.apellidos"
              label="Apellidos"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row class="mr-5 ml-5">
          <v-col>
            <v-text-field
              v-model="datosUsuario.documento"
              label="Número de Documento"
            ></v-text-field>
          </v-col>
          <v-col>
            <v-text-field
              type="number"
              v-model="datosUsuario.celular"
              label="Celular"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row class="mr-5 ml-5">
          <v-col>
            <v-text-field
              type="email"
              v-model="datosUsuario.email"
              label="Correo Electrónico"
            ></v-text-field>
          </v-col>
          <v-col>
            <v-text-field
              type="email"
              v-model="validarCorreo"
              label="Confirmar Correo"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row class="mr-5 ml-5">
          <v-col>
            <v-select
              v-model="datosUsuario.genero"
              label="Sexo"
              :items="generosDisponibles"
            ></v-select>
          </v-col>
        </v-row>
        <v-row class="mr-5 ml-5">
          <v-col>
            <v-text-field
              type="password"
              v-model="datosUsuario.passwd"
              label="Contraseña"
              :items="generosDisponibles"
            ></v-text-field>
          </v-col>
          <v-col>
            <v-text-field
              type="password"
              v-model="datosUsuario.validarContra"
              label="Confirmar contraseña"
              :items="generosDisponibles"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row class="mr-5 ml-5">
          <v-col>
            <v-select
              v-model="datosUsuario.estado"
              label="Estado del Usuario"
              :items="estadosDisponible"
            ></v-select>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-container>
          <v-btn block large class="success">Registrar</v-btn>
        </v-container>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "RegistroUsuarios",
  data: () => ({
    rolesDisponibles: ["Empleado", "Administrador"],
    generosDisponibles: ["Masculino", "Femenino", "Otro"],
    estadosDisponible: ["Habilitado", "Desabilitado"],
    datosUsuario: {
      rol: "",
      nombres: "",
      apellidos: "",
      documento: "",
      celular: "",
      email: "",
      genero: "",
      passwd: "",
      estado: "",
    },
  }),
  computed: {
    validarCorreo() {
      return true;
    },
    validarContra() {
      return true;
    },
  },
});
</script>
