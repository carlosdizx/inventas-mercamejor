import { ProductoCompra } from "./ProductoCompra";
export interface Compra {
  documento_proveedor: number | null;
  nombres_proveedor: string;
  apellidos_proveedor: string;
  fecha_documento: Date;
  cod_factura: string;
  tipo_compra: string;
  tipo_pago: string;
  fecha_pago: Date;
  fecha_llegada_producto: Date;
  compras: ProductoCompra[];
  subtotal: number;
  descuento: number;
  impuesto: number;
  total: number;
  created_at: Date;
  updated_at: Date;
}
