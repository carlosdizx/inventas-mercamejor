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
];

/**
 Sección formulario
 */
import { LISTAR_PRODUCTOS } from "@/generals/Funciones";

const productos: any[] = [];
const listadoProductos = async () => {
  (await LISTAR_PRODUCTOS()).forEach((prod) => productos.push(prod.data()));
  return productos;
};

listadoProductos().then();

export const CAMPOS = [
  {
    label: "Nombres",
    prepend_icon: "mdi-cube",
    type: 1,
    format: "text",
    name: "nombres",
    model: "",
    rules: "required|min:1|max:50",
  },
  {
    label: "Apellidos",
    prepend_icon: "mdi-cube",
    type: 1,
    format: "text",
    name: "apellidos",
    model: "",
    rules: "required|min:1|max:50",
  },
  {
    label: "Nit/Cedula",
    prepend_icon: "mdi-cube",
    type: 1,
    format: "number",
    name: "documento",
    model: "",
    rules: "required|min:6|max:20|numeric",
  },
  {
    label: "Celular",
    prepend_icon: "mdi-cube",
    type: 1,
    format: "number",
    name: "celular",
    model: "",
    rules: "required|min:2|max:20|numeric",
  },
  {
    label: "Correo",
    prepend_icon: "mdi-cube",
    type: 1,
    format: "email",
    name: "correo",
    model: "",
    rules: "required|email",
  },
  {
    label: "Direccion",
    prepend_icon: "mdi-cube",
    type: 1,
    format: "text",
    name: "direccion",
    model: "",
    rules: "required|min:1|max:50",
  },
  {
    label: "Genero",
    prepend_icon: "mdi-cube",
    type: 6,
    multiple: false,
    solo: true,
    items: ["Masculino", "Femenino", "Otro"],

    format: "text",
    name: "genero",
    model: "",
    rules: "required|min:1|max:50",
  },
];
