<template>
  <v-dialog v-model="dialog_details" persistent max-width="600">
    <v-btn color="red darken-4" dark @click="dialog_details = !dialog_details">
      <v-icon>mdi-close</v-icon>
    </v-btn>
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        fab
        small
        color="info darken-3"
        @click="cargarInformacion"
        v-bind="attrs"
        v-on="on"
        outlined
      >
        <v-icon>mdi-eye</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-list>
        <v-subheader>Detalle</v-subheader>
        <v-list-item-group>
          <v-list-item v-for="(item, index) in llaves" :key="index">
            <div v-if="typeof valores[index] === 'object'">
              {{ item }}:
              <div
                :key="subIndex"
                v-for="(subItem, subIndex) in valores[index]"
              >
                <div v-if="typeof subItem !== 'string'">
                  {{ formaterObjetos(subItem, item) }}
                </div>
                <div v-if="typeof subItem === 'string'">- {{ subItem }}</div>
              </div>
            </div>
            <div v-else-if="typeof valores[index] !== 'object'">
              {{ item }}: {{ valores[index] }}
            </div>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-card>
    <v-btn color="red darken-4" dark @click="dialog_details = !dialog_details">
      <v-icon>mdi-close</v-icon>
    </v-btn>
  </v-dialog>
</template>

<script>
export default {
  name: "Detail",
  data: () => ({
    dialog_details: false,
    llaves: [],
    valores: [],
  }),
  props: {
    campos_detalle: Array,
    objeto: Object,
  },
  methods: {
    async cargarInformacion() {
      this.llaves = Object.keys(this.objeto);
      this.llaves.forEach((llave, index) => {
        this.campos_detalle.forEach((detail) => {
          if (llave === detail.value) {
            this.llaves[index] = detail.text;
          }
        });
      });
      this.valores = Object.values(this.objeto);
    },
    formaterObjetos(subItem, key) {
      let respuesta = "";
      this.campos_detalle.forEach((campo) => {
        if (campo.key && campo.text === key) {
          respuesta = "- " + subItem[campo.key];
        }
      });
      return respuesta;
    },
  },
  created() {
    this.cargarInformacion();
  },
};
</script>

<style scoped></style>
