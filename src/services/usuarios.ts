import {
  doc,
  setDoc,
  updateDoc,
  getDocs,
  collection,
  getDoc,
} from "firebase/firestore";
import { FIRESTORE } from "@/firebase/config";
import { AUTH } from "./../firebase/config";

export const REGISTRARDATOSUSUARIO = async (id: string, datos: any) =>
  await setDoc(doc(FIRESTORE, "usuarios", id), datos);

export const ACTUALIZARDATOSUSUARIO = async (id: string, datos: any) => {
  return await updateDoc(doc(FIRESTORE, "usuarios", id), datos);
};

export const LISTARTODOSLOSEMPLEADOS = async () => {
  try {
    const usuarios = await getDocs(collection(FIRESTORE, "usuarios"));
    const empleados: any = [];
    usuarios.forEach((value: any) => {
      empleados.push(value.data());
    });
    return empleados;
  } catch (error) {
    console.log(error);
  }
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

export const REGISTRARCAJA = async (email: string, cajaNombre: string) => {
  try {
    const caja = {
      caja: cajaNombre,
      fechaCreacion: new Date().getTime(),
    };
    const usuarios = await getDocs(collection(FIRESTORE, "usuarios"));
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

export const ACTUALIZARCAJA = async (email: string, cajaNombre: string) => {
  try {
    const usuarios = await getDocs(collection(FIRESTORE, "usuarios"));
    usuarios.forEach(async (value: any) => {
      const empleado = value.data();
      const id = value.id;
      if (empleado.caja) {
        if (empleado.caja.caja === cajaNombre) {
          delete empleado.caja;
          await setDoc(doc(FIRESTORE, "usuarios", id), empleado);
        }
      }
    });
    const caja = {
      caja: cajaNombre,
      fechaCreacion: new Date().getTime(),
    };
    usuarios.forEach(async (value: any) => {
      const empleado = value.data();
      const id = value.id;
      if (empleado.email === email) {
        await setDoc(doc(FIRESTORE, "usuarios", id), { ...empleado, caja });
      }
    });
  } catch (error) {
    console.log(error);
  }
};

export const GETROL = async () => {
  try {
    const docSnap: any = await getDoc(
      doc(FIRESTORE, `usuarios/${AUTH.currentUser?.uid}`)
    );
    return docSnap.data().rol;
  } catch (error) {
    console.log(error);
  }
};
