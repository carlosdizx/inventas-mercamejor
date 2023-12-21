import { Purchase } from "@/domain/model/purchase/Purchase";
import { SAVE_NEW_BILL_TO_PAY } from "@/infrastructure/firebase/adapter/billtopay/billToPayAdapter";

export const SAVE_BILL_TO_PAY = async (purchase: Purchase): Promise<void> => {
  await SAVE_NEW_BILL_TO_PAY(purchase);
};
