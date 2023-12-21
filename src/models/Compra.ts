import { ETiposContadoCredito, ETypesShop } from "@/generals/Constantes";
import { IProductoCompra } from "./ProductoCompra";

export const COLUMNAS = [
  { text: "Nombre Proveedor", value: "nom_proveedor" },
  { text: "Fecha del documento", value: "fec_documento" },
  { text: "Código de factura", value: "cod_factura" },
  { text: "Tipo de compra", value: "tipo_compra" },
  { text: "Tipo de pago", value: "tipo_pago" },
  { text: "Fecha de pago", value: "fecha_pago" },
  { text: "Fecha de llegada del producto", value: "fecha_llegada" },
  { text: "Caja", value: "caja" },
  { text: "Subtotal", value: "subtotal" },
  { text: "Descuento", value: "descuento" },
  { text: "Impuesto", value: "impuesto" },
  { text: "Total", value: "total" },
  { text: "Fecha de creacion", value: "created_at" },
  { text: "Fecha de Actualizacion", value: "updated_at" },
  { text: "Estado", value: "estado" },
  { text: "Acciones", value: "acciones" },
];

export interface ICompra {
  doc_proveedor: number;
  nom_proveedor: string;
  ape_proveedor: string;
  fec_documento: Date;
  cod_factura: string;
  tipo_compra: ETiposContadoCredito;
  tipo_pago: ETypesShop;
  fecha_pago: Date;
  fecha_llegada: Date;
  caja: string;
  compras: IProductoCompra[];
  subtotal: number;
  descuento: number;
  impuesto: number;
  total: number;
  estado: EstadoCompra;
  created_at: Date;
  updated_at: Date;
}

export enum EstadoCompra {
  APROBADO = "Aprobado",
  CANCELADO = "Cancelado",
}
