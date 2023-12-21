import {
  LIST_IN,
  UPDATE,
} from "@/infrastructure/firebase/template/basicOperations";
import { Product } from "@/domain/model/product/Product";
import Swal from "sweetalert2";
import { ProductSale } from "@/domain/model/productsale/ProductSale";

export const BUSCAR_PRODUCTOS_CODIGO_BARRAS = async (
  codigo: number
): Promise<Product | null> => {
  const data = await LIST_IN("products", "bar_code", codigo);
  if (data.size === 1) {
    const product = data.docs[0].data() as Product;
    product.id = data.docs[0].id;
    return product;
  } else {
    return null;
  }
};

export const YA_LISTADO = (
  productos: ProductSale[],
  producto: Product
): boolean =>
  productos.filter((temp: ProductSale) => temp.bar_code === producto.bar_code)
    .length === 1;

export const AGREGAR_PRODUCTO = (
  productos: ProductSale[],
  producto: Product
): ProductSale[] => {
  for (const temp of productos) {
    if (temp.bar_code === producto.bar_code) {
      temp.amount++;
      temp.subtotal = temp.amount * temp.sale_price;
    }
  }
  return productos;
};

export const TOTALIZAR_VALORES = (productos: ProductSale[]) => {
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
  item: ProductSale
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
    item.subtotal = item.amount * item.sale_price;
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
  await UPDATE("products", producto.idProducto, { amount: unidades });
};
