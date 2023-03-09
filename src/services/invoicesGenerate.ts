import { BUSCAR, ACTUALIZAR } from "@/services/crud";

const generalData = "datos_generales";

const business = "mercamejor";

export const GENERATE_INVOICE_SALE = async (): Promise<number | undefined> => {
  const currentPurchase = await BUSCAR(generalData, business);
  if (currentPurchase) {
    const { consecutivo_venta } = currentPurchase;
    const { cantidad_venta } = currentPurchase;
    if (
      consecutivo_venta !== undefined &&
      cantidad_venta !== undefined &&
      Number(consecutivo_venta) < Number(cantidad_venta)
    ) {
      await ACTUALIZAR(generalData, business, {
        consecutivo_venta: Number(consecutivo_venta) + 1,
      });
      return Number(consecutivo_venta) + 1;
    }
  }
  return undefined;
};
