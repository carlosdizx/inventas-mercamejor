<template>
  <v-dialog v-model="dialog_form" persistent max-width="600">
    <v-btn color="red darken-4" dark @click="dialog_form = !dialog_form">
      <v-icon>mdi-close</v-icon>
    </v-btn>
    <template v-slot:activator="{ on, attrs }">
      <v-btn fab color="info darken-3" v-bind="attrs" v-on="on" v-if="!item">
        <v-icon>mdi-plus</v-icon>HOla
      </v-btn>
      <v-btn
        small
        outlined
        dark
        fab
        color="amber"
        v-bind="attrs"
        v-on="on"
        v-if="item"
      >
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
    </template>
    <v-card class="py-2">
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
        <h1 v-if="!item">Formulario de creación para {{ titulo }}</h1>
        <h1 v-if="item">Formulario de edición para {{ titulo }}</h1>
        <h6 v-if="item">{{ item.id }}</h6>
      </v-card-text>
      <v-card-text>
        <v-form
          v-if="!item"
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
              :counter="campo.counter"
              @focusout="validarInput(campo.model, campo.format)"
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
              :counter="campo.counter"
              @change="validarCombo(campo.model)"
            />
            <v-textarea
              v-if="campo.type === 3"
              outlined
              :label="campo.label"
              :prepend-icon="campo.prepend_icon"
              dense
              v-model="campo.model"
              :counter="campo.counter"
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
              :counter="campo.counter"
            />
          </div>
          <v-card-actions>
            <v-btn
              v-if="!item"
              :loading="loading"
              block
              color="success"
              type="submit"
            >
              Registrar
            </v-btn>
            <v-btn
              v-if="item"
              :loading="loading"
              block
              color="primary"
              type="submit"
            >
              Actualizar
            </v-btn>
          </v-card-actions>
        </v-form>
        <v-form
          v-if="item"
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
              v-model="item[campo.name]"
              :counter="campo.counter"
              :color="campo.readOnly ? 'red' : 'primary'"
              :readonly="campo.readOnly"
              :messages="campo.readOnly ? '**No editable**' : ''"
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
              v-model="item[campo.name]"
              :counter="campo.counter"
              :readonly="campo.readOnly"
            />
            <v-textarea
              v-if="campo.type === 3"
              outlined
              :label="campo.label"
              :prepend-icon="campo.prepend_icon"
              dense
              v-model="item[campo.name]"
              :counter="campo.counter"
              :readonly="campo.readOnly"
            />
            <v-switch
              color="deep-purple"
              v-if="campo.type === 4"
              inset
              :label="campo.label"
              v-model="item[campo.name]"
              :readonly="campo.readOnly"
            />
            <v-radio-group
              :label="campo.label"
              v-if="campo.type === 5"
              row
              v-model="item[campo.name]"
              :readonly="campo.readOnly"
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
              v-model="item[campo.name]"
              :counter="campo.counter"
              :readonly="campo.readOnly"
            />
          </div>
          <v-card-actions>
            <v-btn
              v-if="!item"
              :loading="loading"
              block
              color="success"
              type="submit"
            >
              Registrar
            </v-btn>
            <v-btn
              v-if="item"
              :loading="loading"
              block
              color="primary"
              type="submit"
            >
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
import Swal from "sweetalert2";
import Vue from "vue";
import {
  VALIDAR_COMBO,
  VALIDAR_INPUT,
  VALIDAR_FORM_REGISTRO,
  VALIDAR_FORM_ACTUALIZACION,
} from "@/generals/validaciones";
import {
  CAPTURAR_CAMPOS,
  PROCESAR_FORMULARIO,
} from "@/generals/procesamientos";

export default Vue.extend({
  name: "Form",
  data: () => ({
    dialog_form: false,
    campos: [...[]],
    datos: {},
    loading: false,
    errores: [],
  }),
  props: {
    titulo: String,
    campos_form: Array,
    coleccion: String,
    item: Object,
  },
  methods: {
    async inicializarForm() {
      this.campos = [...this.campos_form];
      this.errores = [];
    },
    async capturarCampos() {
      this.datos = await CAPTURAR_CAMPOS(this.item, this.campos);
    },
    async registrarFormulario() {
      this.loading = true;
      const esValido = await this.validarFormulario();
      if (esValido) {
        await this.capturarCampos();
        await PROCESAR_FORMULARIO(
          this.coleccion,
          this.datos,
          this.campos,
          this.item
        );
        await this.inicializarForm();
        this.dialog_form = false;
        this.datos = {};
        await this.$emit("registrado", true);
        this.errores = [];
      } else {
        await Swal.fire({
          timer: 1000,
          title: "Verificar el formulario",
          icon: "error",
          showConfirmButton: false,
        });
      }
      this.loading = false;
    },
    async actualizarFormulario() {
      this.loading = true;
      const esValido = await this.validarFormulario();
      if (esValido) {
        await this.capturarCampos();
        await PROCESAR_FORMULARIO(
          this.coleccion,
          this.datos,
          this.campos,
          this.item
        );
        await this.inicializarForm();
        this.dialog_form = false;
        this.datos = {};
        await this.$emit("editado", true);
        this.errores = [];
      } else {
        await Swal.fire({
          timer: 1000,
          title: "Verificar el formulario",
          icon: "error",
          showConfirmButton: false,
        });
      }
      this.loading = false;
    },
    async validarFormulario() {
      if (this.item) {
        this.errores = await VALIDAR_FORM_ACTUALIZACION(this.campos, this.item);
      } else {
        this.errores = await VALIDAR_FORM_REGISTRO(this.campos);
      }
      return this.errores.length === 0;
    },
    validarInput(modelo, type) {
      modelo = VALIDAR_INPUT(modelo, type, this.errores);
    },
    validarCombo(modelo) {
      modelo = VALIDAR_COMBO(modelo);
    },
  },
  async created() {
    await this.inicializarForm();
  },
});
</script>

<style scoped></style>
