export interface BillToPay {
  id: string;
  doc_supp: number;
  nam_supp: string;
  sur_supp: string;
  cod_purchase: string;
  total: number;
  debt_value: number;
  pays: Payment[];
  state: EBillToPayState;
  create_at: Date;
  update_at: Date;
}

export interface Payment {
  doc_payment: string;
  names: string;
  box: string;
  value: number;
  state: EbillToPayMovState;
  created_at: Date;
  updated_at: Date;
}

export enum EBillToPayState {
  PENDIENTE = "Pendiente",
  COMPLETADO = "Completado",
  REALIZADO = "Realizado",
  RECHAZADO = "Rechazado",
}

export enum EbillToPayMovState {
  COMPLETADO = "Completado",
  CANCELADO = "Cancelado",
}
