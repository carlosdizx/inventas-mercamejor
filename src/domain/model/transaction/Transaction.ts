export interface Transaction {
  id: string;
  type: string;
}

export enum ETypeTransaction {
    PAGO_CXP = "PAGOCXP",
    PAGO_CXC = "PAGOCXC",
}
