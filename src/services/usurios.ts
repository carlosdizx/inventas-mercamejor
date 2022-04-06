import { doc, setDoc, updateDoc } from "firebase/firestore";
import { FIRESTORE } from "@/firebase/config";

export const REGISTRARDATOSUSUARIO = async (id: string, datos: any) =>
  await setDoc(doc(FIRESTORE, "usuarios", id), datos);

export const ACTUALIZARDATOSUSUARIO = async (id: string, datos: any) => {
  const instDatos = doc(FIRESTORE, "usuarios", id);
  return await updateDoc(instDatos, datos);
};
