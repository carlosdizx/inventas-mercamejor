import { LISTAR } from "@/services/crud";

export const LISTAR_ROLES = async () => await LISTAR("roles");

export const LISTAR_CATEGORIAS = async () =>
  await LISTAR("categorias_productos");

export const LISTAR_PRODUCTOS = async () => await LISTAR("productos");
