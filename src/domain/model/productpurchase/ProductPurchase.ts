export interface ProductPurchase {
  id: string;
  cod_barras: number;
  descripcion: string;
  cantidad: number;
  prec_com: number;
  prec_ven: number;
  impuesto: number;
  descuento: number;
  subtotal: number;
}
