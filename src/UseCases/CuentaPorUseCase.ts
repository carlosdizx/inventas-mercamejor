import { GUARDAR } from "@/services/crud";
import { Cliente } from "@/entity/Cliente";
import { CuentaPor } from "@/entity/CuentaPor";
import { Factura } from "@/entity/Factura";

export const CREAR_CUENTA_POR_COBRAR = async (
  factura: Factura,
  cliente: Cliente,
  consecutivo: string
) => {
  const cuenta_por_cobrar = new CuentaPor(factura, cliente, consecutivo, 2);
  await GUARDAR(
    "cuentas_por_cobrar",
    JSON.parse(JSON.stringify(cuenta_por_cobrar))
  );
};
