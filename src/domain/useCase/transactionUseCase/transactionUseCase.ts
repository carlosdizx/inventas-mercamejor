import { Transaction } from "@/domain/model/transaction/Transaction";
import { SAVE_TRANSACTION } from "@/infrastructure/firebase/adapter/transaction/transactionAdapter";

export const SAVE_NEW_TRANSACTION = async (
  transaction: Transaction
): Promise<Transaction> => {
  await SAVE_TRANSACTION(transaction);
  return transaction;
};

//export const SAVE_NEW_MOVEMENT = async (transaction: Transaction): Promise<void>
