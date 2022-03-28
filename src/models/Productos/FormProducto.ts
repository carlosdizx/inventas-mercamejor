import { LISTAR_CATEGORIAS } from "@/generals/Funciones";

const categorias: any[] = [];
const listadoCategorias = async () => {
  (await LISTAR_CATEGORIAS()).forEach((cat) => categorias.push(cat.data()));
  return categorias;
};

listadoCategorias().then();

export const CAMPOS = [
  {
    label: "Nombre",
    prepend_icon: "mdi-cube",
    type: 1,
    format: "text",
    name: "nombre",
    model: "",
    rules: "required|min:1|max:50",
  },
  {
    label: "Precio compra",
    prepend_icon: "mdi-cube",
    type: 1,
    format: "number",
    name: "precio_compra",
    model: "",
    rules: "required|min:2|max:20|numeric",
  },
  {
    label: "Precio venta",
    prepend_icon: "mdi-cube",
    type: 1,
    format: "number",
    name: "precio_venta",
    model: "",
    rules: "required|min:2|max:20|numeric",
  },
  {
    label: "Categoria",
    prepend_icon: "mdi-account-group",
    type: 2,
    items: categorias,
    name: "categorias",
    llave: "nombre",
    model: "",
    multiple: true,
    rules: "required",
  },
];
