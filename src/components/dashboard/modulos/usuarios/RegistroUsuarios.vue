<template>
  <v-container>
    <v-card>
      <v-card-title>Registrar Usuarios</v-card-title>
      <ValidationObserver ref="observer" v-slot="{ invalid }">
        <v-form class="my-2" @submit.prevent="crearCuenta">
          <v-card-text>
            <v-row class="mr-5 ml-5">
              <v-col>
                <validation-provider
                  v-slot="{ errors }"
                  name="Tipo de usuario"
                  rules="required"
                >
                  <v-select
                    label="Tipo de usuario"
                    outlined
                    dense
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
                    outlined
                    dense
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
                    outlined
                    dense
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
                  outlined
                  dense
                  rules="required|min:5|max:50"
                >
                  <v-text-field
                    v-model="datosUsuario.documento"
                    label="Número de Documento"
                    outlined
                    dense
                    :error-messages="errors"
                    type="text"
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
                    outlined
                    dense
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
                  name="Genero"
                  rules="required"
                >
                  <v-select
                    v-model="datosUsuario.genero"
                    label="Genero"
                    outlined
                    dense
                    :items="generosDisponibles"
                    :error-messages="errors"
                  ></v-select>
                </validation-provider>
              </v-col>
            </v-row>
            <v-row class="mr-5 ml-5">
              <v-col>
                <validation-provider
                  v-slot="{ errors }"
                  name="Correo Electrónico"
                  rules="required|email"
                >
                  <v-text-field
                    type="email"
                    v-model="datosAuth.email"
                    :error-messages="errors"
                    outlined
                    dense
                    label="Correo Electrónico"
                  ></v-text-field>
                </validation-provider>
              </v-col>
              <v-col>
                <validation-provider
                  v-slot="{ errors }"
                  name="Confirmar Correo"
                  rules="required|email"
                >
                  <v-text-field
                    type="email"
                    v-model="datosVerificacion.confirmarEmail"
                    :error-messages="errors"
                    outlined
                    dense
                    label="Confirmar Correo"
                  ></v-text-field>
                </validation-provider>
              </v-col>
            </v-row>

            <v-row class="mr-5 ml-5">
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
                    outlined
                    dense
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
                    outlined
                    dense
                    :error-messages="errors"
                  ></v-text-field>
                </validation-provider>
              </v-col>
            </v-row>
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
          <v-card-text>
            <small>
              <v-chip dense small v-if="invalid" color="orange lighten-2">
                Complete todos los campos <v-icon>mdi-alert</v-icon>
              </v-chip>
              <v-chip dense small v-if="validarCorreo" color="orange lighten-2">
                Correo Electronico no coinciden <v-icon>mdi-alert</v-icon>
              </v-chip>
              <v-chip dense small v-if="validarContra" color="orange lighten-2">
                Contraseñas no coinciden <v-icon>mdi-alert</v-icon>
              </v-chip>
            </small>
          </v-card-text>
          <v-card-actions>
            <v-container class="mr-5 ml-5">
              <v-btn
                @click="mostrarConfirmacion = true"
                :disabled="invalid || validarCorreo || validarContra"
                block
                large
                class="success"
                >Registrar</v-btn
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
            <v-btn color="green darken-1" text @click="registrarUsuario()">
              Guardar Usuario
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import { NOTIFICAR_ERROR } from "@/generals/notificaciones";
import { REGISTRO_USUARIO } from "@/services/auth";

import Swal from "sweetalert2";
import { REGISTRAR_DATOS_USUARIO } from "@/services/usuarios";
import { ESTADOS_USUARIO, GENEROS, ROLES } from "@/generals/Constantes";

export default Vue.extend({
  name: "RegistroUsuarios",
  data: () => ({
    rolesDisponibles: ROLES,
    generosDisponibles: GENEROS,
    estadosDisponible: ESTADOS_USUARIO,
    datosUsuario: {
      rol: "Empleado",
      nombres: "",
      apellidos: "",
      documento: "",
      celular: "",
      genero: "",
      estado: "Habilitado",
      email: "",
      created_at: new Date(),
      updated_at: new Date(),
    },
    datosAuth: {
      email: "",
      passwd: "",
    },
    datosVerificacion: {
      confirmarEmail: "",
      confirmarPasswd: "",
    },
    mostrarConfirmacion: false,
  }),
  computed: {
    validarCorreo() {
      if (
        this.datosAuth.email.length === 0 &&
        this.datosVerificacion.confirmarEmail.length === 0
      )
        return false;
      return !(
        this.datosAuth.email.length >= 6 &&
        this.datosVerificacion.confirmarEmail.length >= 6 &&
        this.datosAuth.email === this.datosVerificacion.confirmarEmail
      );
    },
    validarContra() {
      if (
        this.datosAuth.passwd.length === 0 &&
        this.datosVerificacion.confirmarPasswd.length === 0
      )
        return false;
      return !(
        this.datosAuth.passwd.length >= 6 &&
        this.datosVerificacion.confirmarPasswd.length >= 6 &&
        this.datosAuth.passwd === this.datosVerificacion.confirmarPasswd
      );
    },
  },
  methods: {
    async registrarUsuario() {
      try {
        const respuesta: any = await REGISTRO_USUARIO(
          this.datosAuth.email,
          this.datosAuth.passwd
        );
        const id = respuesta.localId;
        this.datosUsuario.email = this.datosAuth.email;
        this.datosUsuario.created_at = new Date();
        await REGISTRAR_DATOS_USUARIO(id, this.datosUsuario);
        this.mostrarConfirmacion = false;
        await Swal.fire({
          timer: 3000,
          title: "Registro exitoso",
          text:
            "En el correo registrado (" +
            this.datosAuth.email +
            ") verifique el correo",
          icon: "success",
          showConfirmButton: false,
        });
        this.limpiarDatos();
        const observer: any = this.$refs.observer;
        if (observer) {
          observer.reset();
        }
      } catch (e) {
        await NOTIFICAR_ERROR(e.code);
      }
    },
    limpiarDatos() {
      this.datosUsuario.rol = "";
      this.datosUsuario.nombres = "";
      this.datosUsuario.apellidos = "";
      this.datosUsuario.documento = "";
      this.datosUsuario.celular = "";
      this.datosUsuario.genero = "";
      this.datosUsuario.estado = "";
      this.datosAuth.email = "";
      this.datosAuth.passwd = "";
      this.datosVerificacion.confirmarEmail = "";
      this.datosVerificacion.confirmarPasswd = "";
    },
  },
});
</script>
