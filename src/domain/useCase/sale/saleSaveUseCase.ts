import { Sale, NewStateSale } from "@/domain/model/sale/Sale";
import {
  SAVE_SALE,
  UPDATE_SALE,
  FIND_SALES,
} from "@/infrastructure/firebase/adapter/sale/saleAdapter";
import { SAVE_INVENTORY_FROM_SALE } from "../inventory/inventoryUseCase";
import { UNITS_UPDATED_FROM_SALE } from "../product/productUseCase";
import { EEstateSale, EPayTypeSale } from "@/domain/model/constants/Constants";
import { SAVE_NEW_BILL_TO_CHARGE } from "@/infrastructure/firebase/adapter/billtocharge/billToChargeAdapter";

export const REGISTER_NEW_SALE = async (sale: Sale): Promise<boolean> => {
  await SAVE_SALE(sale);
  await SAVE_INVENTORY_FROM_SALE(sale);
  if (sale.sale_type === EPayTypeSale.CREDITO) {
    await SAVE_NEW_BILL_TO_CHARGE(sale);
  }
  await UNITS_UPDATED_FROM_SALE(sale);
  return true;
};

export const CANCEL_SALE = async (idPurchase: string): Promise<void> => {
  await UPDATE_SALE(idPurchase, {
    state: EEstateSale.CANCELADO,
  } as NewStateSale);
};

export const CONSULT_SALES = async (
  fechaInicial: string,
  fechaFinal: string
): Promise<Sale[]> => {
  const fecIni = new Date(fechaInicial);
  fecIni.setHours(fecIni.getHours() + 5);
  const fecFin = new Date(fechaFinal);
  fecFin.setHours(fecFin.getHours() + 5);

  fecIni.setDate(fecIni.getDate() + 1);
  fecFin.setDate(fecFin.getDate() + 1);

  return await FIND_SALES(fecIni, fecFin);
};
