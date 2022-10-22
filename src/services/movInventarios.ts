import { Inventarios } from "./../models/Inventarios";
import { EDITAR, ELIMINAR, GUARDAR } from "./crud";

const coleccion = "inventarios";

export const GUARDAR_MOVIMIENTO_INVENTARIO = async (inventario: Inventarios) =>
  await GUARDAR(coleccion, inventario);

export const BORRAR_MOVIMIENTO_INVENTARIO = async (idInventario: string) => {
  await ELIMINAR(coleccion, idInventario);
};

export const ACTUALIZAR_MOVIMIENTO_INVENTARIO = async (
  idInventario: string,
  datos: Inventarios
) => await EDITAR(coleccion, idInventario, datos);
