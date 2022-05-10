import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  setDoc,
  startAt,
} from "firebase/firestore";
import { FIRESTORE } from "@/firebase/config";
import { OBTENER_CORREO_CUENTA_ACTUAL } from "@/services/auth";
import { BUSCAR_USUARIO_ACTUAL } from "@/services/usuarios";
import { tipo_dato } from "@/generals/formats";

export const LISTAR = async (colection: string) => {
  const coleccion = collection(FIRESTORE, colection);
  const consulta = query(coleccion, orderBy("created_at", "desc"));
  return await getDocs(consulta);
};

export const GUARDAR = async (colection: string, datos: any) =>
  addDoc(collection(FIRESTORE, colection), datos);

export const BUSCAR = async (colection: string, id: string) =>
  await (await getDoc(doc(FIRESTORE, colection, id))).data();

export const ELIMINAR = async (colection: string, objeto: any) => {
  const eliminacion = await deleteDoc(doc(FIRESTORE, colection, objeto.id));
  const datosUser: any = await BUSCAR_USUARIO_ACTUAL();
  const datosMovimiento: any = {
    entidad: colection,
    created_at: new Date(),
    responsable: datosUser.nombres,
    documento: datosUser.documento,
    objeto: JSON.stringify(objeto),
  };
  datosMovimiento.accion = "Eliminó";
  await GUARDAR("movimientos", datosMovimiento);
  return eliminacion;
};

export const EDITAR = async (colection: string, id: string, datos: any) =>
  await setDoc(doc(FIRESTORE, colection, id), datos);

export const PAGINAR = async (colection: string, ordenardor: string) => {
  const entidadRef = await collection(FIRESTORE, colection);
  const consulta = query(entidadRef, orderBy(ordenardor), startAt(1000000));
  console.log(consulta);
};

export const CARGAR_INFORMACION = async (coleccion: string) => {
  const filas: any = [];
  (await LISTAR(coleccion)).forEach((item) => {
    const obj: any = JSON.parse(JSON.stringify(item.data()));
    obj.id = item.id;
    Object.values(obj).map(async (value: any, index: number) => {
      if (typeof value === "object" && value) {
        value = await tipo_dato(value);
        const key: string = Object.keys(obj)[index].toString();
        obj[key] = value;
      }
    });
    filas.push(obj);
  });
  return filas;
};
