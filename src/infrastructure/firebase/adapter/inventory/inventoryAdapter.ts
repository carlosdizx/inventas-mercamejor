import { Inventory } from "@/domain/model/inventory/Inventory";
import { GUARDAR } from "../../template/basicOperations";

const inventoryCollection = "inventories";

export const SAVE_INVENTORY = async (
  inventory: Inventory
): Promise<Inventory> => {
  await GUARDAR(inventoryCollection, inventory);
  return inventory;
};
