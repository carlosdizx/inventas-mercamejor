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
      "ADICIONAR",
      Number(itemShop.bar_code),
      itemShop.amount,
      itemShop.price_shop,
      itemShop.price_purchase
    );
  }
};

export const UPDATE_UNITS_PRODUCT = async (
  tipoOperacion: "ADICIONAR" | "RESTAR" | "ASIGNAR",
  barCode: number,
  amount: number,
  unitPrice: number,
  salePrice: number
): Promise<void> => {
  const product: any = await FIND_PRODUCT_BY_BAR_CODE(barCode);
  let totalUnits = product.product.amount;
  if (tipoOperacion === "ADICIONAR") {
    totalUnits = totalUnits + amount;
  } else if (tipoOperacion === "RESTAR") {
    totalUnits = totalUnits - amount;
  } else {
    totalUnits = amount;
  }
  await UPDATE_AMOUNT_PRODUCT(product.id, totalUnits, unitPrice, salePrice);
};
