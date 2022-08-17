import { LISTAR_IN, EDITAR } from "@/services/crud";
import { Producto } from "@/entity/Producto";
import { ProductoVenta } from "@/dto/ProductoVenta";
import Swal from "sweetalert2";

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

export const TOTALIZAR_VALORES = (productos: ProductoVenta[]) => {
  let subtotal = 0;
  let descuento = 0;
  let total = 0;
  for (const temp of productos) {
    subtotal += temp.subtotal;
    descuento += temp.descuento * temp.cantidad;
    total = subtotal - descuento;
  }
  return { subtotal: subtotal, descuento: descuento, total: total };
};

export const CAMBIAR_CANTIDAD = async (
  valor: number | string,
  item: ProductoVenta
) => {
  const parse = parseInt(valor.toString());
  if (isNaN(parse)) {
    await Swal.fire({
      title: "Valor errado",
      text: "Asegurate de escribir un valor correcto",
      timer: 1000,
      showConfirmButton: false,
      icon: "error",
    });
    return item.cantidad;
  } else {
    item.cantidad = parse;
    item.subtotal = item.cantidad * item.precio;
    return parse;
  }
};

export const ACTUALIZAR_UNIDADES_PRODUCTO = async (
  idProducto: string,
  cantidad: number
) => {
  await EDITAR("productos", idProducto, { cantidad });
};
