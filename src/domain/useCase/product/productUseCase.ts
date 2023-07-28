import { Purchase } from "@/domain/model/purchase/Purchase";
import {
  FIND_PRODUCT_BY_BAR_CODE,
  UPDATE_AMOUNT_PRODUCT,
} from "@/infrastructure/firebase/adapter/product/productAdapter";

export const UNITS_UPDATED_FROM_PURCHASE = async (
  sale: Purchase
): Promise<void> => {
  for (const itemShop of sale.sales) {
    await UPDATE_UNITS_PRODUCT(
      Number(itemShop.bar_code),
      itemShop.amount,
      "RESTAR"
    );
  }
};

export const UPDATE_UNITS_PRODUCT = async (
  barCode: number,
  amount: number,
  tipoOperacion: "ADICIONAR" | "RESTAR" | "ASIGNAR"
): Promise<void> => {
  const producto: any = await FIND_PRODUCT_BY_BAR_CODE(barCode);
  let totalUnits = producto.producto.cantidad;
  if (tipoOperacion === "ADICIONAR") {
    totalUnits = totalUnits + amount;
  } else if (tipoOperacion === "RESTAR") {
    totalUnits = totalUnits - amount;
  } else {
    totalUnits = amount;
  }
  await UPDATE_AMOUNT_PRODUCT(producto.id, totalUnits);
};
