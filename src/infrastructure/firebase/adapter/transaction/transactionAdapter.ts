import { Transaction } from "@/domain/model/transaction/Transaction";
import { SAVE } from "@/infrastructure/firebase/template/basicOperations";

const transacionCollection = "transactions";

export const SAVE_TRANSACTION = async (
  transaction: Transaction
): Promise<Transaction> => {
  await SAVE(transacionCollection, transaction);
  return transaction;
};
