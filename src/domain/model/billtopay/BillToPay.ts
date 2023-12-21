export interface BillToPay {
  id: string;
  doc_supp: string;
  nam_supp: string;
  sur_supp: string;
  value: number;
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

export const DOC_SUPP = "doc_supp";

export interface IUpdateMountPay {
  value: number;
}
