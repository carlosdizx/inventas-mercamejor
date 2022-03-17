<template>
  <div>
    <v-card class="elevation-5" color="black">
      <v-card-title class="white--text">Listado de {{ titulo }} </v-card-title>
      <v-card-text>
        <v-data-table
          :headers="columnas"
          :items="filas"
          :item-key="llave"
          class="elevation-2"
          :search="buscado"
          :custom-filter="filtrarPorLlave"
        >
          <template v-slot:top>
            <v-row class="mx-2">
              <v-col cols="10">
                <v-text-field
                  v-model="buscado"
                  :label="'Buscar por \'' + llave + '\''"
                />
              </v-col>
              <v-col cols="2">
                <FormCreate
                  @registrado="cargarInformacion"
                  :titulo="titulo"
                  :campos_form="campos_form"
                  :coleccion="coleccion"
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
              @click="eliminar(item.id)"
              v-if="elimacion"
            >
              <v-icon>mdi-delete</v-icon>
            </v-btn>
            <FormEdit
              @actualizado="cargarInformacion"
              :titulo="titulo"
              :campos_form="campos_form"
              :coleccion="coleccion"
              :item="item"
            />
          </template>
          <template v-slot:item.detalle="{ item }">
            <Detail :campos_detalle="campos_detalle" :objeto="item" />
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
import Detail from "@/components/crud/Detail.vue";
import FormCreate from "@/components/crud/FormCreate.vue";
import FormEdit from "@/components/crud/FormEdit.vue";

export default Vue.extend({
  name: "Tabla",
  components: { Detail, FormCreate, FormEdit },
  data: () => ({
    buscado: "",
    filas: [""],
  }),
  props: {
    coleccion: String,
    titulo: String,
    columnas: Array,
    llave: String,
    elimacion: Boolean,
    campos_detalle: Array,
    objeto_form: Object,
    campos_form: Array,
    roles: Array,
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
        Object.values(obj).map((value: any, index: number) => {
          if (typeof value === "object" && value) {
            value = tipo_dato(value);
            const key: string = Object.keys(obj)[index].toString();
            obj[key] = value;
          }
        });
        this.filas.push(obj);
      });
    },
    async eliminar(id: string) {
      Swal.fire({
        title: "¿Desea eliminar el registro?",
        showDenyButton: true,
        confirmButtonText: "Eliminar",
        confirmButtonColor: "green",
        denyButtonText: `No aún no!`,
      }).then(async (result) => {
        if (result.isConfirmed) {
          await ELIMINAR(this.coleccion, id);
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
  },
  async created() {
    await this.cargarInformacion();
  },
});
</script>
