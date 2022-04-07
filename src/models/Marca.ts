/**
Sección tabla
 */
export const COLUMNAS: any[] = [
  { text: "Detalle", value: "detalle" },
  { text: "Nombre", value: "nombre" },
  { text: "Celular", value: "celular" },
  { text: "Correo", value: "correo" },
  { text: "Fecha creación", value: "created_at" },
  { text: "Fecha edición", value: "updated_at" },
  { text: "Acciones", value: "acciones" },
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
    name: "nombre",
    model: "",
    rules: "required|min:2|max:50",
  },
  {
    label: "¿Es marca regional?",
    type: 4,
    model: false,
    name: "regional",
  },
  {
    label: "Celular",
    prepend_icon: "mdi-phone",
    type: 1,
    format: "text",
    name: "celular",
    model: "",
    rules: "min:5|max:30",
  },
  {
    label: "Correo",
    prepend_icon: "mdi-email",
    type: 1,
    format: "email",
    name: "correo",
    model: "",
    rules: "email|min:5|max:30",
  },
  {
    label: "Dirección",
    prepend_icon: "mdi-home",
    type: 1,
    format: "text",
    name: "direccion",
    model: "",
    rules: "min:2|max:50",
  },
];
