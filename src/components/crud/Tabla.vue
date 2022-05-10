<template>
  <div>
    <v-card class="elevation-5" :color="color">
      <v-card-title class="white--text">Listado de {{ titulo }} </v-card-title>
      <v-card-text>
        <v-data-table
          :headers="columnas"
          :items="filas"
          :search="buscado"
          class="elevation-2"
          :custom-filter="filtrarPorLlave"
          fixed-header
        >
          <template v-slot:top>
            <v-row class="mx-1">
              <v-col cols="1">
                <v-tooltip color="orange darken-4" bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <span v-bind="attrs" v-on="on">
                      <v-btn fab small @click="forzarRecarga">
                        <v-icon>mdi-reload</v-icon>
                      </v-btn>
                    </span>
                  </template>
                  <span>Forzar a recargar <v-icon dark>mdi-alert</v-icon></span>
                </v-tooltip>
              </v-col>
              <v-col cols="9">
                <v-text-field
                  v-model="buscado"
                  outlined
                  dense
                  label="Buscar por cualquier campo"
                />
              </v-col>
              <v-col cols="2" v-if="!noCrear">
                <FormCreate
                  @registrado="cargarInformacion"
                  :titulo="titulo"
                  :campos_form="campos_form"
                  :coleccion="coleccion"
                  :validaciones="validaciones"
                />
              </v-col>
            </v-row>
          </template>
          <template v-slot:item.acciones="{ item }">
            <v-btn
              fab
              color="deep-orange"
              dark
              small
              outlined
              @click="eliminar(item)"
              v-if="elimacion"
            >
              <v-icon>mdi-delete</v-icon>
            </v-btn>
            <FormEdit
              v-if="!NoEditar"
              @actualizado="cargarInformacion"
              :titulo="titulo"
              :campos_form="campos_form"
              :coleccion="coleccion"
              :item="item"
            />
          </template>
          <template v-if="campos_form" v-slot:item.detalle="{ item }">
            <FormView
              :campos_form="campos_form"
              v-if="campos_form"
              :item="item"
            />
          </template>
          <template v-slot:item.documento_ref="{ item }">
            <v-btn
              color="blue darken-4"
              dark
              icon
              outlined
              :href="item.documento_ref"
              target="_blank"
            >
              <v-icon>mdi-file-export</v-icon>
            </v-btn>
          </template>
          <template v-slot:item.calificacion="{ item }">
            <v-tooltip color="primary" bottom>
              <template v-slot:activator="{ on, attrs }">
                <span v-bind="attrs" v-on="on">
                  <v-rating
                    :value="item.calificacion"
                    small
                    dense
                    readonly
                    half-increments
                  />
                </span>
              </template>
              <span>{{ item.calificacion }}</span>
            </v-tooltip>
          </template>
          <template v-slot:item.estado="{ item }">
            <v-tooltip color="green" bottom v-if="item.estado === 'Activo'">
              <template v-slot:activator="{ on, attrs }">
                <v-icon color="green" v-bind="attrs" v-on="on">
                  mdi-check-circle
                </v-icon>
              </template>
              <span>Activo</span>
            </v-tooltip>
            <v-tooltip color="red" bottom v-if="item.estado === 'Inactivo'">
              <template v-slot:activator="{ on, attrs }">
                <v-icon color="red" v-bind="attrs" v-on="on">
                  mdi-close-circle
                </v-icon>
              </template>
              <span>Inactivo</span>
            </v-tooltip>
            <v-tooltip
              color="warning"
              bottom
              v-if="item.estado === 'Pendiente'"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-icon color="warning" v-bind="attrs" v-on="on">
                  mdi-alert-circle
                </v-icon>
              </template>
              <span>Pendiente</span>
            </v-tooltip>
            <v-tooltip color="purple" bottom v-if="item.estado === 'Revisión'">
              <template v-slot:activator="{ on, attrs }">
                <v-icon color="purple" v-bind="attrs" v-on="on">
                  mdi-cube-scan
                </v-icon>
              </template>
              <span>Revisión</span>
            </v-tooltip>
            <v-tooltip color="green" bottom v-if="item.estado === 'Aprobado'">
              <template v-slot:activator="{ on, attrs }">
                <v-icon color="green" v-bind="attrs" v-on="on">
                  mdi-cash-check
                </v-icon>
              </template>
              <span>Aprobado</span>
            </v-tooltip>
            <v-tooltip color="red" bottom v-if="item.estado === 'Desaprobado'">
              <template v-slot:activator="{ on, attrs }">
                <v-icon color="red" v-bind="attrs" v-on="on">
                  mdi-cash-remove
                </v-icon>
              </template>
              <span>Desaprobado</span>
            </v-tooltip>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { ELIMINAR, LISTAR } from "@/services/crud";
import Swal from "sweetalert2";
import { tipo_dato } from "@/generals/formats";
import FormCreate from "@/components/crud/FormCreate.vue";
import FormEdit from "@/components/crud/FormEdit.vue";
import FormView from "@/components/crud/FormView.vue";
import { mapState } from "vuex";

export default Vue.extend({
  name: "Tabla",
  components: { FormCreate, FormEdit, FormView },
  data: () => ({
    buscado: "",
    filas: [""],
  }),
  computed: {
    ...mapState(["color"]),
  },
  props: {
    coleccion: String,
    titulo: String,
    columnas: Array,
    llave: String,
    elimacion: Boolean,
    campos_form: Array,
    validaciones: Array,
    roles: Array,
    noCrear: Boolean,
    NoEditar: Boolean,
  },
  methods: {
    filtrarPorLlave(valor: any, buscado: any): boolean {
      if (typeof valor === "string" && typeof buscado === "string") {
        if (buscado.trim().length !== 0) {
          return (
            valor
              .toString()
              .toLocaleUpperCase()
              .indexOf(buscado.toUpperCase()) !== -1
          );
        }
      }
      return false;
    },
    async cargarInformacion() {
      this.filas = [];
      (await LISTAR(this.coleccion)).forEach((item) => {
        const obj: any = JSON.parse(JSON.stringify(item.data()));
        obj.id = item.id;
        Object.values(obj).map(async (value: any, index: number) => {
          if (typeof value === "object" && value) {
            value = await tipo_dato(value);
            const key: string = Object.keys(obj)[index].toString();
            obj[key] = value;
          }
        });
        this.filas.push(obj);
      });
    },
    async eliminar(objeto: any) {
      Swal.fire({
        title: "¿Desea eliminar el registro?",
        showDenyButton: true,
        confirmButtonText: "Eliminar",
        confirmButtonColor: "green",
        denyButtonText: `No aún no!`,
      }).then(async (result) => {
        if (result.isConfirmed) {
          await ELIMINAR(this.coleccion, objeto);
          this.filas = [];
          await this.cargarInformacion();
          await Swal.fire({
            title: "Eliminado!",
            icon: "success",
            timer: 1000,
            showConfirmButton: false,
          });
        }
      });
    },
    forzarRecarga() {
      this.$router.go(0);
    },
  },
  async created() {
    await this.cargarInformacion();
  },
});
</script>
