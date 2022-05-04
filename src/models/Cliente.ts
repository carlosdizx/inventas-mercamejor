/**
 Sección tabla
 */
export const COLUMNAS = [
  { text: "Nombres", value: "nombres" },
  { text: "Apellidos", value: "apellidos" },
  { text: "Fecha de nacimiento", value: "fechaNacimiento" },
  { text: "Género", value: "documento" },
  { text: "Documento de identidad", value: "documento" },
  { text: "Correo", value: "correo" },
  { text: "Acciones", value: "acciones" },
];

/**
 Sección formulario
 */
export const CAMPOS = [
  {
    label: "Tipo de documento",
    prepend_icon: "mdi-card-account-details",
    type: 6,
    multiple: false,
    solo: true,
    items: [
      "Cédula de ciudadania",
      "Tarjeta de identidad",
      "Cédula de extrangería",
      "Pasaporte",
      "Otro",
    ],
    name: "tipo_documento",
    model: "",
    rules: "required",
  },
  {
    label: "Documento de identidad",
    prepend_icon: "mdi-card-account",
    type: 1,
    name: "documento",
    model: "",
    multiple: true,
    rules: "required|max:25",
  },
  {
    label: "Nombres",
    prepend_icon: "mdi-account",
    type: 1,
    format: "text",
    name: "nombres",
    model: "",
    rules: "required|min:1|max:25",
  },
  {
    label: "Apellidos",
    prepend_icon: "mdi-account",
    type: 1,
    format: "text",
    name: "apellidos",
    model: "",
    rules: "required|min:1|max:25",
  },
  {
    label: "Fecha de nacimiento",
    prepend_icon: "mdi-date",
    type: 1,
    format: "date",
    name: "fechaNacimiento",
    model: "",
    rules: "required",
  },
  {
    label: "Género",
    prepend_icon: "mdi-home",
    type: 6,
    multiple: false,
    solo: true,
    items: ["Masculino", "Femenino", "Otro"],
    name: "genero",
    model: "",
    rules: "required",
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
    name: "correo",
    model: "",
    rules: "email",
  },
  {
    label: "Dirección",
    prepend_icon: "mdi-home",
    type: 1,
    format: "text",
    name: "direccon",
    model: "",
    rules: "required|min:1|max:50",
  },
];
