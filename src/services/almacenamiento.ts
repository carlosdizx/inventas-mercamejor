import { DOWNLOAD_URL, UPLOAD_FILE } from "@/firebase/config";
import { NOTIFICAR_ERROR } from "@/generals/notificaciones";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const shortid = require("shortid");
export const OBTENER_ARCHIVO = async (nombre: string, carpeta: string) => {
  try {
    return await DOWNLOAD_URL(nombre, carpeta);
  } catch (e) {
    await NOTIFICAR_ERROR(e.code);
    return e;
  }
};

export const SUBIR_ARCHIVO = async (archivo: any, carpeta: string) => {
  try {
    const nombre: string = (await shortid.generate()) + "_" + archivo.name;
    await UPLOAD_FILE(archivo, nombre, carpeta);
    return await OBTENER_ARCHIVO(nombre, carpeta);
  } catch (e) {
    await NOTIFICAR_ERROR(e.code);
    return e;
  }
};
