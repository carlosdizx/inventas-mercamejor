import { NewStatePurchase } from "@/domain/model/purchase/Purchase";
import { Sale } from "@/domain/model/sale/Sale";
import { SAVE, UPDATE } from "../../template/basicOperations";

const purchaseCollection = "sales";

export const SAVE_SALE = async (purchase: Sale): Promise<Sale> => {
  await SAVE(purchaseCollection, purchase);
  return purchase;
};

export const UPDATE_SALE = async (
  idPurchase: string,
  newState: NewStatePurchase
): Promise<NewStatePurchase> => {
  return await UPDATE(purchaseCollection, idPurchase, newState);
};
