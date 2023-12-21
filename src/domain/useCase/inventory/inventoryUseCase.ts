import { EInventoryState, Inventory } from "@/domain/model/inventory/Inventory";
import { ProductPurchase } from "@/domain/model/productpurchase/ProductPurchase";
import { InventoryProduct } from "@/domain/model/inventory/Inventory";
import { Purchase } from "@/domain/model/purchase/Purchase";
import { EPayTypePurchase } from "@/domain/model/constants/Constants";
import { SAVE_INVENTORY } from "@/infrastructure/firebase/adapter/inventory/inventoryAdapter";
import { Sale } from "@/domain/model/sale/Sale";
import { ProductSale } from "@/domain/model/productsale/ProductSale";

const ZERO = 0;

export const SAVE_INVENTORY_FROM_PURCHASE = async (
  purchase: Purchase
): Promise<Inventory> => {
  const newInventory: Inventory = {
    id: purchase.id,
    cod_invoice: purchase.cod_purchase,
    products: purchase.sales.map((sale: ProductPurchase) => {
      return {
        input: sale.amount,
        output: ZERO,
        bar_code: sale.bar_code,
        name: sale.name,
        store: "",
      } as InventoryProduct;
    }),
    state:
      purchase.type_pay === EPayTypePurchase.CONTADO
        ? EInventoryState.APROBADO
        : EInventoryState.CANCELADO,
    created_at: new Date(),
    updated_at: new Date(),
  };
  return await SAVE_INVENTORY(newInventory);
};

export const SAVE_INVENTORY_FROM_SALE = async (
  sale: Sale
): Promise<Inventory> => {
  const newInventory: Inventory = {
    id: sale.cod_invoice,
    cod_invoice: sale.cod_invoice,
    products: sale.sales.map((sale: ProductSale) => {
      return {
        input: ZERO,
        output: sale.amount,
        bar_code: sale.bar_code,
        name: sale.name,
        store: "",
      } as InventoryProduct;
    }),
    state:
      sale.pay_type === EPayTypePurchase.CONTADO
        ? EInventoryState.APROBADO
        : EInventoryState.CANCELADO,
    created_at: new Date(),
    updated_at: new Date(),
  };
  return await SAVE_INVENTORY(newInventory);
};
