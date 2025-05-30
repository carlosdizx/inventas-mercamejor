<template>
  <v-dialog v-model="dialog_edit" persistent max-width="600">
    <v-btn color="red darken-4" dark @click="dialog_edit = !dialog_edit">
      <v-icon>mdi-close</v-icon>
    </v-btn>
    <template v-slot:activator="{ on, attrs }">
      <v-btn small outlined dark fab color="indigo" v-bind="attrs" v-on="on">
        <v-icon>mdi-eye</v-icon>
      </v-btn>
    </template>
    <v-card class="py-2">
      <v-card-text>
        <h1 class="text-center my-3">Formulario de visualización</h1>
        <v-tooltip color="warning">
          <template v-slot:activator="{ on, attrs }">
            <span v-bind="attrs" v-on="on">
              <v-form class="my-2" autocomplete="off" @submit.prevent="">
                <div v-for="(campo, index) in campos" :key="index">
                  <v-text-field
                    v-if="campo.type === 1"
                    :label="campo.label"
                    :prepend-icon="campo.prepend_icon"
                    :type="campo.format"
                    :hint="campo.readOnly ? '**No editable**' : ''"
                    persistent-hint
                    readonly
                    dense
                    outlined
                    counter
                    v-model="datos[campo.name]"
                  />
                  <v-combobox
                    v-if="campo.type === 2"
                    :label="campo.label"
                    :prepend-icon="campo.prepend_icon"
                    :items="campo.items"
                    :item-text="campo.llave"
                    :multiple="campo.multiple"
                    readonly
                    hide-selected
                    small-chips
                    dense
                    outlined
                    v-model="datos[campo.name]"
                  />
                  <v-textarea
                    v-if="campo.type === 3"
                    outlined
                    :label="campo.label"
                    :prepend-icon="campo.prepend_icon"
                    readonly
                    dense
                    counter
                    v-model="datos[campo.name]"
                  />
                  <v-switch
                    v-if="campo.type === 4"
                    color="deep-purple"
                    inset
                    :label="campo.label"
                    v-model="datos[campo.name]"
                    readonly
                  />
                  <v-radio-group
                    v-if="campo.type === 5"
                    :label="campo.label"
                    row
                    v-model="datos[campo.name]"
                    readonly
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
                    :multiple="campo.multiple"
                    :solo="campo.solo"
                    readonly
                    counter
                    outlined
                    dense
                    v-model="datos[campo.name]"
                  />
                  <v-slider
                    v-if="campo.type === 7"
                    :label="campo.label"
                    :step="campo.step"
                    readonly
                    :min="campo.min"
                    :max="campo.max"
                    thumb-label
                    ticks
                    v-model="datos[campo.name]"
                  />
                  <vuetify-money
                    v-if="campo.type === 8"
                    :label="campo.label"
                    :prepend-icon="campo.prepend_icon"
                    :type="campo.format"
                    dense
                    outlined
                    counter
                    v-model="datos[campo.name]"
                  />
                  <div v-if="campo.type === 9">
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
                      readonly
                      v-model="datos[campo.name]"
                    />
                    <v-select
                      :label="campo.label2"
                      prepend-icon="mdi-format-list-bulleted"
                      :items="datos['items2']"
                      dense
                      outlined
                      small-chips
                      readonly
                      v-model="datos[campo.name2]"
                    />
                  </div>
                  <v-file-input
                    v-if="campo.type === 10"
                    :label="campo.label"
                    :prepend-icon="campo.prepend_icon"
                    dense
                    outlined
                    counter
                    show-size
                    accept="image/*,.pdf"
                    v-model="campo.model"
                  />
                </div>
              </v-form>
            </span>
          </template>
          <h1>No se puede editar, solo para visualización</h1>
        </v-tooltip>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";

export default defineComponent({
  name: "FormView",
  props: {
    campos_form: {
      type: Array,
      required: true
    },
    item: {
      type: Object,
      required: true,
      default: () => ({})
    }
  },
  setup(props) {
    const dialog_edit = ref(false);
    const cargando = ref(false);
    const campos = ref([]);
    const datos = ref({});

    const inicializarForm = () => {
      campos.value = [...props.campos_form];
      datos.value = { ...props.item };
    };

    watch(() => props.item, (newVal) => {
      if (newVal) {
        datos.value = { ...newVal };
      }
    }, { immediate: true });

    watch(() => props.campos_form, (newVal) => {
      if (newVal) {
        campos.value = [...newVal];
      }
    }, { immediate: true });

    return {
      dialog_edit,
      cargando,
      campos,
      datos,
      inicializarForm
    };
  }
});
</script>

<style scoped></style>
