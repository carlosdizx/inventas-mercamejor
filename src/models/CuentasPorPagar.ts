export const COLUMNAS = [
  { text: "Documento Proveedor", value: "documento_proveedor" },
  { text: "Nombre Proveedor", value: "nombre_proveedor" },
  { text: "Fecha de llegada compra", value: "fecha_llegada_producto" },
  { text: "Fecha de creación de factura", value: "created_at" },
  { text: "Valor", value: "total" },
  { text: "Código de factura", value: "cod_factura" },
  { text: "Acciones", value: "acciones" },
];

export const CAMPOS = [
  {
    label: "Nombre Proveedor",
    prepend_icon: "mdi-account",
    type: 1,
    format: "text",
    name: "nombre_proveedor",
    model: "",
    rules: "required|min:1|max:25",
  },
  {
    label: "Documento Proveedor",
    prepend_icon: "mdi-card-account-details",
    type: 1,
    name: "documento_proveedor",
    model: "",
    rules: "required|max:25",
  },
  {
    label: "Fecha de llegada compra",
    prepend_icon: "mdi-cake",
    type: 1,
    format: "date",
    name: "fecha_llegada_producto",
    model: "",
    rules: "required",
  },
  {
    label: "Fecha de creación de factura",
    prepend_icon: "mdi-cake",
    type: 1,
    format: "date",
    name: "created_at",
    model: "",
    rules: "required",
  },
  {
    label: "Valor",
    prepend_icon: "mdi-cash-lock-open",
    type: 8,
    format: "total",
    name: "precio_unitario_compra",
    model: "",
    rules: "required|min:2|max:20",
  },
  {
    label: "Código de factura",
    prepend_icon: "mdi-card-account-details",
    type: 1,
    name: "cod_factura",
    model: "",
    rules: "required|max:25",
  },
];

export interface CuentaPorPagar {
  fecha_compra: Date;
  cedula_proveedor: number | "";
  nombres_proveedor: string;
  apellidos_proveedor: string;
  codigo_factura: string;
  valor_total: number;
  createdAt: Date;
  updatedAt: Date;
}
