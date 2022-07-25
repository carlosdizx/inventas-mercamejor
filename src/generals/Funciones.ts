import { BUSCAR, EDITAR, LISTAR, LISTAR_IN } from "@/services/crud";
import { Empresa } from "@/entity/Empresa";
import Swal from "sweetalert2";

export const LISTAR_CATEGORIAS = async () => await LISTAR("categorias");

export const LISTAR_SUBCATEGORIAS = async () => await LISTAR("subcategorias");

export const LISTAR_MARCAS = async () => await LISTAR("marcas");

export const LISTAR_BODEGAS = async () => await LISTAR("bodegas");

export const LISTAR_PROVEDOORES = async () => await LISTAR("proveedores");

export const BUSCAR_PRODUCTOS_CODIGO_BARRAS = async (codigo: number) =>
  await LISTAR_IN("productos", "codigo_barras", codigo);

export const DAR_NUMERO_FACTURA = async (tipo: number) => {
  const resultado: any = await BUSCAR("datos_generales", "mercamejor");
  const factura: Empresa = new Empresa(
    resultado.consecutivo_compra,
    resultado.consecutivo_venta,
    resultado.cantidad_compra,
    resultado.cantidad_venta
  );
  const validacion = await factura.consecutivosValidos();
  if (!validacion) {
    await Swal.fire(
      "No se pueden generar mas facturas",
      "Limite de facturas alcanzadas",
      "error"
    );
    return false;
  }
  let consecutivo = "";
  if (tipo === 1) {
    await factura.modificarConsecutivoVenta();
    consecutivo =
      factura.darConsecutivoVenta() + " de " + resultado.cantidad_venta;
  } else {
    await factura.modificarConsecutivoCompra();
    consecutivo =
      factura.darConsecutivoCompra() + " de " + resultado.cantidad_compra;
  }
  await EDITAR(
    "datos_generales",
    "mercamejor",
    JSON.parse(JSON.stringify(factura))
  );
  return consecutivo;
};

export const BUSCAR_CLIENTE_POR_DOCUMENTO = async (documento: any) => {
  const resultado = await LISTAR_IN("clientes", "documento", documento);
  if (resultado.size === 1) {
    return resultado.docs[0].data();
  } else {
    return { nombres: "Clientes", apellidos: "Varios", documento: 2222222 };
  }
};
