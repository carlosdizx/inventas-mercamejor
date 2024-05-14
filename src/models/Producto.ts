/**
 Sección tabla
 */
export const COLUMNAS: any[] = [
  { text: "Código de barras", value: "bar_code" },
  { text: "Nombre", value: "name" },
  { text: "Total unidades", value: "amount" },
  { text: "Precio de compra", value: "unit_price" },
  { text: "Precio de venta", value: "sale_price" },
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
    label: "Codigo de barras",
    prepend_icon: "mdi-barcode-scan",
    type: 1,
    format: "text",
    name: "bar_code",
    model: "",
  },
  {
    label: "Nombre",
    prepend_icon: "mdi-cube",
    type: 1,
    format: "text",
    name: "name",
    model: "",
    rules: "required|min:2|max:50",
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
    label: "Cantidade de unidades",
    prepend_icon: "mdi-cash-lock-open",
    type: 8,
    format: "number",
    name: "amount",
    model: "",
    rules: "min:0",
  },
  {
    label: "Precio unitario compra",
    prepend_icon: "mdi-cash-lock-open",
    type: 8,
    format: "number",
    name: "unit_price",
    model: "",
    rules: "min:0",
  },
  {
    label: "Precio unitario venta",
    prepend_icon: "mdi-cash-lock",
    type: 8,
    format: "number",
    name: "sale_price",
    model: "",
    rules: "min:0",
  },
  /*{
    label: "Descuento",
    prepend_icon: "mdi-sale-outline",
    type: 1,
    format: "number",
    name: "descuento",
    model: 0,
    rules: "required|max:20",
  },*/
  {
    label: "Categoria",
    label2: "Subcategoria",
    type: 9,
    type2: 6,
    llave: "name",
    llave2: "subcategories",
    solo: true,
    items: categorias,
    items2: [],
    name: "category",
    name2: "subcategory",
    model: "",
    model2: "",
    rules: "required",
    validacion: true,
  },
];

export const VALIDACIONES = [
  { tipo: 1, nombres: ["unit_price", "sale_price"] },
];
