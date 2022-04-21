/**
Sección tabla
 */
export const COLUMNAS = [
  { text: "Detalle", value: "detalle" },
  { text: "Nombre", value: "nombre" },
  { text: "Acciones", value: "acciones" },
];

/**
Sección formulario
 */
import { LISTAR_SUBCATEGORIAS } from "@/generals/Funciones";

const subcategorias: any[] = [];
const listadoCategorias = async () => {
  (await LISTAR_SUBCATEGORIAS()).forEach((cat) =>
    subcategorias.push(cat.data())
  );
  return subcategorias;
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
    label: "Subcategorias",
    prepend_icon: "mdi-cube",
    type: 2,
    items: [],
    name: "subcategorias",
    llave: "nombre",
    model: "",
    multiple: true,
    rules: "required",
  },
];
