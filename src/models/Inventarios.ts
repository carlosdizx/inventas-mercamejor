export interface IInventario {
  fecha_factura: Date | string | null;
  created_at: Date;
  updated_at: Date;
  codigo_barras: number | null;
  cedula_nit: number | null | "";
  nombres: string;
  apellidos: string;
  tipo_factura: string;
  bodega: string;
  caja: string;
  producto: string;
  documento: string;
  entradas: number;
  salidas: number;
}
