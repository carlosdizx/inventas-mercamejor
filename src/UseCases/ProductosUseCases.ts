import { LISTAR_IN, ACTUALIZAR } from "@/services/crud";
import { Product } from "@/domain/model/product/Product";
import { ProductPurchase } from "@/domain/model/productpurchase/ProductPurchase";
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

export const YA_LISTADO = (
  productos: ProductPurchase[],
  producto: Product
): boolean =>
  productos.filter(
    (temp: ProductPurchase) => temp.bar_code === producto.bar_code
  ).length === 1;

export const AGREGAR_PRODUCTO = (
  productos: ProductPurchase[],
  producto: Product
): ProductPurchase[] => {
  for (const temp of productos) {
    if (temp.bar_code === producto.bar_code) {
      temp.amount++;
      temp.subtotal = temp.amount * temp.price_purchase;
    }
  }
  return productos;
};

export const TOTALIZAR_VALORES = (productos: ProductPurchase[]) => {
  let subtotal = 0;
  let descuento = 0;
  let total = 0;
  for (const temp of productos) {
    subtotal += temp.subtotal;
    descuento += temp.discount * temp.amount;
    total = subtotal - descuento;
  }
  return { subtotal: subtotal, descuento: descuento, total: total };
};

export const CAMBIAR_CANTIDAD = async (
  valor: number | string,
  item: ProductPurchase
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
    return item.amount;
  } else {
    item.amount = parse;
    item.subtotal = item.amount * item.price_purchase;
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
