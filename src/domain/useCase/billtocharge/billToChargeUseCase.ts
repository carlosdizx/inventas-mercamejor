import { Sale } from "@/domain/model/sale/Sale";
import {
  SAVE_NEW_BILL_TO_CHARGE,
  PAYMENTE_BILL_TO_CHARGE,
  FIND_BILL_TO_CHARGE,
} from "@/infrastructure/firebase/adapter/billtocharge/billToChargeAdapter";
import { SAVE_NEW_TRANSACTION } from "../transactionUseCase/transactionUseCase";
import {
  ETypeTransaction,
  Transaction,
} from "@/domain/model/transaction/Transaction";

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
  const newTransaction: Transaction = {
    document: docClient,
    amount: value,
    id: "",
    reference: "",
    type: ETypeTransaction.PAGO_CXC,
    created_at: new Date(),
    updated_at: new Date(),
  };
  await PAYMENTE_BILL_TO_CHARGE(docClient, value);
  await SAVE_NEW_TRANSACTION(newTransaction);
};
