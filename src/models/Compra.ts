import { IProductoCompra } from "./ProductoCompra";

export const COLUMNAS = [
  { text: "Nombre Proveedor", value: "nombre_proveedor" },
  { text: "Fecha del documento", value: "fecha_documento" },
  { text: "Código de factura", value: "cod_factura" },
  { text: "Tipo de compra", value: "tipo_compra" },
  { text: "Tipo de pago", value: "tipo_pago" },
  { text: "Fecha de pago", value: "fecha_pago" },
  { text: "Fecha de llegada del producto", value: "fecha_llegada_producto" },
  { text: "Subtotal", value: "subtotal" },
  { text: "Descuento", value: "descuento" },
  { text: "Impuesto", value: "impuesto" },
  { text: "Total", value: "total" },
  { text: "Fecha de creacion", value: "created_at" },
  { text: "Fecha de Actualizacion", value: "updated_at" },
  { text: "Acciones", value: "acciones" },
];

export interface ICompra {
  documento_proveedor: number;
  nombres_proveedor: string;
  apellidos_proveedor: string;
  fecha_documento: Date;
  cod_factura: string;
  tipo_compra: string;
  tipo_pago: string;
  fecha_pago: Date;
  fecha_llegada_producto: Date;
  compras: IProductoCompra[];
  subtotal: number;
  descuento: number;
  impuesto: number;
  total: number;
  estado: EstadoCompra;
  created_at: Date;
  updated_at: Date;
}

export enum EstadoCompra {
  APROBADO = "Aprobado",
  CANCELADO = "Cancelado",
}
