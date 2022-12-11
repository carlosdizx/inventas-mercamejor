import { ETiposVenta } from "@/generals/Constantes";

export interface IInventario {
  fecha_factura: Date;
  created_at: Date;
  updated_at: Date;
  codigo_barras: string;
  cedula_nit: string;
  nombres: string;
  apellidos: string;
  tipo_factura: ETiposVenta;
  bodega: string;
  caja: string;
  productos: IProductosInventario[];
  documento: string;
}

export interface IProductosInventario {
  entradas: number;
  salidas: number;
  codigo_barras: string;
  descripcion: string;
}
