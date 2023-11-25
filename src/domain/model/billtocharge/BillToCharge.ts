export interface BillToCharge {
  id: string;
  doc_client: string;
  nam_client: string;
  sur_client: string;
  total: number;
  pays: Payment[];
  state: EBillToPayState;
  create_at: Date;
  update_at: Date;
}

export interface Payment {
  id: string;
  box: string;
  value: number;
  state: EbillToPayMovState;
  created_at: Date;
  updated_at: Date;
}

export enum EBillToPayState {
  ACTIVO = "Activo",
  INACTIVO = "Inactivo",
}

export enum EbillToPayMovState {
  COMPLETADO = "Completado",
  CANCELADO = "Cancelado",
}
