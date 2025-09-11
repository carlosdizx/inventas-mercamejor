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
                  <template v-slot:activator="{ props }">
                    <span v-bind="props">
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
              <template v-slot:activator="{ props }">
                <span v-bind="props">
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
              <template v-slot:activator="{ props }">
                <v-icon color="green" v-bind="props">
                  mdi-check-circle
                </v-icon>
              </template>
              <span>Activo</span>
            </v-tooltip>
            <v-tooltip color="red" bottom v-if="item.estado === 'Inactivo'">
              <template v-slot:activator="{ props }">
                <v-icon color="red" v-bind="props">
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
              <template v-slot:activator="{ props }">
                <v-icon color="warning" v-bind="props">
                  mdi-alert-circle
                </v-icon>
              </template>
              <span>Pendiente</span>
            </v-tooltip>
            <v-tooltip color="purple" bottom v-if="item.estado === 'Revisión'">
              <template v-slot:activator="{ props }">
                <v-icon color="purple" v-bind="props">
                  mdi-cube-scan
                </v-icon>
              </template>
              <span>Revisión</span>
            </v-tooltip>
            <v-tooltip color="green" bottom v-if="item.estado === 'Aprobado'">
              <template v-slot:activator="{ props }">
                <v-icon color="green" v-bind="props">
                  mdi-cash-check
                </v-icon>
              </template>
              <span>Aprobado</span>
            </v-tooltip>
            <v-tooltip color="red" bottom v-if="item.estado === 'Desaprobado'">
              <template v-slot:activator="{ props }">
                <v-icon color="red" v-bind="props">
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

interface FormField {
  type: number;
  label: string;
  label2?: string;
  rules?: string;
  prepend_icon?: string;
  format?: string;
  model: any;
  model2?: any;
  items?: any[];
  items2?: any[];
  llave?: string;
  llave2?: string;
  multiple?: boolean;
  solo?: boolean;
  options?: { label: string; value: string | number }[];
  fieldOptions?: {
    locale?: string;
    prefix?: string;
    suffix?: string;
    length?: number;
    precision?: number;
    decimal?: string;
    thousands?: string;
  };
  step?: number;
  readOnly?: boolean;
  min?: number;
  max?: number;
  validacion?: boolean;
}

interface TableItem {
  id: string;
  documento_ref?: string;
  calificacion?: number;
  estado?: string;
  [key: string]: any;
}

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
      type: Array as PropType<{ text: string; value: string }[]>,
      required: true
    },
    llave: {
      type: String,
      required: false,
      default: 'id'
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
      type: Array as PropType<FormField[]>,
      default: () => []
    },
    validaciones: {
      type: Array as PropType<{ tipo: number; nombres: string[] }[]>,
      default: () => []
    },
    roles: {
      type: Array as PropType<string[]>,
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
      type: Array as PropType<any[]>,
      default: () => []
    }
  },
  emits: ['getItem', 'enviarSeleccionado'],
  setup(props, { emit }) {
    const router = useRouter();
    const buscado = ref("");
    const filas = ref<TableItem[]>([]);
    const cargando = ref(false);

    const cargarInformacion = async () => {
      cargando.value = true;
      try {
        const snapshot = await LISTAR(props.coleccion);
        const procesadas: TableItem[] = [];
        for (const doc of snapshot.docs) {
          const obj: any = JSON.parse(JSON.stringify(doc.data()));
          obj.id = doc.id;
          for (const [key, value] of Object.entries(obj)) {
            obj[key] = await tipo_dato(value as any);
          }
          procesadas.push(obj);
        }
        filas.value = procesadas;
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

    const filtrarPorLlave = (valor: any, buscado: any): boolean => {
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
    };

    const eliminar = async (item: any) => {
      if (!item || !item.id) {
        Swal.fire({
          title: "Error",
          text: "No se puede eliminar el item porque no tiene un ID válido",
          icon: "error"
        });
        return;
      }

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
            await ELIMINAR(props.coleccion, item);
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
