import { ElementoCompra } from "./ElementoCompra";
export interface Compras {
  documento: number;
  proveedor: string;
  fecha_compra: Date;
  tipo_compra: Date;
  documento_compra: string;
  tipo_pago: string;
  fecha_pago: Date;
  fecha_llegada_producto: Date;
  subtotal: number;
  descuento: number;
  impuesto: number;
  compras: Array<ElementoCompra>;
}
