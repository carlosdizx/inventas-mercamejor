<template>
  <div>
    <v-dialog v-model="dialog_form" max-width="800px">
      <v-card>
        <v-card-title>
          <span class="text-h5">{{ titulo }}</span>
        </v-card-title>

        <v-card-text>
          <v-container>
            <v-form @submit.prevent="actualizarDatos">
              <v-row>
                <v-col cols="12" sm="6" md="4" v-for="campo in campos" :key="campo.name">
                  <v-text-field
                    v-if="campo.type === 'text'"
                    v-model="datos[campo.name]"
                    :label="campo.label"
                    :disabled="campo.disabled"
                    :readonly="campo.readonly"
                    :hint="campo.hint"
                    persistent-hint
                  ></v-text-field>

                  <v-textarea
                    v-else-if="campo.type === 'textarea'"
                    v-model="datos[campo.name]"
                    :label="campo.label"
                    :disabled="campo.disabled"
                    :readonly="campo.readonly"
                    :hint="campo.hint"
                    persistent-hint
                  ></v-textarea>

                  <v-select
                    v-else-if="campo.type === 'select'"
                    v-model="datos[campo.name]"
                    :items="campo.items"
                    :label="campo.label"
                    :disabled="campo.disabled"
                    :readonly="campo.readonly"
                    :hint="campo.hint"
                    persistent-hint
                  ></v-select>

                  <v-checkbox
                    v-else-if="campo.type === 'checkbox'"
                    v-model="datos[campo.name]"
                    :label="campo.label"
                    :disabled="campo.disabled"
                    :readonly="campo.readonly"
                    :hint="campo.hint"
                    persistent-hint
                  ></v-checkbox>

                  <v-switch
                    v-else-if="campo.type === 'switch'"
                    v-model="datos[campo.name]"
                    :label="campo.label"
                    :disabled="campo.disabled"
                    :readonly="campo.readonly"
                    :hint="campo.hint"
                    persistent-hint
                  ></v-switch>

                  <v-date-picker
                    v-else-if="campo.type === 'date'"
                    v-model="datos[campo.name]"
                    :label="campo.label"
                    :disabled="campo.disabled"
                    :readonly="campo.readonly"
                    :hint="campo.hint"
                    persistent-hint
                  ></v-date-picker>

                  <v-text-field
                    v-else-if="campo.type === 'time'"
                    v-model="datos[campo.name]"
                    :label="campo.label"
                    type="time"
                    :disabled="campo.disabled"
                    :readonly="campo.readonly"
                    :hint="campo.hint"
                    persistent-hint
                  ></v-text-field>

                  <v-file-input
                    v-else-if="campo.type === 'file'"
                    v-model="datos[campo.name]"
                    :label="campo.label"
                    :disabled="campo.disabled"
                    :readonly="campo.readonly"
                    :hint="campo.hint"
                    persistent-hint
                  ></v-file-input>

                  <v-color-picker
                    v-else-if="campo.type === 'color'"
                    v-model="datos[campo.name]"
                    :label="campo.label"
                    :disabled="campo.disabled"
                    :readonly="campo.readonly"
                    :hint="campo.hint"
                    persistent-hint
                  ></v-color-picker>

                  <v-slider
                    v-else-if="campo.type === 'slider'"
                    v-model="datos[campo.name]"
                    :label="campo.label"
                    :disabled="campo.disabled"
                    :readonly="campo.readonly"
                    :hint="campo.hint"
                    persistent-hint
                  ></v-slider>

                  <v-range-slider
                    v-else-if="campo.type === 'range-slider'"
                    v-model="datos[campo.name]"
                    :label="campo.label"
                    :disabled="campo.disabled"
                    :readonly="campo.readonly"
                    :hint="campo.hint"
                    persistent-hint
                  ></v-range-slider>

                  <v-autocomplete
                    v-else-if="campo.type === 'autocomplete'"
                    v-model="datos[campo.name]"
                    :items="campo.items"
                    :label="campo.label"
                    :disabled="campo.disabled"
                    :readonly="campo.readonly"
                    :hint="campo.hint"
                    persistent-hint
                  ></v-autocomplete>

                  <v-combobox
                    v-else-if="campo.type === 'combobox'"
                    v-model="datos[campo.name]"
                    :items="campo.items"
                    :label="campo.label"
                    :disabled="campo.disabled"
                    :readonly="campo.readonly"
                    :hint="campo.hint"
                    persistent-hint
                  ></v-combobox>

                  <v-radio-group
                    v-else-if="campo.type === 'radio'"
                    v-model="datos[campo.name]"
                    :label="campo.label"
                    :disabled="campo.disabled"
                    :readonly="campo.readonly"
                    :hint="campo.hint"
                    persistent-hint
                  >
                    <v-radio
                      v-for="item in campo.items"
                      :key="item.value"
                      :label="item.text"
                      :value="item.value"
                    ></v-radio>
                  </v-radio-group>
                </v-col>
              </v-row>
            </v-form>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog_form = false">
            Cancelar
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="actualizarDatos"
            :loading="cargando"
            :disabled="cargando"
          >
            Guardar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, PropType } from 'vue';
