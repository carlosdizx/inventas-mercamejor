import { CONSULTA_SIMPLE } from "@/services/crud";

const coleccionCuentas = "cuentas_por_pagar";

export const BUSCAR_CUENTA_POR_PAGAR = async (codFactura: string) => {
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
