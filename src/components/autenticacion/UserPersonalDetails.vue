<template>
  <v-card-text>
    <ValidationObserver ref="observer" v-slot="{ invalid }">
      <v-form
        class="my-2"
        @submit.prevent="cambiarEtapa(2)"
        :disabled="cargando"
      >
        <validation-provider
          v-slot="{ errors }"
          name="Nombre completo"
          rules="required|min:2|max:80"
        >
          <v-text-field
            outlined
            dense
            label="Nombre completo"
            prepend-icon="mdi-account"
            counter
            :error-messages="errors"
            v-model="datos.nombre"
          />
        </validation-provider>
        <validation-provider
          v-slot="{ errors }"
          name="Documento de identidad"
          rules="required|min:2|max:25"
        >
          <v-text-field
            outlined
            dense
            label="Documento de idnetidad"
            prepend-icon="mdi-account"
            counter
            :error-messages="errors"
            v-model="datos.documento"
          />
        </validation-provider>
        <v-chip v-if="invalid" class="ma-2" color="amber lighten-2">
          Complete los campos solicitados <v-icon>mdi-alert</v-icon>
        </v-chip>
        <v-btn
          block
          color="primary"
          :disabled="invalid || cargando"
          type="submit"
          :loading="cargando"
        >
          Continuar <v-icon>mdi-arrow-right</v-icon>
        </v-btn>
      </v-form>
    </ValidationObserver>
  </v-card-text>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "UserPersonalDetails",
  data: () => ({
    cargando: false,
    datos: {},
  }),
  methods: {
    cambiarEtapa(etapa: number) {
      this.$emit("etapa", etapa);
      this.$emit("datos", this.datos);
    },
  },
});
</script>

<style scoped></style>
