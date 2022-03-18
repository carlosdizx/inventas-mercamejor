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
        <h1 class="text-center my-3">
          Formulario de creación para {{ titulo }}
        </h1>
        <ValidationObserver ref="observer" v-slot="{ invalid }">
          <v-form
            class="my-2"
            :disabled="cargando"
            autocomplete="off"
            @submit.prevent="registrarDatos"
          >
            <div v-for="(campo, index) in campos" :key="index">
              <validation-provider
                v-slot="{ errors }"
                :name="campo.label"
                :rules="campo.rules"
                v-if="campo.type === 1"
              >
                <v-text-field
                  :label="campo.label"
                  :prepend-icon="campo.prepend_icon"
                  :type="campo.format"
                  dense
                  outlined
                  counter
                  v-model="campo.model"
                  :error-messages="errors"
                />
              </validation-provider>
              <validation-provider
                v-slot="{ errors }"
                :name="campo.label"
                :rules="campo.rules"
                v-if="campo.type === 2"
              >
                <v-combobox
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
                  :error-messages="errors"
                  @change="validarCombo(campo.model)"
                />
              </validation-provider>
              <validation-provider
                v-slot="{ errors }"
                :name="campo.label"
                :rules="campo.rules"
                v-if="campo.type === 3"
              >
                <v-textarea
                  outlined
                  :label="campo.label"
                  :prepend-icon="campo.prepend_icon"
                  dense
                  counter
                  v-model="campo.model"
                  :error-messages="errors"
                />
              </validation-provider>
              <validation-provider
                v-slot="{ errors }"
                :name="campo.label"
                :rules="campo.rules"
                v-if="campo.type === 4"
              >
                <v-switch
                  color="deep-purple"
                  inset
                  :label="campo.label"
                  v-model="campo.model"
                  :error-messages="errors"
                />
              </validation-provider>
              <validation-provider
                v-slot="{ errors }"
                :name="campo.label"
                :rules="campo.rules"
                v-if="campo.type === 5"
              >
                <v-radio-group
                  :label="campo.label"
                  row
                  v-model="campo.model"
                  :error-messages="errors"
                >
                  <br />
                  <v-radio
                    v-for="dato in campo.options"
                    :key="dato.value"
                    :label="dato.label"
                    :value="dato.value"
                  />
                </v-radio-group>
              </validation-provider>
              <validation-provider
                v-slot="{ errors }"
                :name="campo.label"
                :rules="campo.rules"
                v-if="campo.type === 6"
              >
                <v-select
                  :prepend-icon="campo.prepend_icon"
                  :items="campo.items"
                  :label="campo.label"
                  :multiple="campo.multiple"
                  :solo="campo.solo"
                  counter
                  outlined
                  dense
                  v-model="campo.model"
                  :error-messages="errors"
                />
              </validation-provider>
            </div>
            <v-btn
              block
              color="success"
              :disabled="invalid || cargando"
              type="submit"
              :loading="cargando"
            >
              Registrarme <v-icon>mdi-account-plus</v-icon>
            </v-btn>
          </v-form>
        </ValidationObserver>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import Vue from "vue";
import { VALIDAR_COMBO } from "@/generals/validaciones";
import {
  CAPTURAR_CAMPOS,
  PROCESAR_FORMULARIO,
} from "@/generals/procesamientos";
import { GUARDAR } from "@/services/crud";
import Swal from "sweetalert2";

export default Vue.extend({
  name: "FormCreate",
  data: () => ({
    dialog_form: false,
    cargando: false,
    campos: [...[]],
    datos: {},
  }),
  props: {
    titulo: String,
    campos_form: Array,
    coleccion: String,
  },
  methods: {
    async inicializarForm() {
      this.campos = [...this.campos_form];
    },
    validarCombo(modelo) {
      modelo = VALIDAR_COMBO(modelo);
    },
    async capturarCampos() {
      this.datos = await CAPTURAR_CAMPOS(null, this.campos);
    },
    async registrarDatos() {
      this.cargando = !this.cargando;
      await this.capturarCampos();
      this.dialog_form = !this.dialog_form;
      await this.inicializarForm();
      await PROCESAR_FORMULARIO(this.coleccion, this.datos, this.campos, null);
      await this.$emit("registrado", true);
      this.datos = {};
      this.cargando = !this.cargando;
    },
  },
  async created() {
    await this.inicializarForm();
  },
});
</script>

<style scoped></style>