import { useField, useForm } from 'vee-validate';
import { GUARDAR } from "@/services/crud";
import { VALIDAR_COMBO } from "@/generals/validaciones";
import Swal from "sweetalert2";

export default defineComponent({
  name: "FormEdit",
  props: {
    titulo: {
      type: String,
      required: true
    },
    campos_form: {
      type: Array as PropType<any[]>,
      required: true
    },
    coleccion: {
      type: String,
      required: true
    },
    item: {
      type: Object as PropType<any>,
      required: true
    },
    validaciones: {
      type: Object as PropType<any>,
      default: () => ({})
    }
  },
  emits: ['actualizado'],
  setup(props, { emit }) {
    const dialog_form = ref(false);
    const cargando = ref(false);
    const campos = ref<any[]>([]);
    const datos = ref<any>({});
    const validados = ref<any>({});

    const { handleSubmit, resetForm } = useForm();

    const inicializarForm = () => {
      campos.value = props.campos_form;
      datos.value = { ...props.item };
      validados.value = { ...props.validaciones };
    };

    const validarCombo = async (modelo: any, item: any, campo: any) => {
      if (campo.validacion) {
        item[campo.name] = await VALIDAR_COMBO(modelo, campo.items);
      }
    };

    const mensajeValidaciones = () => {
      let mensaje = "";
      for (const key in validados.value) {
        if (validados.value[key]) {
          mensaje += validados.value[key] + "\n";
        }
      }
      return mensaje;
    };

    const preSubmit = async () => {
      for (const campo of campos.value) {
        if (campo.validacion) {
          await validarCombo(datos.value, datos.value, campo);
        }
      }
    };

    const actualizarDatos = handleSubmit(async () => {
      try {
        cargando.value = true;
        await preSubmit();
        const mensaje = mensajeValidaciones();
        if (mensaje) {
          Swal.fire({
            title: "Error",
            text: mensaje,
            icon: "error"
          });
          return;
        }
        await GUARDAR(props.coleccion, datos.value);
        emit('actualizado');
        dialog_form.value = false;
        resetForm();
        Swal.fire({
          title: "Éxito",
          text: "Datos actualizados correctamente",
          icon: "success"
        });
      } catch (error) {
        console.error('Error updating data:', error);
        Swal.fire({
          title: "Error",
          text: "Error al actualizar los datos",
          icon: "error"
        });
      } finally {
        cargando.value = false;
      }
    });

    onMounted(() => {
      inicializarForm();
    });

    return {
      dialog_form,
      cargando,
      campos,
      datos,
      validados,
      actualizarDatos
    };
  }
});
</script>

<style scoped></style>
