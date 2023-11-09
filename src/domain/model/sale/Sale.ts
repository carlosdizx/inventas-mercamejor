import { EEstateSale, EPayTypePurchase } from "../constants/Constants";
import { ProductSale } from "../productsale/ProductSale";

export interface Sale {
  doc_client: number;
  nam_client: string;
  sur_client: string;
  cod_invoice: string;
  shop_type: EPayTypePurchase;
  pay_type: string;
  pay_date: Date;
  caja: string;
  sales: ProductSale[];
  subtotal: number;
  discount: number;
  taxes: number;
  total: number;
  state: EEstateSale;
  created_at: Date;
  updated_at: Date;
}

export interface NewStateSale {
  state: EEstateSale;
}
