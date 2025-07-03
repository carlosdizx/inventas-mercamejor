<template>
  <v-dialog v-model="dialogForm" persistent max-width="600">
    <v-btn color="red darken-4" dark @click="dialogForm = !dialogForm">
      <v-icon>mdi-close</v-icon>
    </v-btn>
    <template v-slot:activator="{ props }">
      <v-btn v-bind="props" small outlined dark fab color="amber">
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
    </template>
    <v-card class="py-2">
      <v-card-text>
        <h1 class="text-center my-3">
          Formulario de edición para {{ titulo }}
        </h1>
        <VeeForm @submit="actualizarDatos" v-slot="{ errors }">
          <v-form
            class="my-2"
            :disabled="cargando"
            autocomplete="off"
            @submit.prevent="actualizarDatos"
          >
            <div v-for="(campo, index) in campos" :key="index">
              <Field
                v-slot="{ errors }"
                :name="campo.name"
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
                  :error-messages="errors"
                  v-model="datos[campo.name]"
                />
              </Field>

              <!-- Campo type 2 - v-combobox -->
              <Field
                v-else-if="campo.type === 2"
                :name="campo.name"
                :rules="campo.rules"
                v-slot="{ field, errors }"
              >
                <v-combobox
                  v-bind="field"
                  :label="campo.label"
                  :prepend-icon="campo.prepend_icon"
                  :items="campo.items"
                  :item-title="campo.llave"
                  :multiple="campo.multiple"
                  hide-selected
                  small-chips
                  dense
                  outlined
                  :error-messages="errors"
                  v-model="datos[campo.name]"
                  @change="(val) => validarCombo(val, item, campo)"
                />
              </Field>

              <!-- Campo type 3 - v-textarea -->
              <Field
                v-else-if="campo.type === 3"
                :name="campo.name"
                :rules="campo.rules"
                v-slot="{ field, errors }"
              >
                <v-textarea
                  v-bind="field"
                  outlined
                  :label="campo.label"
                  :prepend-icon="campo.prepend_icon"
                  dense
                  counter
                  :error-messages="errors"
                  v-model="datos[campo.name]"
                />
              </Field>

              <!-- Campo type 4 - v-switch -->
              <Field
                v-else-if="campo.type === 4"
                :name="campo.name"
                :rules="campo.rules"
                v-slot="{ field, errors }"
              >
                <v-switch
                  v-bind="field"
                  color="deep-purple"
                  inset
                  :label="campo.label"
                  :error-messages="errors"
                  v-model="datos[campo.name]"
                />
              </Field>

              <!-- Campo type 5 - v-radio-group -->
              <Field
                v-else-if="campo.type === 5"
                :name="campo.name"
                :rules="campo.rules"
                v-slot="{ field, errors }"
              >
                <v-radio-group
                  v-bind="field"
                  :label="campo.label"
                  row
                  :error-messages="errors"
                  v-model="datos[campo.name]"
                >
                  <br />
                  <v-radio
                    v-for="dato in campo.options"
                    :key="dato.value"
                    :label="dato.label"
                    :value="dato.value"
                  />
                </v-radio-group>
              </Field>

              <!-- Campo type 6 - v-select -->
              <Field
                v-else-if="campo.type === 6"
                :name="campo.name"
                :rules="campo.rules"
                v-slot="{ errors }"
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
                  :error-messages="errors"
                  v-model="datos[campo.name]"
                />
              </Field>

              <!-- Campo type 7 - v-slider -->
              <Field
                v-else-if="campo.type === 7"
                :name="campo.name"
                :rules="campo.rules"
                v-slot="{ field, errors }"
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
                  v-model="datos[campo.name]"
                />
              </Field>

              <!-- Campo type 8 - vuetify-money -->
              <Field
                v-else-if="campo.type === 8"
                :name="campo.name"
                :rules="campo.rules"
                v-slot="{ errors }"
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
              </Field>

              <!-- Campo type 9 - v-combobox with v-select -->
              <Field
                v-else-if="campo.type === 9"
                :name="campo.name"
                :rules="campo.rules"
                v-slot="{ errors }"
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
                  :error-messages="errors"
                  v-model="datos[campo.name]"
                  @update:model-value="(val) => validarCombo(val, item, campo)"
                />
                <v-select
                  :label="campo.label2"
                  prepend-icon="mdi-format-list-bulleted"
                  :items="campo.items2"
                  dense
                  outlined
                  small-chips
                  :error-messages="errors"
                  v-model="datos[campo.name2]"
                />
              </Field>

              <!-- Campo type 10 - v-file-input -->
              <Field
                v-else-if="campo.type === 10"
                :name="campo.name"
                :rules="campo.rules"
                v-slot="{ field, errors }"
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
                  :error-messages="errors"
                  v-model="datos[campo.name]"
                />
              </Field>
            </div>
            <v-btn
              block
              color="primary"
              :disabled="Object.keys(errors).length > 0 || cargando"
              type="submit"
              :loading="cargando"
            >
              Actualizar <v-icon>mdi-database-edit</v-icon>
            </v-btn>
          </v-form>
        </VeeForm>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";
