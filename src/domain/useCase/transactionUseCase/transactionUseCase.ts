import { Transaction } from "@/domain/model/transaction/Transaction";
import {
  FIND_TRANSACTIONS_BY_DOCUMENT,
  SAVE_TRANSACTION,
} from "@/infrastructure/firebase/adapter/transaction/transactionAdapter";

export const SAVE_NEW_TRANSACTION = async (
  transaction: Transaction
): Promise<Transaction> => {
  await SAVE_TRANSACTION(transaction);
  return transaction;
};

export const LIST_TRANSACTION_BY_CLIENT = async (
  docClient: string
): Promise<Transaction[]> => {
  return await FIND_TRANSACTIONS_BY_DOCUMENT(docClient);
};
