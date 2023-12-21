export interface Inventory {
  id: string | null;
  date: Date;
  cod_invoice: string;
  products: InventoryProduct[];
  state: EInventoryState;
  created_at: Date;
  updated_at: Date;
}

export interface InventoryProduct {
  input: number;
  output: number;
  bar_code: number;
  description: string;
  store: string;
}

export enum EInventoryState {
  APROBADO = "Aprobado",
  CANCELADO = "Cancelado",
}
