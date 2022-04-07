import { DOWNLOAD_URL } from "@/firebase/config";
import { NOTIFICAR_ERROR } from "@/generals/notificaciones";

export const OBTENER_COMPROBANTE = async (nombre: string) => {
  try {
    return await DOWNLOAD_URL(nombre, "comprobantes");
  } catch (e) {
    await NOTIFICAR_ERROR(e.code);
    return e;
  }
};
