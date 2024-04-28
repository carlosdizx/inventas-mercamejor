import {
  DOCUMENT_PROPERTY,
  Transaction,
} from "@/domain/model/transaction/Transaction";
import {
  FIND_BY_QUERY_DOCS,
  SAVE,
} from "@/infrastructure/firebase/template/basicOperations";
import { DocumentData } from "firebase/firestore";

const transacionCollection = "transactions";

export const SAVE_TRANSACTION = async (
  transaction: Transaction
): Promise<Transaction> => {
  await SAVE(transacionCollection, transaction);
  return transaction;
};

export const FIND_TRANSACTIONS_BY_DOCUMENT = async (
  docClient: string
): Promise<Transaction[]> => {
  const result = await FIND_BY_QUERY_DOCS(
    transacionCollection,
    DOCUMENT_PROPERTY,
    "==",
    docClient
  );
  if (result !== null) {
    const transactions = [] as Array<Transaction>;
    result.forEach((trx: DocumentData) => {
      const data = trx.data();
      const newTrx = {
        id: trx.id,
        document: data.document,
        type: data.type,
        amount: data.amount,
        reference: data.reference,
        created_at: new Date(data.created_at.seconds * 1000),
        updated_at: new Date(data.updated_at.seconds * 1000),
      } as Transaction;
      transactions.push(newTrx);
    });
    return transactions;
  }
  return [];
};
