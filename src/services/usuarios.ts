import { doc, setDoc, getDocs, collection, getDoc } from "firebase/firestore";
import { FIRESTORE, AUTH } from "@/infrastructure/firebase/config/config";
import { EDITAR, LISTAR } from "@/services/crud";
import { OBTENER_CORREO_CUENTA_ACTUAL } from "@/services/auth";

const userCollection = "users";

export const REGISTRAR_DATOS_USUARIO = async (id: string, datos: any) =>
  await EDITAR(userCollection, id, datos);

export const ACTUALIZAR_USUARIO = async (id: string, datos: any) =>
  EDITAR(userCollection, id, datos);

export const LISTAR_EMPLEADOS = async () => {
  try {
    const usuarios = await LISTAR(userCollection);
    const empleados: any = [];
    const ids: any = [];
    usuarios.forEach((value) => {
      if (value.data().rol === "Empleado") {
        empleados.push(value.data());
        ids.push(value.id);
      }
    });
    return { ids, empleados };
  } catch (error) {
    console.log(error);
  }
};

export const LISTAR_EMPLEADOS_SIN_CAJA_ASIGNADA = async () => {
  try {
    const usuarios = await getDocs(collection(FIRESTORE, userCollection));
    const empleados: any = [];
    usuarios.forEach((value) => {
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

export const LISTAR_CAJAS = async () => {
  try {
    const usuarios = await getDocs(collection(FIRESTORE, userCollection));
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

export const REGISTRAR_CAJA = async (email: string, cajaNombre: string) => {
  try {
    const caja = {
      caja: cajaNombre,
      created_at: new Date(),
      updated_at: new Date(),
    };
    const usuarios: any = await getDocs(collection(FIRESTORE, userCollection));
    usuarios.map(async (value: any) => {
      const empleado = value.data();
      const id = value.id;
      if (empleado.email === email) {
        await setDoc(doc(FIRESTORE, userCollection, id), { ...empleado, caja });
      }
    });
  } catch (e) {
    console.log(e);
  }
};

export const ACTUALIZAR_CAJA = async (email: string, cajaNombre: string) => {
  try {
    const usuarios: any = await getDocs(collection(FIRESTORE, userCollection));
    usuarios.map(async (value: any) => {
      const empleado = value.data();
      const id = value.id;
      if (empleado.caja) {
        if (empleado.caja.caja === cajaNombre) {
          delete empleado.caja;
          await setDoc(doc(FIRESTORE, userCollection, id), empleado);
        }
      }
    });
    const caja = {
      caja: cajaNombre,
      fechaCreacion: new Date().getTime(),
    };
    usuarios.map(async (value: any) => {
      const empleado = value.data();
      const id = value.id;
      if (empleado.email === email) {
        await setDoc(doc(FIRESTORE, userCollection, id), { ...empleado, caja });
      }
    });
  } catch (error) {
    console.log(error);
  }
};

export const OBTENER_ROL = async () => {
  try {
    const docSnap: any = await getDoc(
      doc(FIRESTORE, `${userCollection}/${AUTH.currentUser?.uid}`)
    );
    return docSnap.data().rol;
  } catch (error) {
    console.log(error);
  }
};

export const OBTENER_ESTADO = async () => {
  try {
    if (AUTH.currentUser) {
      const docSnap: any = await getDoc(
        doc(FIRESTORE, `${userCollection}/${AUTH.currentUser?.uid}`)
      );
      return docSnap.data().estado;
    }
  } catch (error) {
    console.log(error);
  }
};

export const BUSCAR_USUARIO_ACTUAL = async () => {
  const correo: any = OBTENER_CORREO_CUENTA_ACTUAL();
  const empleadoAdecuados: any[] = [];
  const empleados = await LISTAR(userCollection);
  empleados.forEach((empleado) => {
    if (correo === empleado.data().email) {
      empleadoAdecuados.push(empleado.data());
    }
  });
  if (empleadoAdecuados.length > 0) {
    return empleadoAdecuados[0];
  }
  return null;
};
