import { ETiposContadoCredito } from "@/domain/model/constants/Constants";
import { EInventoryState, Inventory } from "@/domain/model/inventory/Inventory";
import { Purchase } from "@/domain/model/purchase/Purchase";
import { SAVE_INVENTORY } from "@/infrastructure/firebase/adapter/inventory/inventoryAdapter";

const ZERO = 0;

export const SAVE_INVENTORY_FROM_SALE = async (
  purchase: Purchase
): Promise<Inventory> => {
  const newInventory: Inventory = {
    id: purchase.id,
    cod_invoice: purchase.cod_purchase,
    products: purchase.sales.map((sale) => {
      return {
        bar_code: sale.cod_barras,
        description: sale.descripcion,
        input: sale.cantidad,
        output: ZERO,
        store: "",
      };
    }),
    state:
      purchase.type_pay === ETiposContadoCredito.CONTADO
        ? EInventoryState.APROBADO
        : EInventoryState.CANCELADO,
    created_at: new Date(),
    updated_at: new Date(),
  };
  return await SAVE_INVENTORY(newInventory);
};
