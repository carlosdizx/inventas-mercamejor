import {
  CONSULTA_SIMPLE,
  DATOS_IN_ARRAY,
  EDITAR,
  ELIMINAR,
  GUARDAR,
} from "./crud";

const coleccion = "inventarios";

export const GUARDAR_INVENTARIO = async (inventario: any) =>
  await GUARDAR(coleccion, inventario);

export const GUARDAR_MOVIMIENTO_INVENTARIO = async (inventario: any) =>
  await GUARDAR(coleccion, inventario);

export const BORRAR_MOVIMIENTO_INVENTARIO = async (idInventario: string) =>
  await ELIMINAR(coleccion, idInventario);

export const ACTUALIZAR_MOVIMIENTO_INVENTARIO = async (
  idInventario: string,
  datos: any
) => await EDITAR(coleccion, idInventario, datos);

export const BUSCAR_MOVIMIENTOS_INVENTARIO = async (nFactura: string) => {
  const res = await CONSULTA_SIMPLE(coleccion, "documento", "==", nFactura);
  const movimientos = DATOS_IN_ARRAY(res);
  return movimientos;
};
