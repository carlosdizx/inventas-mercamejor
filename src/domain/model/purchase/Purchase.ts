import { ProductPurchase } from "../productpurchase/ProductPurchase";
import { EEstadoVenta } from "../constants/Constants";

export interface Purchase {
  id: string;
  doc_client: number;
  nam_client: string;
  sur_client: string;
  cod_purchase: string;
  type_pay: EPayTypePurchase;
  cash_register: string;
  employee: string;
  subtotal: number;
  total: number;
  taxes: number;
  discount: number;
  sales: ProductPurchase[];
  state: EEstadoVenta;
  created_at: Date;
  updated_at: Date;
}

export enum EPayTypePurchase {
  CONTADO = "Contado",
  CREDITO = "Credito",
}
