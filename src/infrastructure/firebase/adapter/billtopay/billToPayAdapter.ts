import {
  FIND_BY_QUERY,
  SAVE,
  UPDATE,
} from "@/infrastructure/firebase/template/basicOperations";
import {
  BillToPay,
  DOC_SUPP,
  EBillToPayState,
  IUpdateMountPay,
} from "@/domain/model/billtopay/BillToPay";
import { Purchase } from "@/domain/model/purchase/Purchase";

const billToPayCollection = "bill_to_pay";

export const SAVE_NEW_BILL_TO_PAY = async (
  purchase: Purchase
): Promise<void> => {
  const res = await FIND_BILL_TO_PAY(purchase.doc_supp);
  if (res) {
    const updateAmount: IUpdateMountPay = {
      value: purchase.total,
    };
    await UPDATE(billToPayCollection, res.id, updateAmount);
  } else {
    const newBillToPay: BillToPay = {
      id: "",
      doc_supp: purchase.doc_supp,
      nam_supp: purchase.nam_supp,
      sur_supp: purchase.sur_supp,
      value: purchase.total,
      state: EBillToPayState.PENDIENTE,
      create_at: new Date(),
      update_at: new Date(),
    };
    await SAVE(billToPayCollection, newBillToPay);
  }
};

export const FIND_BILL_TO_PAY = async (
  docClient: string
): Promise<BillToPay | null> => {
  const res = await FIND_BY_QUERY(
    billToPayCollection,
    DOC_SUPP,
    "==",
    docClient
  );
  if (res) {
    return res as BillToPay;
  } else {
    return null;
  }
};
