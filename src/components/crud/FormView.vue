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
        <h3 class="text-center my-3">Código de seguridad: {{ item.id }}</h3>
        <v-tooltip color="warning">
          <template v-slot:activator="{ on, attrs }">
            <span v-bind="attrs" v-on="on">
              <ValidationObserver ref="observer">
                <v-form class="my-2" autocomplete="off" @submit.prevent="">
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
                        persistent-hint
                        dense
                        outlined
                        counter
                        readonly
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
                        readonly
                        v-model="item[campo.name]"
                        :error-messages="errors"
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
                        readonly
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
                        readonly
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
                        readonly
                        outlined
                        dense
                        v-model="item[campo.name]"
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
                        :min="campo.min"
                        :max="campo.max"
                        thumb-label
                        ticks
                        :error-messages="errors"
                        v-model="item[campo.name]"
                      />
                    </validation-provider>
                  </div>
                </v-form>
              </ValidationObserver>
            </span>
          </template>
          <h1>No se puede editar, solo para visualización</h1>
        </v-tooltip>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  name: "FormView",
  data: () => ({
    dialog_edit: false,
    cargando: false,
    campos: [...[]],
    datos: {},
  }),
  props: {
    campos_form: Array,
    item: Object,
  },
  methods: {
    async inicializarForm() {
      this.campos = [...this.campos_form];
    },
  },
  async created() {
    await this.inicializarForm();
  },
});
</script>

<style scoped></style>
