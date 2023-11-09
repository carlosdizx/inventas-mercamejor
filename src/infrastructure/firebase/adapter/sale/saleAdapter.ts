import { NewStatePurchase } from "@/domain/model/purchase/Purchase";
import { Purchase } from "@/domain/model/purchase/Purchase";
import { SAVE, UPDATE } from "../../template/basicOperations";

const purchaseCollection = "sales";

export const SAVE_SALE = async (purchase: Purchase): Promise<Purchase> => {
  await SAVE(purchaseCollection, purchase);
  return purchase;
};

export const UPDATE_SALE = async (
  idPurchase: string,
  newState: NewStatePurchase
): Promise<NewStatePurchase> => {
  return await UPDATE(purchaseCollection, idPurchase, newState);
};
