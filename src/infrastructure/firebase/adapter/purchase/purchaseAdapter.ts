import { NewStatePurchase } from "./../../../../domain/model/purchase/Purchase";
import { Purchase } from "@/domain/model/purchase/Purchase";
import { SAVE, UPDATE } from "../../template/basicOperations";

const purchaseCollection = "purchases";

export const SAVE_PURCHASE = async (purchase: Purchase): Promise<Purchase> => {
  await SAVE(purchaseCollection, purchase);
  return purchase;
};

export const UPDATE_PURCHASE = async (
  idPurchase: string,
  newState: NewStatePurchase
): Promise<NewStatePurchase> => {
  return await UPDATE(purchaseCollection, idPurchase, newState);
};
