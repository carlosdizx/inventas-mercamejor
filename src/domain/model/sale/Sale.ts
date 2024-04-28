import { EEstateSale, EPayTypeSale } from "../constants/Constants";
import { ProductSale } from "../productsale/ProductSale";

export interface Sale {
  doc_client: string;
  nam_client: string;
  sur_client: string;
  cod_invoice: string;
  sale_type: EPayTypeSale;
  pay_type: string;
  pay_date: Date;
  box: string;
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
