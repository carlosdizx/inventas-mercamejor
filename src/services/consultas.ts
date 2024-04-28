import { Purchase } from "@/domain/model/purchase/Purchase";
import { FIRESTORE } from "../infrastructure/firebase/config/config";
import {
  DocumentData,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";

const ref = collection(FIRESTORE, "purchases");

export const CONSULTAR_COMPRAS = async (
  fechaInicial: string,
  fechaFinal: string
): Promise<Purchase[]> => {
  const fecIni = new Date(fechaInicial);
  const fecFin = new Date(fechaFinal);

  fecFin.setDate(fecFin.getDate() + 1);

  const querys = query(
    ref,
    where("created_at", ">=", new Date(fecIni)),
    where("created_at", "<=", new Date(fecFin))
  );

  const datos: DocumentData = await getDocs(querys);
  const res: Purchase[] = [] as Array<Purchase>;
  datos.forEach((doc: DocumentData) => {
    const purchase = doc.data() as Purchase;
    res.push(purchase);
  });
  return res;
};
