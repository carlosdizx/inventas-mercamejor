import { EstadoCuentaPorPagar } from "./CuentasPorPagar";

export interface MovCuentaPorPagar {
  fecha_mov: Date;
  cedula_empleado: number | "";
  nombres_empleado: string;
  apellidos_empleado: string;
  caja: string;
  cuenta_por_pagar: string;
  cruce: string;
  valor: number;
  estado: EstadoCuentaPorPagar;
  createdAt: Date;
  updatedAt: Date;
}
