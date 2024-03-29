import { Inventory } from "@/domain/model/inventory/Inventory";
import { SAVE } from "@/infrastructure/firebase/template/basicOperations";

const inventoryCollection = "inventories";

export const SAVE_INVENTORY = async (
  inventory: Inventory
): Promise<Inventory> => {
  await SAVE(inventoryCollection, inventory);
  return inventory;
};
