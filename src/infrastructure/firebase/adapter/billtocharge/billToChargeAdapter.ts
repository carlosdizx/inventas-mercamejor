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
import { SAVE_NEW_TRANSACTION } from "@/domain/useCase/transactionUseCase/transactionUseCase";
import {
  ETypeTransaction,
  Transaction,
} from "@/domain/model/transaction/Transaction";

const billToPayCollection = "bill_to_charge";

export const SAVE_NEW_BILL_TO_CHARGE = async (sale: Sale): Promise<void> => {
  const res = await FIND_BILL_TO_CHARGE(sale.doc_client);
  console.log("res");
  const newTransaction: Transaction = {
    document: sale.doc_client,
    amount: sale.total,
    id: "",
    reference: "",
    type: ETypeTransaction.CARGO_CXC,
    created_at: new Date(),
    updated_at: new Date(),
  };
  if (res) {
    const updateAmount: IUpdateMountCharge = {
      value: res.value + sale.total,
    };
    await UPDATE(billToPayCollection, res.id, updateAmount);
    await SAVE_NEW_TRANSACTION(newTransaction);
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
    await SAVE_NEW_TRANSACTION(newTransaction);
  }
};

export const PAYMENTE_BILL_TO_CHARGE = async (
  docClient: string,
  value: number
): Promise<void> => {
  const res = await FIND_BILL_TO_CHARGE(docClient);
  if (res) {
    const updateAmount: IUpdateMountCharge = {
      value: res.value - value,
    };
    await UPDATE(billToPayCollection, res.id, updateAmount);
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
    return {
      ...res.data(),
      id: res.id,
    } as BillToCharge;
  } else {
    return null;
  }
};
