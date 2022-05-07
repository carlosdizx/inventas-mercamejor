export interface ElementoCompra {
  codigo: string;
  descripcion_producto: string;
  bodega: string;
  cantidad: number;
  precio_compra: number;
  ganancia: number;
  precio_venta: number;
  impuesto: number;
  descuento: number;
  subtotal: number;
}
