<template>
  <div>
    <v-dialog v-model="dialog" width="1500">
      <template v-slot:activator="{ on, attrs }">
        <v-btn icon color="white" v-bind="attrs" v-on="on" class="warning ml-1">
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
      </template>

      <v-card>
        <v-card-title class="text-h5 grey lighten-2"> Buscar </v-card-title>
        <v-card>
          <v-card-text>
            <v-row>
              <v-col sm="6" md="2">
                <v-text-field label="Descripción" required></v-text-field>
              </v-col>
              <v-col sm="6" md="2">
                <v-text-field label="Código Barras"></v-text-field>
              </v-col>
              <v-col sm="6" md="2">
                <v-text-field label="Marca"></v-text-field>
              </v-col>
              <v-col sm="6" md="2">
                <v-text-field label="Precio unitario compra"></v-text-field>
              </v-col>
              <v-col sm="6" md="1">
                <v-text-field label="Precio unitario venta"></v-text-field>
              </v-col>
              <v-col sm="6" md="1">
                <v-text-field label="Categoria"></v-text-field>
              </v-col>
              <v-col sm="6" md="1">
                <v-text-field label="Subcategoria"></v-text-field>
              </v-col>
              <v-col sm="6" md="1">
                <v-text-field label="Acciones" disabled></v-text-field>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-text>
            <v-row v-for="(prov, index) in proveedores" :key="index">
              <v-col sm="6" md="2">
                <v-label>{{ prov.nombre }}</v-label>
              </v-col>
              <v-col sm="6" md="2">
                <v-label>{{ prov.codigo_barras }}</v-label>
              </v-col>
              <v-col sm="6" md="2">
                <v-label>{{ prov.marca.nombre }}</v-label>
              </v-col>
              <v-col sm="6" md="2">
                <v-label>{{ prov.precio_unitario_compra }}</v-label>
              </v-col>
              <v-col sm="6" md="1">
                <v-label>{{ prov.precio_unitario_venta }}</v-label>
              </v-col>
              <v-col sm="6" md="1">
                <v-label>{{ prov.categoria.nombre }}</v-label>
              </v-col>
              <v-col sm="6" md="1">
                <v-label>{{ prov.subcategoria }}</v-label>
              </v-col>

              <v-col sm="6" md="1" class="text-center">
                <v-btn
                  @click="devolverUsuario(prov, index)"
                  class="success"
                  text
                  icon
                >
                  <v-icon>mdi-lead-pencil</v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn x-large @click="dialog = false" color="blue darken-1" text>
              Close
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import { LISTAR_PROVEDOORES } from "@/generals/Funciones";
import Vue from "vue";
export default Vue.extend({
  name: "BuscarProductos",
  props: ["proveedores"],
  data: () => ({
    dialog: false,
  }),
  methods: {
    devolverUsuario(usuario: any, index: number) {
      this.dialog = false;
      this.$emit("devolverUsuario", {
        usuario,
        ident: this.proveedores[index],
      });
    },
  },
});
</script>
