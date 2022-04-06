<template>
  <v-container>
    <v-card>
      <v-card-title class="mb-2 mr-5 ml-5">Actualizar Usuarios</v-card-title>
      <v-card-text>
        <BuscarUsuarioVue @devolverUsuario="asignarUsuario" />
      </v-card-text>
      <ValidationObserver ref="observer" v-slot="{ invalid }">
        <v-form class="my-2" @submit.prevent="crearCuenta">
          <v-card-text>
            <v-row class="mr-5 ml-5">
              <v-col>
                <v-text-field
                  label="Email de Usuario"
                  v-model="datosUsuario.email"
                  disabled
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row class="mr-5 ml-5">
              <v-col>
                <validation-provider
                  v-slot="{ errors }"
                  name="Tipo de usuario"
                  rules="required"
                >
                  <v-select
                    label="Tipo de usuario"
                    :items="rolesDisponibles"
                    v-model="datosUsuario.rol"
                    :error-messages="errors"
                  ></v-select>
                </validation-provider>
              </v-col>
            </v-row>
            <v-row class="mr-5 ml-5">
              <v-col>
                <validation-provider
                  v-slot="{ errors }"
                  name="Nombres"
                  rules="required|min:3|max:50"
                >
                  <v-text-field
                    v-model="datosUsuario.nombres"
                    label="Nombres"
                    :error-messages="errors"
                  ></v-text-field>
                </validation-provider>
              </v-col>
              <v-col>
                <validation-provider
                  v-slot="{ errors }"
                  name="Apellidos"
                  rules="required|min:3|max:50"
                >
                  <v-text-field
                    v-model="datosUsuario.apellidos"
                    label="Apellidos"
                    :error-messages="errors"
                  ></v-text-field>
                </validation-provider>
              </v-col>
            </v-row>
            <v-row class="mr-5 ml-5">
              <v-col>
                <validation-provider
                  v-slot="{ errors }"
                  name="Número de Documento"
                  rules="required|min:5|max:50"
                >
                  <v-text-field
                    v-model="datosUsuario.documento"
                    label="Número de Documento"
                    :error-messages="errors"
                    type="number"
                  ></v-text-field>
                </validation-provider>
              </v-col>
              <v-col>
                <validation-provider
                  v-slot="{ errors }"
                  name="Celular"
                  rules="required|min:5|max:50"
                >
                  <v-text-field
                    type="number"
                    v-model="datosUsuario.celular"
                    :error-messages="errors"
                    label="Celular"
                  ></v-text-field>
                </validation-provider>
              </v-col>
            </v-row>

            <v-row class="mr-5 ml-5">
              <v-col>
                <validation-provider
                  v-slot="{ errors }"
                  name="Sexo"
                  rules="required"
                >
                  <v-select
                    v-model="datosUsuario.genero"
                    label="Sexo"
                    :items="generosDisponibles"
                    :error-messages="errors"
                  ></v-select>
                </validation-provider>
              </v-col>
            </v-row>
            <!-- <v-row class="mr-5 ml-5">
              <v-col>
                <validation-provider
                  v-slot="{ errors }"
                  name="Contraseña"
                  rules="required|min:6|max:32"
                >
                  <v-text-field
                    type="password"
                    v-model="datosAuth.passwd"
                    label="Contraseña"
                    :items="generosDisponibles"
                    :error-messages="errors"
                  ></v-text-field>
                </validation-provider>
              </v-col>
              <v-col>
                <validation-provider
                  v-slot="{ errors }"
                  name="Confirmar contraseña"
                  rules="required|min:6|max:32"
                >
                  <v-text-field
                    v-model="datosVerificacion.confirmarPasswd"
                    type="password"
                    label="Confirmar contraseña"
                    :error-messages="errors"
                  ></v-text-field>
                </validation-provider>
              </v-col>
            </v-row> -->
            <!-- <v-row class="mr-5 ml-5">
              <v-col>
                <validation-provider
                  v-slot="{ errors }"
                  name="Estado del Usuario"
                  rules="required"
                >
                  <v-select
                    v-model="datosUsuario.estado"
                    label="Estado del Usuario"
                    :items="estadosDisponible"
                    :error-messages="errors"
                  ></v-select>
                </validation-provider>
              </v-col>
            </v-row> -->
          </v-card-text>
          <v-card-actions>
            <v-container class="mr-5 ml-5">
              <v-btn
                @click="mostrarConfirmacion = true"
                :disabled="invalid"
                block
                large
                class="warning"
                >Actualizar</v-btn
              >
            </v-container>
          </v-card-actions>
        </v-form>
      </ValidationObserver>
    </v-card>

    <v-row justify="center">
      <v-dialog v-model="mostrarConfirmacion" persistent max-width="600">
        <v-card>
          <v-card-title class="text-h5">
            Confirmar registro de usuario
          </v-card-title>
          <v-card-text>Esta seguro de guardar este usuario</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="red darken-1"
              text
              @click="mostrarConfirmacion = false"
            >
              Cancelar
            </v-btn>
            <v-btn color="green darken-1" text @click="actualizarUsuario()">
              Actualizar Usuario
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import { ACTUALIZARDATOSUSUARIO } from "@/services/usurios";
import Swal from "sweetalert2";
import BuscarUsuarioVue from "./BuscarUsuario.vue";

