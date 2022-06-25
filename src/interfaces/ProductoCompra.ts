export interface ProductoCompra {
  codigo_barras: number | null;
  descripcion_producto: string;
  bodega: string;
  cantidad: number;
  precio_compra: number;
  precio_venta: number;
  impuesto: number;
  descuento: number;
  subtotal: number;
}
