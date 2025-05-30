<template>
  <div>
    <v-card class="elevation-5" color="primary">
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
            <v-btn
              fab
              color="green"
              dark
              small
              outlined
              @click="seleccionar(item)"
              v-if="seleccion"
            >
              <v-icon>mdi-send-circle</v-icon>
            </v-btn>
            <FormEdit
              v-if="!NoEditar"
              @actualizado="cargarInformacion"
              :titulo="titulo"
              :campos_form="campos_form"
              :coleccion="coleccion"
              :item="item"
              :validaciones="validaciones"
            />
          </template>
          <template v-if="campos_form" v-slot:item.detalle="{ item }">
            <FormView
              :campos_form="campos_form"
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
          <template v-slot:item.seleccion="{ item }">
            <v-btn
              color="success darken-1"
              dark
              icon
              @click="enviarSeleccionado(item)"
            >
              <v-icon>mdi-send</v-icon>
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
import { defineComponent, ref, computed, onMounted, PropType } from 'vue';
import { useRouter } from 'vue-router';
import { mapState } from 'vuex';
import FormCreate from "./FormCreate.vue";
import FormEdit from "./FormEdit.vue";
import FormView from "./FormView.vue";
import { LISTAR } from "@/generals/Funciones";
import { CONSULTA_DATOS, ELIMINAR } from "@/services/crud";
import { tipo_dato } from "@/generals/formats";
import Swal from "sweetalert2";

export default defineComponent({
  name: "Tabla",
  components: { FormCreate, FormEdit, FormView },
  props: {
    coleccion: {
      type: String,
      required: true
    },
    titulo: {
      type: String,
      required: true
    },
    columnas: {
      type: Array,
      required: true
    },
    llave: {
      type: String,
      required: true
    },
    elimacion: {
      type: Boolean,
      default: false
    },
    seleccion: {
      type: Boolean,
      default: false
    },
    campos_form: {
      type: Array,
      default: () => []
    },
    validaciones: {
      type: Array,
      default: () => []
    },
    roles: {
      type: Array,
      default: () => []
    },
    noCrear: {
      type: Boolean,
      default: false
    },
    NoEditar: {
      type: Boolean,
      default: false
    },
    consulta: {
      type: Array,
      default: () => []
    }
  },
  emits: ['getItem', 'enviarSeleccionado'],
  setup(props, { emit }) {
    const router = useRouter();
    const buscado = ref("");
    const filas = ref([]);
    const cargando = ref(false);

    const cargarInformacion = async () => {
      cargando.value = true;
      try {
        const datos = await LISTAR(props.coleccion);
        filas.value = datos.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
      } catch (error) {
        console.error('Error loading data:', error);
        Swal.fire({
          title: "Error",
          text: "Error al cargar los datos",
          icon: "error"
        });
      } finally {
        cargando.value = false;
      }
    };

    const forzarRecarga = () => {
      cargarInformacion();
    };

    const filtrarPorLlave = (value: any, search: string, item: any) => {
      if (!search) return true;
      const searchLower = search.toLowerCase();
      return Object.keys(item).some(key => {
        const value = item[key];
        if (typeof value === 'string') {
          return value.toLowerCase().includes(searchLower);
        }
        return false;
      });
    };

    const eliminar = async (item: any) => {
      Swal.fire({
        title: "¿Esta seguro de Eliminar este item?",
        showDenyButton: true,
        confirmButtonColor: "red",
        confirmButtonText: "Eliminar",
        denyButtonColor: "green",
        denyButtonText: `Cancelar`,
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            await ELIMINAR(props.coleccion, item.id);
            await cargarInformacion();
            Swal.fire({
              title: "Éxito",
              text: "Item eliminado correctamente",
              icon: "success"
            });
          } catch (error) {
            console.error('Error deleting item:', error);
            Swal.fire({
              title: "Error",
              text: "Error al eliminar el item",
              icon: "error"
            });
          }
        }
      });
    };

    const seleccionar = (item: any) => {
      emit('getItem', item);
    };

    const enviarSeleccionado = (item: any) => {
      emit('enviarSeleccionado', item);
    };

    onMounted(() => {
      cargarInformacion();
    });

    return {
      buscado,
      filas,
      cargando,
      cargarInformacion,
      forzarRecarga,
      filtrarPorLlave,
      eliminar,
      seleccionar,
      enviarSeleccionado
    };
  }
});
</script>
