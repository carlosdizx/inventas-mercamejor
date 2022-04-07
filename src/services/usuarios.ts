import {
  doc,
  setDoc,
  updateDoc,
  getDocs,
  collection,
} from "firebase/firestore";
import { FIRESTORE } from "@/firebase/config";

export const REGISTRARDATOSUSUARIO = async (id: string, datos: any) =>
  await setDoc(doc(FIRESTORE, "usuarios", id), datos);

export const ACTUALIZARDATOSUSUARIO = async (id: string, datos: any) => {
  const instDatos = doc(FIRESTORE, "usuarios", id);
  return await updateDoc(instDatos, datos);
};

export const LISTAREMPLEADOS = async () => {
  try {
    const usuarios = await getDocs(collection(FIRESTORE, "usuarios"));
    const empleados: any = [];
    usuarios.forEach((value: any) => {
      if (!value.caja) {
        empleados.push(value.data());
      }
    });
    return empleados;
  } catch (error) {
    console.log(error);
  }
};
