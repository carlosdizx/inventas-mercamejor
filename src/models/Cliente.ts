import { GENEROS } from "@/generals/Constantes";
import { TIPOS_DOCUMENTO } from "@/domain/model/constants/Constants";

/**
 Sección tabla
 */
export const COLUMNAS = [
  { text: "Detalle", value: "detalle" },
  { text: "Nombres", value: "names" },
  { text: "Apellidos", value: "surnames" },
  { text: "Fecha de nacimiento", value: "birth" },
  { text: "Género", value: "gender" },
  { text: "Documento de identidad", value: "doc_num" },
  { text: "Correo", value: "email" },
  { text: "Fecha de creación", value: "created_at" },
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
    items: [TIPOS_DOCUMENTO.CELULAR, TIPOS_DOCUMENTO.CC],
    name: "doc_type",
    model: "",
    rules: "required",
  },
  {
    label: "Documento de identidad",
    prepend_icon: "mdi-card-account-details",
    type: 1,
    name: "doc_num",
    model: "",
    multiple: true,
    rules: "required|max:25",
  },
  {
    label: "Nombres",
    prepend_icon: "mdi-account",
    type: 1,
    format: "text",
    name: "names",
    model: "",
    rules: "required|min:1|max:25",
  },
  {
    label: "Apellidos",
    prepend_icon: "mdi-account",
    type: 1,
    format: "text",
    name: "surnames",
    model: "",
    rules: "required|min:1|max:25",
  },
  {
    label: "Fecha de nacimiento",
    prepend_icon: "mdi-cake",
    type: 1,
    format: "date",
    name: "birth",
    model: "",
    rules: "required",
  },
  {
    label: "Género",
    prepend_icon: "mdi-gender-transgender",
    type: 6,
    multiple: false,
    solo: true,
    items: GENEROS,
    name: "gender",
    model: "",
    rules: "required",
  },
  {
    label: "Celular",
    prepend_icon: "mdi-cellphone",
    type: 1,
    name: "phone",
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
    label: "Dirección",
    prepend_icon: "mdi-home",
    type: 1,
    format: "text",
    name: "address",
    model: "",
    rules: "required|min:1|max:50",
  },
];

export const VALIDACIONES = [{ tipo: 2, nombres: ["doc_num"] }];
