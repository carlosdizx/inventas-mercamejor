export interface ProductPurchase {
  cod_barras: number;
  descripcion: string;
  cantidad: number;
  prec_com: number;
  prec_ven: number;
  impuesto: number;
  descuento: number;
  subtotal: number;
}
