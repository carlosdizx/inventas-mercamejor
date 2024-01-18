export interface Product {
  id: string;
  bar_code: string;
  name: string;
  description: string;
  amount: number;
  unit_price: number;
  sale_price: number;
  category: string;
  created_at: Date;
  updated_at: Date;
}

export interface ProductToList {
  id: string;
  bar_code: string;
  name: string;
  unit_price: number;
  sale_price: number;
}

export const BAR_CODE = "bar_code";

export interface UpdatedProduct {
  amount: number;
  unit_price: number;
  sale_price: number;
}
