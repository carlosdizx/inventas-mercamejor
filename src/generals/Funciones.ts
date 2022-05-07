import { LISTAR } from "@/services/crud";

export const LISTAR_CATEGORIAS = async () => await LISTAR("categorias");

export const LISTAR_SUBCATEGORIAS = async () => await LISTAR("subcategorias");

export const LISTAR_MARCAS = async () => await LISTAR("marcas");

export const LISTAR_BODEGAS = async () => await LISTAR("bodegas");

export const LISTAR_PRODUCTOS = async () => await LISTAR("productos");

export const LISTAR_PROVEDOORES = async () => await LISTAR("proveedores");
