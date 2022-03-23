import { LISTAR_ROLES } from "@/generals/Funciones";

const roles: any[] = [];
async function listarRoles() {
  (await LISTAR_ROLES()).forEach((rol) => roles.push(rol.data()));
  return roles;
}
listarRoles();

export const CAMPOS = [
  {
    label: "Tipo documento",
    prepend_icon: "mdi-card-account-details",
    type: 6,
    multiple: false,
    solo: true,
    items: ["Cédula de ciudadania", "Tarjeta de identidad", "Otro"],
    name: "tipo_documento",
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
    prepend_icon: "mdi-account",
    type: 1,
    format: "text",
    name: "nombres",
    model: "",
    counter: true,
    rules: "required|min:2|max:60",
  },
  {
    label: "Apellidos",
    prepend_icon: "mdi-account",
    type: 1,
    format: "text",
    name: "apellidos",
    model: "",
    counter: true,
    rules: "required|min:2|max:60",
  },
  {
    label: "Celular",
    prepend_icon: "mdi-phone",
    type: 1,
    format: "number",
    name: "celular",
    model: "",
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
    name: "direccion",
    model: "",
  },
  {
    label: "Género",
    prepend_icon: "mdi-gender-male-female-variant",
    type: 6,
    multiple: true,
    solo: false,
    items: [
      "Heterosexual",
      "Gay",
      "Lesbiana",
      "Bisexual",
      "Queer",
      "Asexual",
      "Arromántico",
      "Androsexual",
      "Ginosexual",
      "Bicurioso",
      "Demisexual",
      "Poliamoroso",
    ],
    name: "genero",
    model: "",
    rules: "required",
  },
  {
    label: "Fecha de nacimiento",
    prepend_icon: "mdi-cake",
    type: 1,
    format: "date",
    name: "fecha_nacimiento",
    model: "",
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
  {
    label: "Roles",
    prepend_icon: "mdi-account-group",
    type: 2,
    items: roles,
    name: "roles",
    llave: "name",
    model: "",
    multiple: true,
    rules: "required",
  },
  {
    label: "Detalles extra",
    prepend_icon: "mdi-info",
    type: 3,
    name: "detalles_extra",
    model: "",
    multiple: true,
    rules: "min:0|max:1000",
  },
  {
    label: "Regional",
    type: 4,
    name: "regional",
    model: false,
  },
  {
    label: "Áreas de comercialización",
    type: 5,
    name: "areas",
    model: "",
    options: [
      { value: "enlatados", label: "Enlatados" },
      { value: "frituras", label: "Frituras" },
      { value: "aseo", label: "Aséo" },
    ],
    rules: "required",
  },
];
