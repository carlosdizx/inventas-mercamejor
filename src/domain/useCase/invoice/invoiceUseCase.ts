import { LISTAR_IN } from "@/services/crud";
import { DocumentData } from "firebase/firestore";

const coleccionCompras = "shops";

export const IS_NUM_FACTURA_EXISTE = async (
  codigoFactura: string
): Promise<boolean> => {
  let existe = false;
  const res = await LISTAR_IN(coleccionCompras, "cod_factura", codigoFactura);
  res.forEach((val: DocumentData) => {
    if (val.exists) {
      existe = true;
    }
  });
  return existe;
};
