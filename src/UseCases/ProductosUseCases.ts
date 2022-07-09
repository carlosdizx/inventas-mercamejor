import { LISTAR_IN } from "@/services/crud";
import { Producto } from "@/entity/Producto";
import { ProductoVenta } from "@/dto/ProductoVenta";

export const BUSCAR_PRODUCTOS_CODIGO_BARRAS = async (codigo: number) => {
  const producto = await LISTAR_IN("productos", "codigo_barras", codigo);
  if (producto.size === 1) {
    return producto.docs[0].data();
  } else {
    return null;
  }
};

export const YA_LISTADO = async (
  productos: ProductoVenta[],
  producto: Producto
) =>
  productos.filter(
    (temp: ProductoVenta) => temp.codigo === producto.codigo_barras
  ).length === 1;

export const AGREGAR_PRODUCTO = (
  productos: ProductoVenta[],
  producto: Producto
) => {
  for (const temp of productos) {
    if (temp.codigo === producto.codigo_barras) {
      temp.cantidad++;
      temp.subtotal = temp.cantidad * temp.precio;
    }
  }
  return productos;
};
