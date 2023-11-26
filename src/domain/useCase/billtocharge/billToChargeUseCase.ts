import { Purchase } from "@/domain/model/purchase/Purchase";
import { Sale } from "@/domain/model/sale/Sale";
import { SAVE_NEW_BILL_TO_CHARGE } from "@/infrastructure/firebase/adapter/billtocharge/billToChargeAdapter";

export const SAVE_BILL_TO_CHARGE = async (sale: Sale): Promise<BillToPay> => {
  return SAVE_NEW_BILL_TO_CHARGE(sale);
};
