import { TIPOS_DOCUMENTO } from "@/domain/model/constants/Constants";
import { GENEROS } from "@/generals/Constantes";

/**
 Sección tabla
 */
export const COLUMNAS = [
  { text: "Detalle", value: "detalle" },
  { text: "Nombres", value: "names" },
  { text: "Apellidos", value: "surnames" },
  { text: "Tipo Documento", value: "doc_type" },
  { text: "Número Documento", value: "doc_num" },
  { text: "Celular", value: "phone" },
  { text: "Correo", value: "email" },
  { text: "Direccion", value: "address" },
  { text: "Genero", value: "gender" },
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
    name: "names",
    model: "",
    rules: "required|min:1|max:50",
  },
  {
    label: "Apellidos",
    prepend_icon: "mdi-account",
    type: 1,
    format: "text",
    name: "surnames",
    model: "",
    rules: "required|min:1|max:50",
  },
  {
    label: "Tipo de documento",
    prepend_icon: "mdi-card-account-details",
    type: 6,
    multiple: false,
    solo: true,
    items: [TIPOS_DOCUMENTO.CC, TIPOS_DOCUMENTO.CELULAR, TIPOS_DOCUMENTO.NIT],
    format: "text",
    name: "doc_type",
    model: "",
    rules: "required",
  },
  {
    label: "documento de identidad",
    prepend_icon: "mdi-card-account-details",
    type: 1,
    format: "text",
    name: "doc_num",
    model: "",
    rules: "required|min:6|max:20",
  },
  {
    label: "Celular",
    prepend_icon: "mdi-phone",
    type: 1,
    format: "text",
    name: "phone",
    model: "",
    rules: "required|min:2|max:20|numeric",
  },
  {
    label: "Correo",
    prepend_icon: "mdi-email",
    type: 1,
    format: "email",
    name: "email",
    model: "",
    rules: "required|email",
  },
  {
    label: "Direccion",
    prepend_icon: "mdi-home",
    type: 1,
    format: "text",
    name: "address",
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
    name: "gender",
    model: "",
    rules: "required",
  },
];

export const VALIDACIONES = [
  { tipo: 2, nombres: ["doc_num"] },
  { tipo: 2, nombres: ["email"] },
];
