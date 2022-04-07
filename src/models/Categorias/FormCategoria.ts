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
    items: [{ id: 1, name: "xd" }],
    name: "subcategorias",
    llave: "name",
    model: "",
    multiple: true,
    rules: "required",
  },
];
