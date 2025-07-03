<template>
  <v-dialog v-model="dialog_form" persistent max-width="600">
    <v-btn color="red darken-4" dark @click="dialog_form = !dialog_form">
      <v-icon>mdi-close</v-icon>
    </v-btn>
    <template v-slot:activator="{ props }">
      <v-btn fab color="info darken-3" small v-bind="props">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </template>
    <v-card class="py-2">
      <v-card-text>
        <h1 class="text-center my-3"> 
          Formulario de creación para {{ titulo }}
        </h1>
        <VeeForm @submit="registrarDatos" v-slot="{ errors }">
          <v-form
            class="my-2"
            :disabled="cargando"
            autocomplete="off"
            @submit.prevent="registrarDatos"
          >
            <div v-for="(campo, index) in campos" :key="index">
              <VeeField
                v-slot="{ field, errors }"
                :name="campo.label"
                :rules="campo.rules"
                v-if="campo.type === 1"
              >
                <v-text-field
                  v-bind="field"
                  :label="campo.label"
                  :prepend-icon="campo.prepend_icon"
                  :type="campo.format"
                  dense
                  outlined
                  counter
                  :error-messages="errors"
                  v-model="campo.model"
                />
              </VeeField>
              <VeeField
                v-slot="{ errors }"
                :name="campo.label"
                :rules="campo.rules"
                v-if="campo.type === 2"
              >
                <v-combobox
                  v-model="campo.model"
                  :label="campo.label"
                  :prepend-icon="campo.prepend_icon"
                  :items="campo.items"
                  :item-title="campo.llave || 'title'"
                  :item-value="campo.llave || 'value'"
                  :multiple="campo.multiple"
                  hide-selected
                  small-chips
                  dense
                  outlined
                  :error-messages="errors"
                  @change="validarCombo(campo)"
                />
              </VeeField>
              <VeeField
                v-slot="{ field, errors }"
                :name="campo.label"
                :rules="campo.rules"
                v-if="campo.type === 3"
              >
                <v-textarea
                  v-bind="field"
                  outlined
                  :label="campo.label"
                  :prepend-icon="campo.prepend_icon"
                  dense
                  counter
                  v-model="campo.model"
                  :error-messages="errors"
                />
              </VeeField>
              <VeeField
                v-slot="{ field, errors }"
                :name="campo.label"
                :rules="campo.rules"
                v-if="campo.type === 4"
              >
                <v-switch
                  v-bind="field"
                  color="deep-purple"
                  inset
                  :label="campo.label"
                  v-model="campo.model"
                  :error-messages="errors"
                />
              </VeeField>
              <VeeField
                v-slot="{ field, errors }"
                :name="campo.label"
                :rules="campo.rules"
                v-if="campo.type === 5"
              >
                <v-radio-group
                  v-bind="field"
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
              </VeeField>
              <VeeField
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
              </VeeField>
              <VeeField
                v-slot="{ field, errors }"
                :name="campo.label"
                :rules="campo.rules"
                v-if="campo.type === 7"
              >
                <v-slider
                  v-bind="field"
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
              </VeeField>
              <VeeField
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
              </VeeField>
              <VeeField
                v-slot="{ errors }"
                :name="campo.label"
                :rules="campo.rules"
                v-if="campo.type === 9"
              >
                <v-combobox
                  :label="campo.label"
                  prepend-icon="mdi-format-list-bulleted"
                  :items="campo.items"
                  :item-title="campo.llave"
                  :item-value="campo.llave"
                  :multiple="campo.multiple"
                  hide-selected
                  small-chips
                  dense
                  outlined
                  v-model="campo.model"
                  :error-messages="errors"
                  @update:model-value="validarCombo(campo)"
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
              </VeeField>
              <VeeField
                v-slot="{ field, errors }"
                :name="campo.label"
                :rules="campo.rules"
                v-if="campo.type === 10"
              >
                <v-file-input
                  v-bind="field"
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
              </VeeField>
            </div>
            <v-btn
              block
              color="success"
              :disabled="Object.keys(errors).length > 0 || cargando"
              type="submit"
              :loading="cargando"
            >
              Registrarme <v-icon>mdi-database-plus</v-icon>
            </v-btn>
          </v-form>
        </VeeForm>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, PropType } from 'vue';
import { useForm } from 'vee-validate';
import { VALIDAR_COMBO, VALIDAR_CAMPO } from "@/generals/validaciones";
import { CAPTURAR_CAMPOS, PROCESAR_FORMULARIO } from "@/generals/procesamientos";
import { LISTAR_SUBCATEGORIAS } from "@/generals/Funciones";
import Swal from "sweetalert2";

