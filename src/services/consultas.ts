import { FIRESTORE } from "./../firebase/config";
import { collection, query, where } from "firebase/firestore";

const citiesRef = collection(FIRESTORE, "compras");

export const CONSULTAR_COMPRAS = async (fechaInicial: Date, fechaFinal: Date) =>
  await query(
    citiesRef,
    where("startTime", ">=", fechaInicial),
    where("startTime", "<=", fechaFinal)
  );
