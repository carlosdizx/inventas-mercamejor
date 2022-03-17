<template>
  <v-dialog v-model="dialog_edit" persistent max-width="600">
    <v-btn color="red darken-4" dark @click="dialog_edit = !dialog_edit">
      <v-icon>mdi-close</v-icon>
    </v-btn>
    <template v-slot:activator="{ on, attrs }">
      <v-btn small outlined dark fab color="amber" v-bind="attrs" v-on="on">
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
    </template>
    <v-card class="py-2">
      <v-card-text>
        <h1 class="text-center my-3">
          Formulario de edición para {{ titulo }}
        </h1>
        <h6 v-if="item">{{ item.id }}</h6>
        <ValidationObserver ref="observer" v-slot="{ invalid }">
          <v-form
            class="my-2"
            :disabled="cargando"
            autocomplete="off"
            @submit.prevent="actulizarDatos"
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
                  v-model="item[campo.name]"
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
                  v-model="item[campo.name]"
                  :error-messages="errors"
                  @change="validarCombo(item[campo.name])"
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
                  v-model="item[campo.name]"
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
                  v-model="item[campo.name]"
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
                  v-model="item[campo.name]"
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
                  v-model="item[campo.name]"
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
              Actualizar <v-icon>mdi-database-edit</v-icon>
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
import { CAPTURAR_CAMPOS } from "@/generals/procesamientos";
import { EDITAR } from "@/services/crud";
import Swal from "sweetalert2";

export default Vue.extend({
  name: "FormEdit",
  data: () => ({
    dialog_edit: false,
    cargando: false,
    campos: [...[]],
    datos: {},
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
    },
    validarCombo(modelo) {
      modelo = VALIDAR_COMBO(modelo);
    },
    async capturarCampos() {
      this.datos = await CAPTURAR_CAMPOS(this.item, this.campos);
    },
    async actulizarDatos() {
      this.cargando = !this.cargando;
      await this.capturarCampos();
      await EDITAR(this.coleccion, this.item.id, this.datos);
      await this.$emit("actualizado", true);
      this.dialog_edit = !this.dialog_edit;
      await this.inicializarForm();
      await Swal.fire({
        title: "Registro exitoso",
        html: "Datos registrados",
        icon: "success",
        showConfirmButton: false,
        timer: 1000,
      });
      this.cargando = !this.cargando;
    },
  },
  async created() {
    await this.inicializarForm();
  },
});
</script>

<style scoped></style>
