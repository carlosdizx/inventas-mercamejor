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
        <h3 class="text-center my-3">Código de seguridad: {{ item.id }}</h3>
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
                  :readonly="campo.readOnly"
                  :disabled="campo.readOnly"
                  :hint="campo.readOnly ? '**No editable**' : ''"
                  persistent-hint
                  dense
                  outlined
                  counter
                  v-model="datos[campo.name]"
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
                  :readonly="campo.readOnly"
                  :disabled="campo.readOnly"
                  hide-selected
                  small-chips
                  dense
                  outlined
                  v-model="datos[campo.name]"
                  :error-messages="errors"
                  @change="validarCombo(datos[campo.name], item, campo)"
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
                  :readonly="campo.readOnly"
                  :disabled="campo.readOnly"
                  dense
                  counter
                  v-model="datos[campo.name]"
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
                  v-model="datos[campo.name]"
                  :readonly="campo.readOnly"
                  :disabled="campo.readOnly"
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
                  v-model="datos[campo.name]"
                  :error-messages="errors"
                  :readonly="campo.readOnly"
                  :disabled="campo.readOnly"
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
                  :readonly="campo.readOnly"
                  :disabled="campo.readOnly"
                  counter
                  outlined
                  dense
                  v-model="datos[campo.name]"
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
                  v-model="datos[campo.name]"
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
                  :error-messages="errors"
                  v-model="datos[campo.name]"
                />
              </validation-provider>
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
                  v-model="datos[campo.name]"
                  :error-messages="errors"
                  @change="validarCombo(datos[campo.name], item, campo)"
                />
                <v-select
                  :label="campo.label2"
                  prepend-icon="mdi-format-list-bulleted"
                  :items="datos['items2']"
                  dense
                  outlined
                  small-chips
                  v-model="datos[campo.name2]"
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
import {
  CAPTURAR_CAMPOS,
  PROCESAR_FORMULARIO,
} from "@/generals/procesamientos";

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
      this.campos.map((campo) => {
        this.datos["created_at"] = this.item["created_at"];
        if (campo.type === 9) {
          this.datos[campo.name] = this.item[campo.name];
          this.datos[campo.name2] = this.item[campo.name2];
          this.datos["items2"] = this.datos[campo.name][campo.llave2];
        } else {
          this.datos[campo.name] = this.item[campo.name];
        }
      });
    },
    async validarCombo(modelo, item, campo) {
      if (campo.validacion) {
        item[campo.name] = await VALIDAR_COMBO(modelo, campo.items);
        if (campo.type === 9) {
          campo.items2 = item[campo.name][campo.llave2];
        }
      }
    },
    async actulizarDatos() {
      this.cargando = !this.cargando;
      this.datos.updated_at = new Date();
      await PROCESAR_FORMULARIO(
        this.coleccion,
        this.datos,
        this.campos,
        this.item
      );
      await this.$emit("actualizado", true);
      this.cargando = !this.cargando;
      this.dialog_form = !this.dialog_form;
    },
  },
  async created() {
    await this.inicializarForm();
  },
});
</script>

<style scoped></style>
