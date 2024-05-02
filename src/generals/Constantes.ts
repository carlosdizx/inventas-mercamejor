import { EPayTypeSale } from "@/domain/model/constants/Constants";

export const GENEROS = ["Masculino", "Femenino", "Otro"];

export const ROLES = ["Empleado", "Admin"]; //"Admin"],

export const ESTADOS_USUARIO = ["Habilitado", "Desabilitado"];

export const TIPOS_VENTA = [EPayTypeSale.CONTADO, EPayTypeSale.CREDITO];

export const PREF_COMPRA = "C-";

export enum ETiposContadoCredito {
  CONTADO = "Contado",
  CREDITO = "Credito",
}

export enum ETypesShop {
  COMPRA = "Compra",
  PEDIDO = "Pedido",
}
