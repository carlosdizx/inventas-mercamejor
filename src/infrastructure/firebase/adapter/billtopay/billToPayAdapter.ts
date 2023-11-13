import { SAVE } from "../../template/basicOperations";
import { BillToPay } from "@/domain/model/billtopay/BillToPay";

const billToPayCollection = "bill_to_pays";

export const SAVE_Bill_TO_PAY = async (
  billToPay: BillToPay
): Promise<BillToPay> => {
  await SAVE(billToPayCollection, billToPay);
  return billToPay;
};
