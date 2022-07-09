import { LISTAR_IN } from "@/services/crud";

export const BUSCAR_PRODUCTOS_CODIGO_BARRAS = async (codigo: number) => {
  const producto = await LISTAR_IN("productos", "codigo_barras", codigo);
  if (producto.size === 1) {
    return producto.docs[0].data();
  } else {
    return null;
  }
};
