import { ETiposContadoCredito } from "@/generals/Constantes";

export interface IInventario {
  fecha_factura: Date;
  created_at: Date;
  updated_at: Date;
  cedula_nit: number;
  nombres: string;
  apellidos: string;
  caja: string;
  tipo_factura: ETiposContadoCredito;
  productos: IProductosInventario[];
}

export interface IProductosInventario {
  entradas: number;
  salidas: number;
  codigo_barras: number;
  descripcion: string;
  bodega: string;
}
