export interface IProductoCompra {
  codigo_barras: number;
  descripcion_producto: string;
  bodega: string;
  cantidad: number;
  precio_compra: number;
  precio_venta: number;
  impuesto: number;
  descuento: number;
  subtotal: number;
}
