export interface ProductoCompra {
  created_at: Date;
  descripcion_producto: string;
  documento_proveedor: number;
  nombre_proveedor: string;
  cod_factura: string;
  tipo_compra: string;
  tipo_pago: string;
  fecha_pago: Date;
  fecha_llegada_producto: Date;
  codigo_barras: string;
  bodega: string;
  precio_compra: number;
  precio_venta: number;
  impuesto: number;
  descuento: number;
  subtotal: number;
}
