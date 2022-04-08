/**
 Sección tabla
 */
export const COLUMNAS = [
  { text: "Cargo", value: "rol" },
  { text: "Nombres", value: "nombres" },
  { text: "Apellidos", value: "apellidos" },
  { text: "Documento", value: "documento" },
  { text: "Celular", value: "celular" },
  { text: "Email", value: "email" },
  { text: "Acciones", value: "acciones" },
];

/**
 Sección formulario
 */
export const CAMPOS = [
  {
    label: "Cargo",
    prepend_icon: "mdi-card-account-details",
    type: 6,
    multiple: false,
    solo: true,
    items: ["Empleado"],
    name: "cargo",
    model: "",
    rules: "required",
  },
  {
    label: "Documento",
    prepend_icon: "mdi-card-account-details",
    type: 1,
    format: "text",
    name: "documento",
    model: "",
    rules: "required|min:4|max:25",
  },
  {
    label: "Nombres",
    prepend_icon: "mdi-card-account",
    type: 1,
    format: "text",
    name: "nombres",
    model: "",
    rules: "required|max:70",
  },
  {
    label: "Apellidos",
    prepend_icon: "mdi-card-account",
    type: 1,
    name: "apellidos",
    model: "",
    multiple: true,
    rules: "required|max:70",
  },
  {
    label: "Celular",
    prepend_icon: "mdi-cellphone",
    type: 1,
    name: "celular",
    model: "",
    multiple: true,
    rules: "required|min:2|max:10",
  },
  {
    label: "Correo",
    prepend_icon: "mdi-email",
    type: 1,
    format: "email",
    name: "email",
    model: "",
    rules: "email",
  },
  {
    label: "Estado",
    prepend_icon: "mdi-list-status",
    type: 6,
    multiple: false,
    solo: true,
    items: ["Activo", "Inactivo", "Pendiente"],
    name: "estado",
    model: "",
  },
];
