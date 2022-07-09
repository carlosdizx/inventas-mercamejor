import { LISTAR_IN } from "@/services/crud";
import { Producto } from "@/entity/Producto";

export const BUSCAR_PRODUCTOS_CODIGO_BARRAS = async (codigo: number) => {
  const producto = await LISTAR_IN("productos", "codigo_barras", codigo);
  if (producto.size === 1) {
    return producto.docs[0].data();
  } else {
    return null;
  }
};

export const YA_LISTADO = async (productos: any, producto: any) =>
  productos.filter((temp: any) => temp.id === producto.id).length === 1;

export const AGREGAR_PRODUCTO = (productos: any, producto: any) => {
  return;
};
