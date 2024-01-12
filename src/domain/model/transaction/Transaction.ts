export interface Transaction {
  id: string;
  document: string;
  type: ETypeTransaction;
  amount: number;
  reference: string;
  created_at: Date;
  updated_at: Date;
}

export enum ETypeTransaction {
  CARGO_CXP = "CARGOCXP",
  CARGO_CXC = "CARGOCXP",
  PAGO_CXP = "PAGOCXP",
  PAGO_CXC = "PAGOCXC",
}

export const DOCUMENT_PROPERTY = "document";