export default Vue.extend({
  name: "ActualizarUsuarios",
  components: { BuscarUsuarioVue },
  data: () => ({
    rolesDisponibles: ["Empleado"], //"Administrador"],
    generosDisponibles: ["Masculino", "Femenino", "Otro"],
    estadosDisponible: ["Habilitado", "Desabilitado"],
    ident: "",
    datosUsuario: {
      rol: "",
      nombres: "",
      apellidos: "",
      documento: "",
      celular: "",
      genero: "",
      estado: "",
      email: "",
    },
    newDatosUsuario: {
      rol: "",
      nombres: "",
      apellidos: "",
      documento: "",
      celular: "",
      genero: "",
      estado: "",
      email: "",
    },
    mostrarConfirmacion: false,
  }),
  computed: {
    detectarCambios() {
      let iguales = true;
      Object.keys(this.newDatosUsuario).forEach((value: any) => {
        if (this.newDatosUsuario[value] != this.datosUsuario[value]) {
          iguales = false;
        }
      });
      return iguales;
    },
  },
  methods: {
    async actualizarUsuario() {
      await ACTUALIZARDATOSUSUARIO(this.ident, this.newDatosUsuario);
      this.mostrarConfirmacion = false;
      await Swal.fire({
        timer: 3000,
        title: "Actualizacion exitoso",
        text:
          "Datos de usuario" +
          this.datosUsuario.email +
          "Actualizado correctamente",
        icon: "success",
        showConfirmButton: false,
      });
      this.limpiarDatos();
    },
    limpiarDatos() {
      this.datosUsuario.rol = "";
      this.datosUsuario.nombres = "";
      this.datosUsuario.apellidos = "";
      this.datosUsuario.documento = "";
      this.datosUsuario.celular = "";
      this.datosUsuario.genero = "";
      this.datosUsuario.estado = "";
      this.datosUsuario.email = "";

      this.newDatosUsuario.rol = "";
      this.newDatosUsuario.nombres = "";
      this.newDatosUsuario.apellidos = "";
      this.newDatosUsuario.documento = "";
      this.newDatosUsuario.celular = "";
      this.newDatosUsuario.genero = "";
      this.newDatosUsuario.estado = "";
    },
    asignarUsuario(datosUsuario: any) {
      this.datosUsuario = datosUsuario.usuario;
      this.newDatosUsuario = this.datosUsuario;
      this.ident = datosUsuario.ident;
    },
  },
});
</script>
