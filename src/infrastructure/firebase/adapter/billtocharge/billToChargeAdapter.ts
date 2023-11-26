import {
  FIND_BY_QUERY,
  SAVE,
  UPDATE,
} from "@/infrastructure/firebase/template/basicOperations";
import { Sale } from "@/domain/model/sale/Sale";
import {
  BillToCharge,
  DOC_CLIENT,
  EBillToChargeState,
  IUpdateMountCharge,
} from "@/domain/model/billtocharge/BillToCharge";

const billToPayCollection = "bill_to_charge";

export const SAVE_NEW_BILL_TO_CHARGE = async (sale: Sale): Promise<void> => {
  const res = await FIND_BILL_TO_CHARGE(sale.doc_client);
  if (res) {
    const updateAmount: IUpdateMountCharge = {
      value: sale.total,
    };
    await UPDATE(billToPayCollection, res.id, updateAmount);
  } else {
    const purchasenewBillToCharge: BillToCharge = {
      id: "",
      doc_client: sale.doc_client,
      nam_client: sale.nam_client,
      sur_client: sale.sur_client,
      value: sale.total,
      state: EBillToChargeState.ACTIVO,
      create_at: new Date(),
      update_at: new Date(),
    };
    await SAVE(billToPayCollection, purchasenewBillToCharge);
  }
};

export const FIND_BILL_TO_CHARGE = async (
  docClient: string
): Promise<BillToCharge | null> => {
  const res = await FIND_BY_QUERY(
    billToPayCollection,
    DOC_CLIENT,
    "==",
    docClient
  );
  if (res) {
    return res as BillToCharge;
  } else {
    return null;
  }
};
