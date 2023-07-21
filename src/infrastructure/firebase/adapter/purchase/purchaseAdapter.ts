import { Purchase } from "@/domain/model/purchase/Purchase";
import { GUARDAR } from "../../template/basicOperations";

const purchaseCollection = "purchases";

export const SAVE_PURCHASE = async (purchase: Purchase): Promise<Purchase> => {
  await GUARDAR(purchaseCollection, purchase);
  return purchase;
};
