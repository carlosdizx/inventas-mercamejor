import { NewStateSale, Sale } from "@/domain/model/sale/Sale";
import {
  SAVE,
  UPDATE,
} from "@/infrastructure/firebase/template/basicOperations";

const purchaseCollection = "sales";

export const SAVE_SALE = async (sale: Sale): Promise<Sale> => {
  await SAVE(purchaseCollection, sale);
  return sale;
};

export const UPDATE_SALE = async (
  idPurchase: string,
  newState: NewStateSale
): Promise<NewStateSale> => {
  return await UPDATE(purchaseCollection, idPurchase, newState);
};
