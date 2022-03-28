import { LISTAR_PRODUCTOS } from "@/generals/Funciones";

const productos: any[] = [];
const listadoProductos = async () => {
  (await LISTAR_PRODUCTOS()).forEach((prod) => productos.push(prod.data()));
  return productos;
};

listadoProductos().then();

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
    label: "Documento",
    prepend_icon: "mdi-cube",
    type: 1,
    format: "number",
    name: "documento",
    model: "",
    rules: "required|min:2|max:20|numeric",
  },
  {
    label: "Productos",
    prepend_icon: "mdi-account-group",
    type: 2,
    items: productos,
    name: "productos",
    llave: "nombre",
    model: "",
    multiple: true,
    rules: "required",
  },
];
