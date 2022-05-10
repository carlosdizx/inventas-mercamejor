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
                  @change="validarCombo(campo)"
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
                  :item-text="campo.llave"
                  counter
                  outlined
                  dense
                  v-model="campo.model"
                  :error-messages="errors"
                />
              </validation-provider>
              <validation-provider
                v-slot="{ errors }"
                :name="campo.label"
                :rules="campo.rules"
                v-if="campo.type === 7"
              >
                <v-slider
                  :label="campo.label"
                  :step="campo.step"
                  :readonly="campo.readOnly"
                  :disabled="campo.readOnly"
                  :min="campo.min"
                  :max="campo.max"
                  thumb-label
                  ticks
                  :error-messages="errors"
                  v-model="campo.model"
                />
              </validation-provider>
              <validation-provider
                v-slot="{ errors }"
                :name="campo.label"
                :rules="campo.rules"
                v-if="campo.type === 8"
              >
                <vuetify-money
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
              <!-- Lista anidada -->
              <validation-provider
                v-slot="{ errors }"
                :name="campo.label"
                :rules="campo.rules"
                v-if="campo.type === 9"
              >
                <v-combobox
                  :label="campo.label"
                  prepend-icon="mdi-format-list-bulleted"
                  :items="campo.items"
                  :item-text="campo.llave"
                  :multiple="campo.multiple"
                  hide-selected
                  small-chips
                  dense
                  outlined
                  v-model="campo.model"
                  :error-messages="errors"
                  @change="validarCombo(campo)"
                />
                <v-select
                  :label="campo.label2"
                  prepend-icon="mdi-format-list-bulleted"
                  :items="campo.items2"
                  dense
                  outlined
                  small-chips
                  v-model="campo.model2"
                  :error-messages="errors"
                />
              </validation-provider>
              <validation-provider
                v-slot="{ errors }"
                :name="campo.label"
                :rules="campo.rules"
                v-if="campo.type === 10"
              >
                <v-file-input
                  :label="campo.label"
                  :prepend-icon="campo.prepend_icon"
                  dense
                  outlined
                  counter
                  show-size
                  accept="image/*,.pdf"
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
              Registrarme <v-icon>mdi-database-plus</v-icon>
            </v-btn>
          </v-form>
        </ValidationObserver>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from "vue";
import { VALIDAR_CAMPO, VALIDAR_COMBO } from "@/generals/validaciones";
import {
  CAPTURAR_CAMPOS,
  PROCESAR_FORMULARIO,
} from "@/generals/procesamientos";
import Swal from "sweetalert2";

export default Vue.extend({
  name: "FormCreate",
  data: () => ({
    dialog_form: false,
    cargando: false,
    campos: [{}],
    datos: {
      created_at: new Date(),
      updated_at: new Date(),
    },
    validados: [""],
  }),
  props: {
    titulo: String,
    campos_form: Array,
    validaciones: Array,
    coleccion: String,
  },
  methods: {
    async validarCombo(campo: any) {
      if (campo.validacion) {
        campo.model = await VALIDAR_COMBO(campo.model, campo.items);
        if (campo.type === 9) {
          campo.items2 = campo.model[campo.llave2];
        }
      }
    },
    async mensajeValidaciones() {
      let msg = "";
      this.validados.forEach((valid) => (msg += valid + "<br/>"));
      return msg;
    },
    async preSubmit() {
      this.validados = [];
      for (const validacion of this.validaciones) {
        const resultado = await VALIDAR_CAMPO(this.datos, validacion);
        if (resultado !== "") {
          this.validados.push(resultado);
          console.log("A: " + this.validados);
        }
      }
    },
    async registrarDatos(): Promise<any> {
      this.cargando = !this.cargando;
      this.datos = await CAPTURAR_CAMPOS(null, this.campos);
      await this.preSubmit();
      console.log("B: " + this.validados);
      if (this.validados.length > 0) {
        this.cargando = !this.cargando;
        return await Swal.fire(
          "Campos incorrectos",
          await this.mensajeValidaciones(),
          "error"
        );
      }
      this.campos = [];
      this.campos_form.forEach((campo: any) => this.campos.push(campo));
      this.datos.created_at = new Date();
      this.datos.updated_at = new Date();
      await PROCESAR_FORMULARIO(this.coleccion, this.datos, this.campos, null);
      await this.$emit("registrado", true);
      this.dialog_form = !this.dialog_form;
      this.datos = { created_at: new Date(), updated_at: new Date() };
      const observer: any = this.$refs.observer;
      if (observer) {
        observer.reset();
      }
      this.cargando = !this.cargando;
    },
  },
  created() {
    this.campos = [];
    this.campos_form.forEach((campo: any) => this.campos.push(campo));
  },
});
</script>

<style scoped></style>