import { Form, Field, useForm } from "vee-validate";
import Swal from "sweetalert2";

import {
  VALIDAR_CAMPO,
  VALIDAR_COMBO
} from "@/generals/validaciones";
import {
  CAPTURAR_CAMPOS,
  PROCESAR_FORMULARIO
} from "@/generals/procesamientos";

const props = defineProps({
  titulo: String,
  campos_form: Array,
  coleccion: String,
  item: Object,
  validaciones: Array,
});

const emit = defineEmits(["actualizado"]);

const dialogForm = ref(false);
const cargando = ref(false);
const campos = ref([]);
const datos = ref({});
const validados = ref([]);

const { handleSubmit, isSubmitting } = useForm();

const inicializarForm = () => {
  campos.value = [...props.campos_form];
  campos.value.forEach((campo) => {
    datos.value["created_at"] = props.item["created_at"];
    datos.value["id"] = props.item["id"];
    if (campo.type === 9) {
      datos.value[campo.name] = props.item[campo.name];
      datos.value[campo.name2] = props.item[campo.name2];
      datos.value["items2"] = datos.value[campo.name][campo.llave2];
    } else {
      datos.value[campo.name] = props.item[campo.name];
    }
  });
};

const validarCombo = async (modelo, item, campo) => {
  if (campo.validacion) {
    item[campo.name] = await VALIDAR_COMBO(modelo, campo.items);
    if (campo.type === 9) {
      campo.items2 = item[campo.name][campo.llave2];
    }
  }
};

const mensajeValidaciones = async () => {
  return validados.value.map((v) => `${v}<br/>`).join("");
};

const preSubmit = async () => {
  validados.value = [];
  if (props.validaciones) {
    for (const validacion of props.validaciones) {
      const resultado = await VALIDAR_CAMPO(
        datos.value,
        validacion,
        props.coleccion,
        true
      );
      if (resultado !== "") {
        validados.value.push(resultado);
      }
    }
  }
};

const actualizarDatos = handleSubmit(async () => {
  cargando.value = true;
  datos.value = await CAPTURAR_CAMPOS(datos.value, campos.value);
  datos.value.created_at = new Date();
  await preSubmit();

  if (validados.value.length > 0) {
    cargando.value = false;
    return await Swal.fire(
      "Campos incorrectos",
      await mensajeValidaciones(),
      "error"
    );
  }

  await PROCESAR_FORMULARIO(
    props.coleccion,
    datos.value,
    campos.value,
    props.item
  );
  emit("actualizado", true);
  cargando.value = false;
  dialogForm.value = false;
});

onMounted(() => {
  inicializarForm();
});
</script>

<style scoped></style>
