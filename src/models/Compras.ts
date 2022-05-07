/*
Sección tabla
*/
export const COLUMNAS = [
  { text: "Código de Barras", value: "codigo_barras" },
  { text: "Descripción de producto", value: "descripcion_producto" },
  { text: "Bodega", value: "bodega" },
  { text: "Cantidad", value: "cantidad" },
  { text: "Precio compra", value: "precio_compra" },
  { text: "Precio de Venta", value: "precio_venta" },
  { text: "Impuesto de Venta", value: "impuesto" },
  { text: "Descuento", value: "descuento" },
  { text: "Subtotal", value: "subtotal" },
  { text: "Acciones", value: "acciones" },
];

/**
Sección formulario
 */
export const CAMPOS = [
  {
    label: "Código de Barras",
    prepend_icon: "mdi-cube",
    type: 1,
    format: "text",
    name: "codigo_barras",
    model: "",
    rules: "required|digits",
  },
  {
    label: "Descripción de producto",
    prepend_icon: "mdi-cube",
    type: 1,
    format: "text",
    name: "descripcion_producto",
    model: "",
    rules: "required|min:1|max:50",
  },
  {
    label: "Bodega",
    prepend_icon: "mdi-cube",
    type: 1,
    format: "text",
    name: "bodega",
    model: "",
    rules: "required|min:1|max:50",
  },
  {
    label: "Cantidad",
    prepend_icon: "mdi-cube",
    type: 1,
    format: "text",
    name: "cantidad",
    model: "",
    rules: "required|numeric",
  },
  {
    label: "Precio compra",
    prepend_icon: "mdi-cube",
    type: 1,
    format: "text",
    name: "precio_compra",
    model: "",
    rules: "required|numeric",
  },
  {
    label: "Precio de Venta",
    prepend_icon: "mdi-cube",
    type: 1,
    format: "text",
    name: "precio_venta",
    model: "",
    rules: "required|numeric",
  },
  {
    label: "Impuesto de Venta",
    prepend_icon: "mdi-cube",
    type: 1,
    format: "text",
    name: "impuesto",
    model: "",
    rules: "required|numeric",
  },
  {
    label: "Descuento",
    prepend_icon: "mdi-cube",
    type: 1,
    format: "text",
    name: "descuento",
    model: "",
    rules: "required|numeric",
  },
  {
    label: "Subtotal",
    prepend_icon: "mdi-cube",
    type: 1,
    format: "text",
    name: "subtotal",
    model: "",
    rules: "required|numeric",
  },
];
