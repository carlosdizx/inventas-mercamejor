/**
 Sección tabla
 */
export const COLUMNAS: any[] = [
  { text: "Detalle", value: "detalle" },
  { text: "Nombre", value: "nombre" },
  { text: "Código de barras", value: "codigo_barras" },
  { text: "Marca", value: "marca" },
  { text: "Categoria", value: "categoria" },
  { text: "Fecha creación", value: "created_at" },
  { text: "Fecha edición", value: "updated_at" },
  { text: "Acciones", value: "acciones" },
];

/**
 Sección formulario
 */
import { LISTAR_CATEGORIAS, LISTAR_MARCAS } from "@/generals/Funciones";

const categorias: any[] = [];
const marcas: any[] = [];
const poblarListados = async () => {
  (await LISTAR_CATEGORIAS()).forEach((catg) => categorias.push(catg.data()));
  (await LISTAR_MARCAS()).forEach((mar) => marcas.push(mar.data()));
};

poblarListados().then();

export const CAMPOS: any[] = [
  {
    label: "Nombre",
    prepend_icon: "mdi-cube",
    type: 1,
    format: "text",
    name: "nombre",
    model: "",
    rules: "required|min:2|max:50",
  },
  {
    label: "Codigo de barras",
    prepend_icon: "mdi-barcode-scan",
    type: 1,
    format: "number",
    name: "codigo_barras",
    model: "",
    rules: "required|min:2|max:30",
  },
  {
    label: "Categoria",
    prepend_icon: "mdi-account-group",
    type: 2,
    items: categorias,
    name: "categoria",
    llave: "nombre",
    model: "",
    multiple: false,
    validacion: true,
    rules: "required",
  },
  {
    label: "Marca",
    prepend_icon: "mdi-account-group",
    type: 2,
    items: marcas,
    name: "marca",
    llave: "nombre",
    model: "",
    multiple: false,
    validacion: true,
    rules: "required",
  },
];
