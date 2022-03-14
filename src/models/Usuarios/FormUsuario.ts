import { LISTAR_ROLES } from "@/models/Usuarios/Funciones";
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
    items: ["Cédula de ciudadania", "Tarjeta de identidad", "Otro"],
    name: "tipo_documento",
    model: "",
    blank: true,
  },
  {
    label: "Documento",
    prepend_icon: "mdi-card-account-details",
    type: 1,
    format: "text",
    name: "documento",
    model: "",
    blank: true,
    min: 5,
    max: 10,
    counter: true,
    readOnly: true,
  },
  {
    label: "Nombres",
    prepend_icon: "mdi-account",
    type: 1,
    format: "text",
    name: "nombres",
    model: "",
    blank: true,
    min: 3,
    max: 40,
    counter: true,
  },
  {
    label: "Apellidos",
    prepend_icon: "mdi-account",
    type: 1,
    format: "text",
    name: "apellidos",
    model: "",
    blank: true,
    min: 3,
    max: 40,
    counter: true,
  },
  {
    label: "Correo",
    prepend_icon: "mdi-email",
    type: 1,
    format: "email",
    name: "correo",
    model: "",
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
    items: ["Masculino", "Femenino", "Otro"],
    name: "genero",
    model: "",
    blank: true,
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
    items: ["Activo", "Inactivo", "Pendiente"],
    name: "estado",
    model: "",
    blank: true,
  },
  {
    label: "Roles",
    prepend_icon: "mdi-account-details",
    type: 2,
    items: roles,
    name: "roles",
    llave: "name",
    model: "",
    blank: true,
    multiple: true,
  },
];
