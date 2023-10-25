import { LISTAR_IN, ACTUALIZAR } from "@/services/crud";
import { Producto } from "@/entity/Producto";
import { ProductoVenta } from "@/dto/ProductoVenta";
import Swal from "sweetalert2";

export const BUSCAR_PRODUCTOS_CODIGO_BARRAS = async (codigo: number) => {
  const data = await LISTAR_IN("products", "bar_code", codigo);
  if (data.size === 1) {
    return {
      producto: data.docs[0].data(),
      idProducto: data.docs[0].id,
    };
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
      temp.setCantidad++;
      temp.setSubtotal = temp.getCantidad * temp.precio;
    }
  }
  return productos;
};

export const TOTALIZAR_VALORES = (productos: ProductoVenta[]) => {
  let subtotal = 0;
  let descuento = 0;
  let total = 0;
  for (const temp of productos) {
    subtotal += temp.getSubtotal;
    descuento += temp.descuento * temp.getCantidad;
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
    return item.getCantidad;
  } else {
    item.setCantidad = parse;
    item.setSubtotal = item.getCantidad * item.precio;
    return parse;
  }
};

export const ACTUALIZAR_UNIDADES_PRODUCTO = async (
  codBarras: number,
  cantidad: number,
  tipoOperacion: "ADICIONAR" | "RESTAR" | "ASIGNAR"
): Promise<void> => {
  const producto: any = await BUSCAR_PRODUCTOS_CODIGO_BARRAS(codBarras);
  let unidades = producto.producto.amount;
  if (tipoOperacion === "ADICIONAR") {
    unidades = unidades + cantidad;
  } else if (tipoOperacion === "RESTAR") {
    unidades = unidades - cantidad;
  } else {
    unidades = cantidad;
  }
  await ACTUALIZAR("products", producto.idProducto, { amount: unidades });
};
