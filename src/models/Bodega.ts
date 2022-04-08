/**
Sección tabla
 */
export const COLUMNAS = [
  { text: "Detalle", value: "detalle" },
  { text: "Nombre", value: "nombre" },
  { text: "Dirección", value: "direccion" },
  { text: "Acciones", value: "acciones" },
];

/**
Sección formulario
 */
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
    label: "Dirección",
    prepend_icon: "mdi-home",
    type: 1,
    format: "text",
    name: "direccion",
    model: "",
    rules: "required|min:2|max:70",
  },
];
