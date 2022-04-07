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
import { DATOS_USUARIO } from "@/services/auth";

export const LISTAR = async (colection: string) =>
  getDocs(collection(FIRESTORE, colection));

export const GUARDAR = async (colection: string, datos: any) =>
  addDoc(collection(FIRESTORE, colection), datos);

export const BUSCAR = async (colection: string, id: string) =>
  await (await getDoc(doc(FIRESTORE, colection, id))).data();

export const ELIMINAR = async (colection: string, id: string) => {
  const eliminacion = await deleteDoc(doc(FIRESTORE, colection, id));
  const datosUser = JSON.parse(<string>await DATOS_USUARIO());
  const datosMovimiento: any = {
    entidad: colection,
    created_at: new Date(),
    responsable: datosUser.nombres,
    documento: datosUser.documento,
  };
  datosMovimiento.accion = "eliminacion";
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
