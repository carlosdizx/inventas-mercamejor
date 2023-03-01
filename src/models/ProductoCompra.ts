export interface IProductoCompra {
  cod_barras: number;
  descripcion: string;
  bodega: string;
  cantidad: number;
  prec_com: number;
  prec_ven: number;
  impuesto: number;
  descuento: number;
  subtotal: number;
}
