import { Purchase } from "@/domain/model/purchase/Purchase";
import { Sale } from "@/domain/model/sale/Sale";
import {
  FIND_PRODUCT_BY_BAR_CODE,
  UPDATE_AMOUNT_PRODUCT,
} from "@/infrastructure/firebase/adapter/product/productAdapter";

export const UNITS_UPDATED_FROM_PURCHASE = async (
  purchase: Purchase
): Promise<void> => {
  for (const itemShop of purchase.sales) {
    await UPDATE_UNITS_PRODUCT(
      "ADD",
      itemShop.bar_code,
      itemShop.amount,
      itemShop.price_shop,
      itemShop.price_sale
    );
  }
};

export const UNITS_UPDATED_FROM_SALE = async (sale: Sale): Promise<void> => {
  for (const itemShop of sale.sales) {
    if (itemShop.bar_code !== "") {
      await UPDATE_UNITS_PRODUCT(
        "LESS",
        itemShop.bar_code,
        itemShop.amount,
        itemShop.shop_price,
        itemShop.sale_price
      );
    }
  }
};

export const UPDATE_UNITS_PRODUCT = async (
  tipoOperacion: "ADD" | "LESS" | "ASINGN",
  barCode: string,
  amount: number,
  unitPrice: number,
  salePrice: number
): Promise<void> => {
  const product: any = await FIND_PRODUCT_BY_BAR_CODE(barCode);
  let totalUnits = product.product.amount;
  if (tipoOperacion === "ADD") {
    totalUnits = totalUnits + amount;
  } else if (tipoOperacion === "LESS") {
    totalUnits = totalUnits - amount;
  } else {
    totalUnits = amount;
  }
  await UPDATE_AMOUNT_PRODUCT(product.id, totalUnits, unitPrice, salePrice);
};
