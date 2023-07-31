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
                  label="Correo de Usuario"
                  v-model="newDatosUsuario.email"
                  dense
                  outlined
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
                    v-model="newDatosUsuario.rol"
                    :error-messages="errors"
                    dense
                    outlined
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
                    v-model="newDatosUsuario.nombres"
                    label="Nombres"
                    :error-messages="errors"
                    disabled
                    dense
                    outlined
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
                    v-model="newDatosUsuario.apellidos"
                    label="Apellidos"
                    :error-messages="errors"
                    disabled
                    dense
                    outlined
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
                    v-model="newDatosUsuario.documento"
                    label="Número de Documento"
                    :error-messages="errors"
                    disabled
                    dense
                    outlined
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
                    v-model="newDatosUsuario.celular"
                    :error-messages="errors"
                    label="Celular"
                    dense
                    outlined
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
                    v-model="newDatosUsuario.genero"
                    label="Sexo"
                    :items="generosDisponibles"
                    :error-messages="errors"
                    dense
                    outlined
                  ></v-select>
                </validation-provider>
              </v-col>
            </v-row>
            <v-row class="mr-5 ml-5">
              <v-col>
                <validation-provider
                  v-slot="{ errors }"
                  name="Estado"
                  rules="required"
                >
                  <v-select
                    v-model="newDatosUsuario.estado"
                    label="Estado"
                    :items="estadosDisponible"
                    :error-messages="errors"
                    dense
                    outlined
                  ></v-select>
                </validation-provider>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions>
            <v-container class="mr-5 ml-5">
              <v-btn
                @click="mostrarConfirmacion = true"
                :disabled="invalid || detectarCambios"
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
import { ACTUALIZAR_USUARIO } from "@/services/usuarios";
import Swal from "sweetalert2";
import BuscarUsuarioVue from "./BuscarUsuario.vue";
import { ESTADOS_USUARIO, GENEROS, ROLES } from "@/generals/Constantes";

export default Vue.extend({
  name: "ActualizarUsuarios",
  components: { BuscarUsuarioVue },
  data: () => ({
    rolesDisponibles: ROLES,
    generosDisponibles: GENEROS,
    estadosDisponible: ESTADOS_USUARIO,
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
        const newDatosUsuario: any = { ...this.newDatosUsuario };
        const datosUsuario: any = { ...this.datosUsuario };
        if (newDatosUsuario[value] !== datosUsuario[value]) {
          iguales = false;
        }
      });
      return iguales;
    },
  },
  methods: {
    async actualizarUsuario() {
      await ACTUALIZAR_USUARIO(this.ident, this.newDatosUsuario);
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
      this.newDatosUsuario = { ...this.datosUsuario };
      this.ident = datosUsuario.ident;
    },
  },
});
</script>
