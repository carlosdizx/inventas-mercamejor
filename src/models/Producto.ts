/**
 Sección tabla
 */
export const COLUMNAS: any[] = [
  { text: "Detalle", value: "detalle" },
  { text: "Nombre", value: "nombre" },
  { text: "Código de barras", value: "codigo_barras" },
  { text: "Precio de compra", value: "precio_unitario_compra" },
  { text: "Precio de venta", value: "precio_unitario_venta" },
  { text: "Subcategoría", value: "subcategoria" },
  { text: "Fecha edición", value: "updated_at" },
  { text: "Acciones", value: "acciones" },
];

/**
 Sección formulario
 */
import {
  LISTAR_BODEGAS,
  LISTAR_CATEGORIAS,
  LISTAR_MARCAS,
} from "@/generals/Funciones";

const categorias: any[] = [];
const marcas: any[] = [];
const bodegas: any[] = [];
const poblarListados = async () => {
  (await LISTAR_CATEGORIAS()).forEach((catg) => categorias.push(catg.data()));
  (await LISTAR_MARCAS()).forEach((mar) => marcas.push(mar.data()));
  (await LISTAR_BODEGAS()).forEach((bod) => bodegas.push(bod.data()));
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
  {
    label: "Precio unitario compra",
    prepend_icon: "mdi-cash-lock-open",
    type: 8,
    format: "number",
    name: "precio_unitario_compra",
    model: "",
    rules: "required|min:2|max:20",
  },
  {
    label: "Precio unitario venta",
    prepend_icon: "mdi-cash-lock",
    type: 8,
    format: "number",
    name: "precio_unitario_venta",
    model: "",
    rules: "required|min:2|max:20",
  },
  {
    label: "Categoria",
    label2: "Subcategoria",
    type: 9,
    type2: 6,
    llave: "nombre",
    llave2: "subcategorias",
    solo: true,
    items: categorias,
    items2: [],
    name: "categoria",
    name2: "subcategoria",
    model: "",
    model2: "",
    rules: "required",
    validacion: true,
  },
];

export const VALIDACIONES = [
  { tipo: 1, nombres: ["precio_unitario_compra", "precio_unitario_venta"] },
];
