import { NewStateSale, Sale } from "@/domain/model/sale/Sale";
import {
  SAVE,
  UPDATE,
  CONSULT_DATA,
} from "@/infrastructure/firebase/template/basicOperations";
import { TIMESTAP_TO_DATE } from "../../Utilities";

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

export const FIND_SALES = async (
  initialDate: Date,
  finalDate: Date
): Promise<Sale[]> => {
  const sales = [] as Array<Sale>;
  const query = await CONSULT_DATA(purchaseCollection, [
    ["created_at", ">=", initialDate],
    ["created_at", "<=", finalDate],
  ]);
  if (!query.empty) {
    query.forEach((a) => {
      const saleData = a.data();
      sales.push({
        doc_client: saleData.doc_client,
        nam_client: saleData.nam_client,
        sur_client: saleData.sur_client,
        cod_invoice: saleData.cod_invoice,
        sale_type: saleData.sale_type,
        pay_type: saleData.pay_type,
        pay_date: TIMESTAP_TO_DATE(saleData.pay_date),
        box: saleData.box,
        sales: saleData.sales,
        subtotal: saleData.subtotal,
        discount: saleData.discount,
        taxes: saleData.taxes,
        total: saleData.total,
        state: saleData.state,
        created_at: TIMESTAP_TO_DATE(saleData.created_at),
        updated_at: TIMESTAP_TO_DATE(saleData.updated_at),
      } as Sale);
    });
    return sales;
  } else {
    return sales;
  }
};
