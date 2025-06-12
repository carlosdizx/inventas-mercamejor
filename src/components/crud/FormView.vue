<template>
  <v-dialog v-model="dialog_edit" persistent max-width="600">
    <v-btn color="red darken-4" dark @click="dialog_edit = !dialog_edit">
      <v-icon>mdi-close</v-icon>
    </v-btn>
    <template #activator="{ props }">
      <v-btn small outlined dark fab color="indigo" v-bind="props">
        <v-icon>mdi-eye</v-icon>
      </v-btn>
    </template>
    <v-card class="py-2">
      <v-card-text>
        <h1 class="text-center my-3">Formulario de visualización</h1>
        <v-tooltip color="warning">
          <template #activator="{ props }">
            <span v-bind="props">
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
                    :model-value="datos[campo.name] || ''"
                  />
                  <v-combobox
                    v-if="campo.type === 2"
                    :label="campo.label"
                    :prepend-icon="campo.prepend_icon"
                    :items="campo.items || []"
                    :item-text="campo.llave"
                    :multiple="campo.multiple"
                    readonly
                    hide-selected
                    small-chips
                    dense
                    outlined
                    :model-value="datos[campo.name] || []"
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
                      :item-text="campo.llave || 'text'"
                      :item-value="campo.llave2 || 'value'"
                      :multiple="campo.multiple"
                      hide-selected
                      small-chips
                      dense
                      outlined
                      readonly
                      :model-value="getDisplayValue(datos[campo.name], campo.llave)"
                    />
                    <v-select
                      :label="campo.label2"
                      prepend-icon="mdi-format-list-bulleted"
                      :items="datos['items2']"
                      :item-text="campo.llave2 || 'text'"
                      :item-value="campo.llave2 || 'value'"
                      dense
                      outlined
                      small-chips
                      readonly
                      :model-value="campo.name2 ? getDisplayValue(datos[campo.name2], campo.llave2) : null"
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
import { defineComponent, ref, watch, PropType } from "vue";

interface FormField {
  type: number;
  name: string;
  name2?: string;
  label: string;
  label2?: string;
  prepend_icon?: string;
  format?: string;
  readOnly?: boolean;
  items?: any[];
  items2?: any[];
  llave?: string;
  llave2?: string;
  multiple?: boolean;
  solo?: boolean;
  options?: { label: string; value: string | number }[];
  step?: number;
  min?: number;
  max?: number;
  model?: any;
  model2?: any;
  validacion?: boolean;
}

export default defineComponent({
  name: "FormView",
  props: {
    campos_form: {
      type: Array as PropType<FormField[]>,
      required: true,
      default: () => []
    },
    item: {
      type: Object as PropType<Record<string, any>>,
      required: true,
      default: () => ({})
    }
  },
  setup(props) {
    const dialog_edit = ref(false);
    const cargando = ref(false);
    const campos = ref<FormField[]>([]);
    const datos = ref<Record<string, any>>({});

    const getDisplayValue = (value: any, llave?: string) => {
      if (!value) return null;
      if (typeof value === 'object') {
        return llave ? value[llave] : value.text || value.label || value.name || JSON.stringify(value);
      }
      return value;
    };

    const inicializarForm = () => {
      if (Array.isArray(props.campos_form)) {
        campos.value = [...props.campos_form];
      }
      if (props.item) {
        datos.value = { ...props.item };
      }
    };

    watch(() => props.item, (newVal) => {
      if (newVal) {
        datos.value = { ...newVal };
      }
    }, { immediate: true });

    watch(() => props.campos_form, (newVal) => {
      if (Array.isArray(newVal)) {
        campos.value = [...newVal];
      }
    }, { immediate: true });

    return {
      dialog_edit,
      cargando,
      campos,
      datos,
      getDisplayValue
    };
  }
});
</script>

<style scoped></style>
