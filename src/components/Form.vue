<template>
  <v-dialog v-model="dialog_form" persistent max-width="600">
    <v-btn color="red darken-4" dark @click="dialog_form = !dialog_form">
      <v-icon>mdi-close</v-icon>
    </v-btn>
    <template v-slot:activator="{ on, attrs }">
      <v-btn fab color="info darken-3" v-bind="attrs" v-on="on">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </template>
    <v-card class="py-2">
      <v-card-text>
        <h1>Formulario de creación para {{ titulo_form }}</h1>
      </v-card-text>
      <v-card-text>
        <v-form
          :disabled="loading"
          autocomplete="off"
          @submit.prevent="registrarFormulario"
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
              :rules="campo.rules"
              @change="validarFormulario"
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
            <v-btn
              :disabled="errores > 0"
              :loading="loading"
              block
              color="success"
              type="submit"
            >
              Registrar
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
import { GUARDAR } from "@/services/crud";
import Swal from "sweetalert2";

export default {
  name: "Form",
  data: () => ({
    dialog_form: false,
    titulo_form: "",
    campos: [],
    key_value: [],
    coleccion_form: "",
    datos: {},
    loading: false,
    errores: 0,
  }),
  props: {
    titulo: String,
    campos_form: Array,
    coleccion: String,
  },
  methods: {
    cargarInformacion() {
      this.campos = [];
      this.titulo_form = this.titulo;
      this.campos_form.forEach((campo) => {
        this.campos.push(campo);
      });
    },
    async capturarCampos() {
      this.campos_form.forEach((campo) => {
        this.datos[campo.name] = campo.model;
      });
    },
    async registrarFormulario() {
      this.loading = true;
      const esValido = await this.validarFormulario();
      if (esValido) {
        await this.capturarCampos();
        await GUARDAR(this.coleccion_form, this.datos);
        this.cargarInformacion();
        await Swal.fire("Registro exitoso", "Datos registrados", "success");
        this.datos = {};
        this.dialog_form = false;
        await this.$emit("registrado", true);
        this.campos.forEach((campo) => {
          campo.model = null;
        });
        await this.validarFormulario();
      } else {
        await Swal.fire("No cumple", "", "error");
      }
      this.loading = false;
    },
    async validarFormulario() {
      let contador = 0;
      this.errores = 0;
      this.campos.forEach((campo) => {
        if (campo !== null) {
          if (campo.required && (campo.model === null || campo.model === "")) {
            contador++;
            campo.rules = ["Campo requerdio"];
            campo.color = "red";
          } else if (campo.blank && campo.model.trim() === "") {
            contador++;
            campo.rules = ["Campo no puede estar vacio"];
            campo.color = "red";
          } else {
            campo.rules = [];
            campo.color = null;
          }
        }
      });
      this.errores = contador;
      return this.errores === 0;
    },
  },
  async created() {
    this.coleccion_form = this.coleccion;
    this.cargarInformacion();
    await this.validarFormulario();
  },
};
</script>

<style scoped></style>
