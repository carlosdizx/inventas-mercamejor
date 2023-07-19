import { Purchase } from "@/domain/entity/purchase/Purchase";
import { PurchaseGateways } from "@/domain/entity/purchase/gateways/purchaseGateways";

export const savePurchase = (purchase: Purchase): Promise<void> => {
  const purchaseGateways: PurchaseGateways = new PurchaseGateways();
  purchaseGateways.save(purchase);
};
