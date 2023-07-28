import { EInventoryState, Inventory } from "@/domain/model/inventory/Inventory";
import { ProductPurchase } from "@/domain/model/productpurchase/ProductPurchase";
import { EPayTypePurchase, Purchase } from "@/domain/model/purchase/Purchase";
import { SAVE_INVENTORY } from "@/infrastructure/firebase/adapter/inventory/inventoryAdapter";

const ZERO = 0;

export const SAVE_INVENTORY_FROM_SALE = async (
  purchase: Purchase
): Promise<Inventory> => {
  const newInventory: Inventory = {
    id: purchase.id,
    cod_invoice: purchase.cod_purchase,
    products: purchase.sales.map((sale: ProductPurchase) => {
      return {
        description: sale.description,
        input: sale.amount,
        output: ZERO,
        bar_code: sale.bar_code,
        store: "",
      };
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