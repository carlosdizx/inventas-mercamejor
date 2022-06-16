import { BUSCAR, EDITAR, LISTAR, LISTAR_IN } from "@/services/crud";
import { DatosEmpresa } from "@/class/DatosEmpresa";

export const LISTAR_CATEGORIAS = async () => await LISTAR("categorias");

export const LISTAR_SUBCATEGORIAS = async () => await LISTAR("subcategorias");

export const LISTAR_MARCAS = async () => await LISTAR("marcas");

export const LISTAR_BODEGAS = async () => await LISTAR("bodegas");

export const LISTAR_PROVEDOORES = async () => await LISTAR("proveedores");

export const BUSCAR_PRODUCTOS_CODIGO_BARRAS = async (codigo: number) =>
  await LISTAR_IN("productos", "codigo_barras", codigo);

export const DAR_NUMERO_FACTURA = async (tipo: number) => {
  const resultado: any = await BUSCAR("datos_generales", "mercamejor");
  const factura: DatosEmpresa = new DatosEmpresa(
    resultado.consecutivo_compra,
    resultado.consecutivo_venta
  );
  let consecutivo = 0;
  if (tipo === 1) {
    await factura.modificarConsecutivoVenta();
    consecutivo = factura.darConsecutivoVenta();
  } else {
    await factura.modificarConsecutivoCompra();
    consecutivo = factura.darConsecutivoCompra();
  }
  await EDITAR(
    "datos_generales",
    "mercamejor",
    JSON.parse(JSON.stringify(factura))
  );
  return consecutivo;
};
