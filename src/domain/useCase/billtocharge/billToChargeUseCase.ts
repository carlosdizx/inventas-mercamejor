import { Sale } from "@/domain/model/sale/Sale";
import {
  SAVE_NEW_BILL_TO_CHARGE,
  PAYMENTE_BILL_TO_CHARGE,
  FIND_BILL_TO_CHARGE,
} from "@/infrastructure/firebase/adapter/billtocharge/billToChargeAdapter";

export const SAVE_BILL_TO_CHARGE = async (sale: Sale): Promise<void> => {
  return SAVE_NEW_BILL_TO_CHARGE(sale);
};

export const CONSULT_BALANCE_BILL_TO_PAY = async (
  docClient: string
): Promise<number> => {
  const consult = await FIND_BILL_TO_CHARGE(docClient);
  if (consult != null) {
    return consult.value;
  }
  return 0;
};

export const PAYMENT_BILL_TO_PAY = async (
  docClient: string,
  value: number
): Promise<void> => {
  await PAYMENTE_BILL_TO_CHARGE(docClient, value);
};
