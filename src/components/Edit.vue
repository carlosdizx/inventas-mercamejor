<template>
  <v-dialog v-model="dialog_form" persistent max-width="600">
    <v-btn color="red darken-4" dark @click="dialog_form = !dialog_form">
      <v-icon>mdi-close</v-icon>
    </v-btn>
    <template v-slot:activator="{ on, attrs }">
      <v-btn small outlined dark fab color="amber" v-bind="attrs" v-on="on">
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
    </template>
    <v-card class="py-2">
      {{ data }}
      <v-alert
        class="mx-4"
        v-for="(error, index) of errores"
        :key="index"
        type="error"
        dense
        outlined
      >
        {{ error }}
      </v-alert>
      <v-card-text>
        <h1>Formulario de edición para {{ titulo_form }}</h1>
        <h6>ID: {{ objeto.id }}</h6>
      </v-card-text>
      <v-card-text>
        <v-form
          :disabled="loading"
          autocomplete="off"
          @submit.prevent="actualizarFormulario"
        >
          <div v-for="(campo, index) in campos" :key="index">
            <v-text-field
              v-if="campo.type === 1"
              :label="campo.label"
              :prepend-icon="campo.prepend_icon"
              :type="campo.format"
              dense
              outlined
              :required="campo.required"
              v-model="campo.model"
            />
            <v-combobox
              v-if="campo.type === 2"
              :label="campo.label"
              :prepend-icon="campo.prepend_icon"
              :items="campo.items"
              :item-text="campo.llave"
              :multiple="campo.multiple"
              hide-selected
              small-chips
              dense
              outlined
              v-model="campo.model"
            />
            <v-textarea
              v-if="campo.type === 3"
              outlined
              :label="campo.label"
              :prepend-icon="campo.prepend_icon"
              dense
              counter
              v-model="campo.model"
            />
            <v-switch
              color="deep-purple"
              v-if="campo.type === 4"
              inset
              :label="campo.label"
              v-model="campo.model"
            />
            <v-radio-group
              :label="campo.label"
              v-if="campo.type === 5"
              row
              v-model="campo.model"
            >
              <br />
              <v-radio
                v-for="dato in campo.options"
                :key="dato.value"
                :label="dato.label"
                :value="dato.value"
              />
            </v-radio-group>
            <v-select
              v-if="campo.type === 6"
              :prepend-icon="campo.prepend_icon"
              :items="campo.items"
              :label="campo.label"
              solo
              v-model="campo.model"
            />
          </div>
          <v-card-actions>
            <v-btn :loading="loading" block color="info" type="submit">
              Actualizar
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card-text>
    </v-card>
    <v-btn color="red darken-4" dark @click="dialog_form = !dialog_form">
      <v-icon>mdi-close</v-icon>
    </v-btn>
  </v-dialog>
</template>

<script>
import { EDITAR } from "@/services/crud";
import Swal from "sweetalert2";
import Vue from "vue";

export default Vue.extend({
  name: "Edit",
  data: () => ({
    dialog_form: false,
    titulo_form: "",
    campos: [],
    data: [],
    coleccion_form: "",
    datos: {},
    loading: false,
    errores: [],
  }),
  props: {
    titulo: String,
    campos_edit: Array,
    coleccion: String,
    objeto: Object,
  },
  methods: {
    async inicializarEdit() {
      this.campos = [...this.campos_edit];
      this.titulo_form = this.titulo;

      this.data = Object.entries(this.objeto).map(([key, value]) => ({
        key,
        value,
      }));

      this.campos.map((campo) => {
        this.data.forEach((dat) => {
          if (dat.key === campo.name) {
            campo.model = dat.value;
          }
        });
      });
    },
    async capturarCampos() {
      this.campos_edit.forEach((campo) => {
        this.datos[campo.name] = campo.model;
      });
    },
    async actualizarFormulario() {
      this.loading = true;
      const esValido = await this.validarFormulario();
      if (esValido) {
        await this.capturarCampos();
        await EDITAR(this.coleccion_form, this.objeto.id, this.datos);
        await this.inicializarEdit();
        await Swal.fire(
          "Actualización exitosa",
          "Datos registrados",
          "success"
        );
        this.dialog_form = false;
        this.datos = {};
        await this.$emit("editado", true);
        this.campos.forEach((campo) => {
          campo.model = "";
        });
        this.errores = [];
      } else {
        await Swal.fire({
          timer: 1000,
          title: "Error en el formulario",
          icon: "error",
          showConfirmButton: false,
        });
      }
      this.loading = false;
    },
    async validarFormulario() {
      this.errores = [];
      this.campos.forEach((campo) => {
        if (campo !== null) {
          if (campo.blank && campo.model.trim() === "") {
            this.errores.push(`El campo '${campo.label}' no puede estar vacío`);
          }
          const caracteres = campo.model.trim().length;
          if (
            campo.min &&
            campo.max &&
            (caracteres < campo.min || caracteres > campo.max)
          ) {
            this.errores.push(
              `El campo '${campo.label}' minimo ${campo.min} y maximo ${campo.max} de caracteres,
               actualmente tiene ${caracteres}`
            );
          }
        }
      });
      return this.errores.length === 0;
    },
  },
  async created() {
    this.coleccion_form = this.coleccion;
    await this.inicializarEdit();
  },
});
</script>

<style scoped></style>
