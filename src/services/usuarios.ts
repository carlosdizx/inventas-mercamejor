import {
  doc,
  setDoc,
  updateDoc,
  getDocs,
  collection,
  addDoc,
} from "firebase/firestore";
import { FIRESTORE } from "@/firebase/config";

export const REGISTRARDATOSUSUARIO = async (id: string, datos: any) =>
  await setDoc(doc(FIRESTORE, "usuarios", id), datos);

export const ACTUALIZARDATOSUSUARIO = async (id: string, datos: any) => {
  return await updateDoc(doc(FIRESTORE, "usuarios", id), datos);
};

export const LISTAREMPLEADOS = async () => {
  try {
    const usuarios = await getDocs(collection(FIRESTORE, "usuarios"));
    const empleados: any = [];
    usuarios.forEach((value: any) => {
      const empleado = value.data();
      if (!empleado.caja) {
        empleados.push(value.data());
      }
    });
    return empleados;
  } catch (error) {
    console.log(error);
  }
};

export const LISTARTODASLASCAJAS = async () => {
  try {
    const usuarios = await getDocs(collection(FIRESTORE, "usuarios"));
    const cajas: any = [];
    usuarios.forEach((value: any) => {
      const empleado = value.data();
      if (empleado.caja) {
        cajas.push(value.data().caja);
      }
    });
    return cajas;
  } catch (error) {
    console.log(error);
  }
};

export const REGISTRARCAJA = async (email: string, caja: any) => {
  try {
    const usuarios = await getDocs(collection(FIRESTORE, "usuarios"));
    console.log(usuarios);
    usuarios.forEach(async (value: any) => {
      const empleado = value.data();
      const id = value.id;
      if (empleado.email === email) {
        await setDoc(doc(FIRESTORE, "usuarios", id), { ...empleado, caja });
      }
    });
  } catch (e) {
    console.log(e);
  }
};
