import { SAVE } from "../../template/basicOperations";
import { BillToPay } from "@/domain/model/billtopay/BillToPay";

const inventoryCollection = "bill_to_pays";

export const SAVE_Bill_TO_PAY = async (
  billToPay: BillToPay
): Promise<BillToPay> => {
  await SAVE(inventoryCollection, billToPay);
  return billToPay;
};
