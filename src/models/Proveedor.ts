import { GENEROS, TIPOS_DOCUMENTO } from "@/generals/Constantes";

/**
 Sección tabla
 */
export const COLUMNAS = [
  { text: "Detalle", value: "detalle" },
  { text: "Nombres", value: "nombres" },
  { text: "Apellidos", value: "apellidos" },
  { text: "Nit/Cedula", value: "documento" },
  { text: "Celular", value: "celular" },
  { text: "Correo", value: "correo" },
  { text: "Direccion", value: "direccion" },
  { text: "Genero", value: "genero" },
  { text: "Acciones", value: "acciones" },
];

/**
 Sección formulario
 */

export const CAMPOS = [
  {
    label: "Nombres",
    prepend_icon: "mdi-account",
    type: 1,
    format: "text",
    name: "nombres",
    model: "",
    rules: "required|min:1|max:50",
  },
  {
    label: "Apellidos",
    prepend_icon: "mdi-account",
    type: 1,
    format: "text",
    name: "apellidos",
    model: "",
    rules: "required|min:1|max:50",
  },
  {
    label: "Tipo de documento",
    prepend_icon: "mdi-card-account-details",
    type: 6,
    multiple: false,
    solo: true,
    items: TIPOS_DOCUMENTO,
    format: "text",
    name: "tipo_documento",
    model: "",
    rules: "required",
  },
  {
    label: "documento de identidad",
    prepend_icon: "mdi-card-account-details",
    type: 1,
    format: "number",
    name: "documento",
    model: "",
    rules: "required|min:6|max:20|numeric",
  },
  {
    label: "Celular",
    prepend_icon: "mdi-phone",
    type: 1,
    format: "number",
    name: "celular",
    model: "",
    rules: "required|min:2|max:20|numeric",
  },
  {
    label: "Correo",
    prepend_icon: "mdi-email",
    type: 1,
    format: "email",
    name: "correo",
    model: "",
    rules: "required|email",
  },
  {
    label: "Direccion",
    prepend_icon: "mdi-home",
    type: 1,
    format: "text",
    name: "direccion",
    model: "",
    rules: "required|min:1|max:50",
  },
  {
    label: "Genero",
    prepend_icon: "mdi-gender-transgender",
    type: 6,
    multiple: false,
    solo: true,
    items: GENEROS,
    format: "text",
    name: "genero",
    model: "",
    rules: "required",
  },
];
