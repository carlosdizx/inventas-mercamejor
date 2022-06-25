export interface Inventarios {
  fecha_llegada_producto: Date;
  created_at: Date;
  updated_at: Date;
  codigo_barras: number | null;
  cedula_nit: number | null;
  nombres: string;
  tipo_factura: string;
  bodega: string;
  caja: string;
  producto: string;
  documento: string;
  cruce: string;
  entradas: number;
  salidas: number;
}