interface FormFieldOption {
  label: string;
  value: string | number;
}

interface ComboboxItem {
  [key: string]: any;
  title: string;
  value: string | number;
}

interface FieldOptions {
  locale?: string;
  prefix?: string;
  suffix?: string;
  length?: number;
  precision?: number;
  decimal?: string;
  thousands?: string;
}

interface FormField {
  type: number;
  label: string;
  label2?: string;
  rules?: string;
  prepend_icon?: string;
  format?: string;
  model: any;
  model2?: any;
  items?: ComboboxItem[];
  items2?: ComboboxItem[];
  llave?: string;
  llave2?: string;
  multiple?: boolean;
  solo?: boolean;
  options?: FormFieldOption[];
  fieldOptions?: FieldOptions;
  step?: number;
  readOnly?: boolean;
  min?: number;
  max?: number;
  validacion?: boolean;
}

interface FormData {
  created_at: Date;
  updated_at: Date;
  [key: string]: any;
}

interface ValidationResult {
  isValid: boolean;
  message?: string;
}

export default defineComponent({
  name: "FormCreate",
  props: {
    titulo: {
      type: String,
      required: true
    },
    campos_form: {
      type: Array as PropType<FormField[]>,
      required: true
    },
    validaciones: {
      type: Array as PropType<{ tipo: number; nombres: string[] }[]>,
      default: () => []
    },
    coleccion: {
      type: String,
      required: true
    }
  },
  emits: ['registrado'],
  setup(props, { emit }) {
    const dialog_form = ref(false);
    const cargando = ref(false);
    const campos = ref<FormField[]>([]);
    const datos = ref<FormData>({
      created_at: new Date(),
      updated_at: new Date(),
    });
    const validados = ref<string[]>([]);

    const { handleSubmit, resetForm } = useForm();

    const validarCombo = async (campo: FormField): Promise<void> => {
      if (campo.validacion && campo.items) {
        try {
          if (campo.type === 9 && campo.llave2 && campo.model) {
            // Get subcategories directly from the selected category object
            if (campo.model.subcategories && Array.isArray(campo.model.subcategories)) {
              campo.items2 = campo.model.subcategories;
            } else {
              campo.items2 = [];
            }
            campo.model2 = null;
          }
        } catch (error) {
          console.error('Error validando combo:', error);
          campo.model = null;
          campo.model2 = null;
        }
      }
    };

    const mensajeValidaciones = async (): Promise<string> => {
      return validados.value.join("<br/>");
    };

    const preSubmit = async (): Promise<void> => {
      if (props.validaciones && props.validaciones.length > 0) {
        validados.value = [];
        for (const validacion of props.validaciones) {
          try {
            const resultado = await VALIDAR_CAMPO(
              datos.value,
              validacion,
              props.coleccion,
              false
            );
            if (resultado !== "") {
              validados.value.push(resultado);
            }
          } catch (error) {
            console.error('Error en validación:', error);
            validados.value.push('Error en la validación del campo');
          }
        }
      } else {
        validados.value = [];
      }
    };

    const registrarDatos = handleSubmit(async () => {
      try {
        cargando.value = true;
        datos.value = await CAPTURAR_CAMPOS(null, campos.value);
        await preSubmit();

        if (validados.value.length > 0) {
          await Swal.fire({
            title: "Campos incorrectos",
            html: await mensajeValidaciones(),
            icon: "error"
          });
          return;
        }

        // Reiniciar campos
        campos.value = [];
        props.campos_form.forEach((campo: FormField) => campos.value.push(campo));

        // Actualizar timestamps
        datos.value.created_at = new Date();
        datos.value.updated_at = new Date();

        // Procesar formulario
        await PROCESAR_FORMULARIO(props.coleccion, datos.value, campos.value, null);
        
        // Resetear y cerrar
        await emit("registrado", true);
        cargando.value = false;
        dialog_form.value = false;
        resetForm();
      } catch (error) {
        console.error('Error al registrar:', error);
        await Swal.fire({
          title: "Error",
          text: "Hubo un error al procesar el registro",
          icon: "error"
        });
      } finally {
        cargando.value = false;
      }
    });

    onMounted(() => {
      campos.value = [];
      props.campos_form.forEach((campo: FormField) => campos.value.push(campo));
    });

    return {
      dialog_form,
      cargando,
      campos,
      datos,
      validados,
      validarCombo,
      mensajeValidaciones,
      preSubmit,
      registrarDatos
    };
  }
});
</script>
