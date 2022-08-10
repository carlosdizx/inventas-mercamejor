import { ProductoCompra } from "./ProductoCompra";
export interface Compra {
  documento_proveedor: number | null | "";
  nombres_proveedor: string;
  apellidos_proveedor: string;
  fecha_documento: Date | string | null;
  cod_factura: string;
  tipo_compra: string;
  tipo_pago: string;
  fecha_pago: Date | string | null;
  fecha_llegada_producto: Date | string | null;
  compras: ProductoCompra[];
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
