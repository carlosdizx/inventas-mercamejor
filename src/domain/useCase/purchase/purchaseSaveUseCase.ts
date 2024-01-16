import { Purchase } from "@/domain/model/purchase/Purchase";
import {
  SAVE_PURCHASE,
  UPDATE_PURCHASE,
} from "@/infrastructure/firebase/adapter/purchase/purchaseAdapter";
//import { SAVE_INVENTORY_FROM_PURCHASE } from "../inventory/inventoryUseCase";
import { SAVE_BILL_TO_PAY } from "../billtopay/billToPayUseCase";
//import { UNITS_UPDATED_FROM_PURCHASE } from "../product/productUseCase";
import {
  EEstatePurchase,
  EPayTypePurchase,
} from "@/domain/model/constants/Constants";
import { NewStatePurchase } from "@/domain/model/purchase/Purchase";

export const REGISTER_NEW_PURCHASE = async (
  purchase: Purchase
): Promise<boolean> => {
  await SAVE_PURCHASE(purchase);
  //await SAVE_INVENTORY_FROM_PURCHASE(purchase);
  if (purchase.type_pay === EPayTypePurchase.CREDITO) {
    await SAVE_BILL_TO_PAY(purchase);
  }
  //await UNITS_UPDATED_FROM_PURCHASE(purchase);
  return true;
};

export const CANCEL_PURCHASE = async (idPurchase: string): Promise<void> => {
  await UPDATE_PURCHASE(idPurchase, {
    state: EEstatePurchase.CANCELADO,
  } as NewStatePurchase);
};
