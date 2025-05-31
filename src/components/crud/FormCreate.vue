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
                  v-model="campo.model"
                  :error-messages="errors"
                />
              </VeeField>
              <VeeField
                v-slot="{ field, errors }"
                :name="campo.label"
                :rules="campo.rules"
                v-if="campo.type === 2"
              >
                <v-combobox
                  v-bind="field"
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
                v-slot="{ field, errors }"
                :name="campo.label"
                :rules="campo.rules"
                v-if="campo.type === 6"
              >
                <v-select
                  v-bind="field"
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
                v-slot="{ field, errors }"
                :name="campo.label"
                :rules="campo.rules"
                v-if="campo.type === 8"
              >
                <vuetify-money
                  v-bind="field"
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
                v-slot="{ field, errors }"
                :name="campo.label"
                :rules="campo.rules"
                v-if="campo.type === 9"
              >
                <v-combobox
                  v-bind="field"
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
import Swal from "sweetalert2";

export default defineComponent({
  name: "FormCreate",
  props: {
    titulo: {
      type: String,
      required: true
    },
    campos_form: {
      type: Array,
      required: true
    },
    validaciones: {
      type: Array,
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
    const campos = ref([{}]);
    const datos = ref({
      created_at: new Date(),
      updated_at: new Date(),
    });
    const validados = ref([""]);

    const { handleSubmit, resetForm } = useForm();

    const validarCombo = async (campo: any) => {
      if (campo.validacion) {
        campo.model = await VALIDAR_COMBO(campo.model, campo.items);
        if (campo.type === 9) {
          campo.items2 = campo.model[campo.llave2];
        }
      }
    };

    const mensajeValidaciones = async () => {
      let msg = "";
      validados.value.forEach((valid) => (msg += valid + "<br/>"));
      return msg;
    };

    const preSubmit = async () => {
      if (props.validaciones) {
        validados.value = [];
        for (const validacion of props.validaciones) {
          const resultado = await VALIDAR_CAMPO(
            datos.value,
            validacion,
            props.coleccion,
            false
          );
          if (resultado !== "") {
            validados.value.push(resultado);
          }
        }
      } else {
        validados.value = [];
      }
    };

    const registrarDatos = handleSubmit(async () => {
      cargando.value = !cargando.value;
      datos.value = await CAPTURAR_CAMPOS(null, campos.value);
      await preSubmit();
      if (validados.value.length > 0) {
        cargando.value = !cargando.value;
        return await Swal.fire(
          "Campos incorrectos",
          await mensajeValidaciones(),
          "error"
        );
      }
      campos.value = [];
      props.campos_form.forEach((campo: any) => campos.value.push(campo));
      datos.value.created_at = new Date();
      datos.value.updated_at = new Date();
      await PROCESAR_FORMULARIO(props.coleccion, datos.value, campos.value, null);
      await emit("registrado", true);
      dialog_form.value = !dialog_form.value;
      datos.value = { created_at: new Date(), updated_at: new Date() };
      resetForm();
      cargando.value = !cargando.value;
    });

    onMounted(() => {
      campos.value = [];
      props.campos_form.forEach((campo: any) => campos.value.push(campo));
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

<style scoped></style>
