export interface Transaction {
  id: string;
  document: string;
  type: ETypeTransaction;
  amount: string;
  reference: string;
  created_at: Date;
  updated_at: Date;
}

export enum ETypeTransaction {
  PAGO_CXP = "PAGOCXP",
  PAGO_CXC = "PAGOCXC",
}
