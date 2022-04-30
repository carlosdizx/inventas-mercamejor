/**
Sección tabla
 */
export const COLUMNAS = [
  { text: "Detalle", value: "detalle" },
  { text: "Tipo", value: "tipo" },
  { text: "Referencia", value: "referencia" },
  { text: "Archivo", value: "documento_ref" },
  { text: "Fecha de creación", value: "created_at" },
];

/**
Sección formulario
 */
export const CAMPOS = [
  {
    label: "Tipo de comprobante",
    prepend_icon: "mdi-format-list-bulleted-type",
    type: 6,
    multiple: false,
    solo: true,
    items: ["Comprobante 1", "Comprobante 2", "Comprobante 3", "Comprobante 4"],
    name: "tipo",
    model: "",
    rules: "required",
  },
  {
    label: "Referencia",
    prepend_icon: "mdi-code-json",
    type: 1,
    format: "text",
    name: "referencia",
    model: "",
    rules: "min:1|max:50",
  },
  {
    label: "Imagen o documento del comprobante",
    prepend_icon: "mdi-paperclip",
    type: 10,
    name: "documento_ref",
    model: null,
    rules: "required",
  },
];
