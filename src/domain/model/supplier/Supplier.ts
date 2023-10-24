export interface ProductPurchase {
    id: string;
    bar_code: number;
    description: string;
    amount: number;
    price_shop: number;
    price_purchase: number;
    taxes: number;
    discount: number;
    subtotal: number;
  }
  