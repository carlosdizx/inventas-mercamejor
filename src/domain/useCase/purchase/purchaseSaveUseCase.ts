import { EPayTypePurchase, Purchase } from "@/domain/model/purchase/Purchase";
import { SAVE_PURCHASE } from "@/infrastructure/firebase/adapter/purchase/purchaseAdapter";
import { SAVE_INVENTORY_FROM_SALE } from "../inventory/inventoryUseCase";
import { SAVE_BILL_TO_PAY } from "../billtopay/billToPayUseCase";
import { UNITS_UPDATED_FROM_PURCHASE } from "../product/productUseCase";

export const REGISTRAR_NUEVA_VENTA = async (
  sale: Purchase
): Promise<boolean> => {
  await SAVE_PURCHASE(sale);
  await SAVE_INVENTORY_FROM_SALE(sale);
  if (sale.type_pay === EPayTypePurchase.CREDITO) {
    SAVE_BILL_TO_PAY(sale);
  }
  await UNITS_UPDATED_FROM_PURCHASE(sale);
  return true;
};
