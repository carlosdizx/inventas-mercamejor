export const COLUMNAS = [
  { text: "Documento Proveedor", value: "cedula_proveedor" },
  { text: "Nombres Proveedor", value: "nombres_proveedor" },
  { text: "Apellidos Proveedor", value: "apellidos_proveedor" },
  { text: "Fecha de compra", value: "fecha_compra" },
  { text: "Fecha de creación de factura", value: "createdAt" },
  { text: "Fecha de Actualizacion", value: "updatedAt" },
  { text: "Valor Pendiente", value: "valor_debido" },
  { text: "Valor Total", value: "valor_total" },
  { text: "Código de factura", value: "codigo_factura" },
  { text: "Acciones", value: "acciones" },
];

export const CAMPOS = [
  {
    label: "Documento Proveedor",
    prepend_icon: "mdi-card-account-details",
    type: 1,
    name: "cedula_proveedor",
    model: "",
    rules: "required|max:25",
  },
  {
    label: "Nombres Proveedor",
    prepend_icon: "mdi-account",
    type: 1,
    format: "text",
    name: "nombres_proveedor",
    model: "",
    rules: "required|min:1|max:25",
  },
  {
    label: "Apellidos Proveedor",
    prepend_icon: "mdi-account",
    type: 1,
    format: "text",
    name: "apellidos_proveedor",
    model: "",
    rules: "required|min:1|max:25",
  },
  {
    label: "Fecha de compra",
    prepend_icon: "mdi-cake",
    type: 1,
    format: "date",
    name: "fecha_compra",
    model: "",
    rules: "required",
  },
  {
    label: "Fecha de creación de factura",
    prepend_icon: "mdi-cake",
    type: 1,
    format: "date",
    name: "createdAt",
    model: "",
    rules: "required",
  },
  {
    label: "Valor pendiente",
    prepend_icon: "mdi-cash-lock-open",
    type: 8,
    format: "total",
    name: "valor_debido",
    model: "",
    rules: "required|min:2|max:20",
  },
  {
    label: "Valor Total",
    prepend_icon: "mdi-cash-lock-open",
    type: 8,
    format: "total",
    name: "valor_total",
    model: "",
    rules: "required|min:2|max:20",
  },
  {
    label: "Código de factura",
    prepend_icon: "mdi-card-account-details",
    type: 1,
    name: "codigo_factura",
    model: "",
    rules: "required|max:25",
  },
];

export interface CuentaPorPagar {
  fecha_compra: Date | string | null;
  cedula_proveedor: number | "" | null;
  nombres_proveedor: string;
  apellidos_proveedor: string;
  codigo_factura: string;
  valor_total: number;
  valor_debido: number;
  estado: EstadoCuentaPorPagar;
  createdAt: Date;
  updatedAt: Date;
}

export enum EstadoCuentaPorPagar {
  PENDIENTE = "Pendiente",
  COMPLETADO = "Completado",
  REALIZADO = "Realizado",
  RECHAZADO = "Rechazado",
}
