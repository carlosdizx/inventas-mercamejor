/*
Sección tabla
*/
export const COLUMNAS = [
  { title: "Código de Barras", value: "codigo_barras" },
  { title: "Descripción de producto", value: "descripcion_producto" },
  { title: "Bodega", value: "bodega" },
  { title: "Cantidad", value: "cantidad" },
  { title: "Precio compra", value: "precio_compra" },
  { title: "Precio de Venta", value: "precio_venta" },
  { title: "Impuesto de Venta", value: "impuesto" },
  { title: "Descuento", value: "descuento" },
  { title: "Subtotal", value: "subtotal" },
  { title: "Acciones", value: "acciones" },
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

export const COMPRAS_CONSULTA = [
  { title: "Fecha de Creación", value: "created_at" },
  { title: "Documento proveedor", value: "doc_supp" },
  { title: "Nombre del proveedor", value: "nam_supp" },
  { title: "Apellidos del proveedor", value: "sur_supp" },
  { title: "Tipo de compra", value: "type_pay" },
  { title: "Total", value: "total" },
];
