import { Purchase } from "./../Purchase";
export interface PurchaseGateways {
  save(purchase: Purchase): Promise<void>;
}
