/**
Sección tabla
 */
export const COLUMNAS: any[] = [
  { text: "Detalle", value: "detalle" },
  { text: "Acción realizada", value: "accion" },
  { text: "Responsable", value: "responsable" },
  { text: "Documento", value: "documento" },
  { text: "Entidad", value: "entidad" },
  { text: "Correo", value: "email" },
  { text: "Fecha creación", value: "created_at" },
];

/**
 Sección formulario
 */
export const CAMPOS: any[] = [
  {
    label: "Nombre",
    prepend_icon: "mdi-cube",
    type: 1,
    format: "text",
    name: "accion",
    model: "",
  },
  {
    label: "Fecha de creación",
    prepend_icon: "mdi-barcode-scan",
    type: 1,
    format: "text",
    name: "created_at",
    model: "",
  },
  {
    label: "Documento de identidad",
    prepend_icon: "mdi-cash-lock-open",
    type: 1,
    format: "text",
    name: "documento",
    model: "",
  },
  {
    label: "Entidad manipulada",
    prepend_icon: "mdi-cash-lock-open",
    type: 1,
    format: "text",
    name: "entidad",
    model: "",
  },
  {
    label: "Objeto modificado",
    prepend_icon: "mdi-cash-lock-open",
    type: 3,
    name: "objeto",
    model: "",
  },
  {
    label: "Objeto actual",
    prepend_icon: "mdi-cash-lock-open",
    type: 3,
    name: "objeto_edit",
    model: "",
  },
];
