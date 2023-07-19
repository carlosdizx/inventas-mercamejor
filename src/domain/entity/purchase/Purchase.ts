import { ProductPurchase } from "../productpurchase/ProductPurchase";
import { ETiposContadoCredito } from "../constants/Constants";
import { EEstadoVenta } from "../constants/Constants";

export interface Purchase {
  doc_cliente: number;
  nom_cliente: string;
  ape_cliente: string;
  fec_documento: Date;
  cod_factura: string;
  tipo_compra: ETiposContadoCredito;
  tipo_pago: string;
  fecha_pago: Date;
  fecha_llegada: Date;
  caja: string;
  ventas: ProductPurchase[];
  subtotal: number;
  descuento: number;
  impuesto: number;
  total: number;
  estado: EEstadoVenta;
  created_at: Date;
  updated_at: Date;
}
