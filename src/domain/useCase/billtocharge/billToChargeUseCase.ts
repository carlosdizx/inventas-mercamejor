import { BillToPay, EBillToPayState } from "@/domain/model/billtopay/BillToPay";
import { Purchase } from "@/domain/model/purchase/Purchase";
import { SAVE_Bill_TO_PAY } from "@/infrastructure/firebase/adapter/billtopay/billToPayAdapter";

export const SAVE_BILL_TO_PAY = async (sale: Purchase): Promise<BillToPay> => {
  const newBillToPay: BillToPay = {
    id: "",
    doc_supp: sale.doc_supp,
    nam_supp: sale.nam_supp,
    sur_supp: sale.sur_supp,
    cod_purchase: sale.cod_purchase,
    total: sale.total,
    debt_value: sale.total,
    pays: [],
    state: EBillToPayState.PENDIENTE,
    create_at: new Date(),
    update_at: new Date(),
  };
  return SAVE_Bill_TO_PAY(newBillToPay);
};
