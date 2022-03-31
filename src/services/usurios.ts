import { doc, setDoc } from "firebase/firestore";
import { FIRESTORE } from "@/firebase/config";

export const REGISTRARDATOSUSUARIO = async (id: string, datos: any) =>
  await setDoc(doc(FIRESTORE, "usuarios", id), datos);
