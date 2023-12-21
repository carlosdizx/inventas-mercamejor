import { IProductoVenta } from "./ProductoVenta";
import { ETiposContadoCredito } from "@/generals/Constantes";

export interface IVenta {
  doc_cliente: string;
  nom_cliente: string;
  ape_cliente: string;
  fec_documento: Date;
  cod_factura: string;
  tipo_compra: ETiposContadoCredito;
  tipo_pago: string;
  fecha_pago: Date;
  fecha_llegada: Date;
  caja: string;
  ventas: IProductoVenta[];
  subtotal: number;
  descuento: number;
  impuesto: number;
  total: number;
  estado: IEstadoVenta;
  created_at: Date;
  updated_at: Date;
}

export enum IEstadoVenta {
  APROBADO = "Aprobado",
  CANCELADO = "Cancelado",
}
