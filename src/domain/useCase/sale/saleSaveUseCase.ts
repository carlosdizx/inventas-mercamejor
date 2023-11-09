import {
  EPayTypePurchase,
  NewStatePurchase,
  Purchase,
} from "@/domain/model/purchase/Purchase";
import {
  SAVE_PURCHASE,
  UPDATE_PURCHASE,
} from "@/infrastructure/firebase/adapter/purchase/purchaseAdapter";
import { SAVE_INVENTORY_FROM_SALE } from "../inventory/inventoryUseCase";
import { SAVE_BILL_TO_PAY } from "../billtopay/billToPayUseCase";
import { UNITS_UPDATED_FROM_PURCHASE } from "../product/productUseCase";
import { EEstadoVenta } from "@/domain/model/constants/Constants";

export const REGISTER_NEW_SALE = async (shop: Purchase): Promise<boolean> => {
  await SAVE_PURCHASE(shop);
  //await SAVE_INVENTORY_FROM_SALE(shop);
  //if (shop.type_pay === EPayTypePurchase.CREDITO) {
  //  SAVE_BILL_TO_PAY(shop);
  //}
  await UNITS_UPDATED_FROM_PURCHASE(shop);
  return true;
};

export const CANCEL_SALE = async (idPurchase: string): Promise<void> => {
  await UPDATE_PURCHASE(idPurchase, {
    state: EEstadoVenta.CANCELADO,
  } as NewStatePurchase);
};
