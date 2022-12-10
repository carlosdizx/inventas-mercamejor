import { ETiposVenta } from "@/generals/Constantes";

export interface IVenta {
  documento: string;
  nombres: string;
  apellidos: string;
  tipo_venta: ETiposVenta;
  subtotal: number;
  descuento: number;
  total: number;
  productos: IProductoVenta[];
  fecha_pago: Date;
}

export interface IProductoVenta {
  codigo: string;
  descripcion: string;
  cantidad: number;
  precio_unitario: number;
  descuento_unitario: number;
  subtotal: number;
}
