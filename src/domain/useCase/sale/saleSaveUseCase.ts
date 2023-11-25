import { Sale, NewStateSale } from "@/domain/model/sale/Sale";
import {
  SAVE_SALE,
  UPDATE_SALE,
} from "@/infrastructure/firebase/adapter/sale/saleAdapter";
import { SAVE_INVENTORY_FROM_SALE } from "../inventory/inventoryUseCase";
import { SAVE_BILL_TO_PAY } from "../billtopay/billToPayUseCase";
import { UNITS_UPDATED_FROM_SALE } from "../product/productUseCase";
import { EEstateSale, EPayTypeSale } from "@/domain/model/constants/Constants";

export const REGISTER_NEW_SALE = async (sale: Sale): Promise<boolean> => {
  await SAVE_SALE(sale);
  await SAVE_INVENTORY_FROM_SALE(sale);
  if (sale.shop_type === EPayTypeSale.CREDITO) {
    SAVE_BILL_TO_PAY(sale);
  }
  await UNITS_UPDATED_FROM_SALE(sale);
  return true;
};

export const CANCEL_SALE = async (idPurchase: string): Promise<void> => {
  await UPDATE_SALE(idPurchase, {
    state: EEstateSale.CANCELADO,
  } as NewStateSale);
};
