import { CuentaPorPagar } from "./../models/CuentasPorPagar";
import {
  ACTUALIZAR,
  CONSULTA_SIMPLE,
  ELIMINAR,
  GUARDAR,
} from "@/services/crud";

const coleccionCuentas = "cuentas_por_pagar";

export const BUSCAR_CUENTA_POR_PAGAR = async (
  codFactura: string
): Promise<any> => {
  const cuentaxpag = { cuenta: {}, id: "" };
  const cuentaXPagar = await CONSULTA_SIMPLE(
    coleccionCuentas,
    "codigo_factura",
    "==",
    codFactura
  );
  cuentaXPagar.forEach((doc) => {
    cuentaxpag.cuenta = doc.data();
    cuentaxpag.id = doc.id;
  });
  return cuentaxpag;
};

export const ACTUALIZAR_CUENTA_PAGAR = async (
  idCuentaPagar: string,
  nuevaCuenta: CuentaPorPagar
): Promise<void> =>
  await ACTUALIZAR(coleccionCuentas, idCuentaPagar, nuevaCuenta);

export const REGISTRAR_NUEVA_CUENTAPORPAGAR = async (
  nuevaCuenta: CuentaPorPagar
): Promise<void> => {
  await GUARDAR(coleccionCuentas, nuevaCuenta);
};

export const ELIMINAR_CUENTA_PORPAGAR = async (
  compra: CuentaPorPagar
): Promise<void> => {
  await ELIMINAR(coleccionCuentas, compra);
};
