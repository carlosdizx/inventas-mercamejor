<template>
  <div class="text-center mt-6">
    <v-dialog v-model="dialog" persistent xl justify="center">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="primary" dark v-bind="attrs" v-on="on">
          click Filtros
        </v-btn>
      </template>
      <v-card class="mt-6">
        <v-card-text>
          <v-row class="ml-6 mr-6">
            <v-col>
              <v-text-field
                label="Ingrese fecha inicial"
                v-model="rangoFechaInicial"
                type="date"
                outlined
                dense
              ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                label="Ingrese fecha Final"
                v-model="rangoFechaFinal"
                type="date"
                outlined
                dense
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row class="">
            <v-col>
              <validation-provider type="date" name="Fecha de Compra">
                <template>
                  <v-card class="mx-auto" max-width="500">
                    <v-list shaped>
                      <v-list-item-group v-model="model" multiple>
                        <template v-for="(item, i) in items">
                          <v-divider
                            v-if="!item"
                            :key="`divider-${i}`"
                          ></v-divider>

                          <v-list-item
                            v-else
                            :key="`item-${i}`"
                            :value="item"
                            active-class="deep-black--text text--accent-4"
                          >
                            <template v-slot:default="{ active }">
                              <v-list-item-content>
                                <v-list-item-title
                                  v-text="item"
                                ></v-list-item-title>
                              </v-list-item-content>

                              <v-list-item-action>
                                <v-checkbox
                                  :input-value="active"
                                  color="deep-black accent-4"
                                ></v-checkbox>
                              </v-list-item-action>
                            </template>
                          </v-list-item>
                        </template>
                      </v-list-item-group>
                    </v-list>
                  </v-card>
                </template>
              </validation-provider>
            </v-col>
          </v-row>
          <v-row class="mr-5 ml-5">
            <v-col>
              <v-btn
                @click="realizarConsulta()"
                x-large
                dark
                class="color_a mb-3"
                block
                outlined
                dense
                >Buscar
              </v-btn>
              {{ rangoFechaInicial }}
              <v-dialog v-model="dialog2" hide-overlay persistent width="400">
                <v-card color="color_a" dark>
                  <v-card-text>
                    Ya te escupo la inf...
                    <v-progress-linear
                      indeterminate
                      color="white"
                      class="mb-0"
                    ></v-progress-linear>
                  </v-card-text>
                </v-card>
              </v-dialog>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>

    <TablaInventarioCuadre v-if="!dialog"></TablaInventarioCuadre>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import TablaInventarioCuadre from "@/components/dashboard/modulos/cuandre_cuentas/TablaInventarioCuadre.vue";
export default Vue.extend({
  name: "CuadreCuentas",
  components: { TablaInventarioCuadre },
  data: () => ({
    rangoFechaInicial: "",
    rangoFechaFinal: "",
    items: ["caja 1", "caja 2", "", "caja n"],
    dialog: true,
    dialog2: false,
  }),
  methods: {
    realizarConsulta() {
      this.dialog2 = true;
      //const consulta = await firebase('conus');
      setTimeout(() => {
        console.log("esta es la fecha", this.rangoFechaInicial);
        console.log("fecha 2", this.rangoFechaFinal);

        this.dialog = false;
      }, 3000);
    },
  },
});
</script>
