import {
  collection,
  getDocs,
  doc,
  getDoc,
  deleteDoc,
  addDoc,
  setDoc,
} from "firebase/firestore";
import { FIRESTORE } from "@/firebase/config";

export const LISTAR = async (colection: string) =>
  getDocs(collection(FIRESTORE, colection));

export const GUARDAR = async (colection: string, datos: any) =>
  addDoc(collection(FIRESTORE, colection), datos);

export const BUSCAR = async (colection: string, id: string) =>
  await (await getDoc(doc(FIRESTORE, colection, id))).data();

export const ELIMINAR = async (colection: string, id: string) =>
  await deleteDoc(doc(FIRESTORE, colection, id));

export const EDITAR = async (colection: string, id: string, datos: any) =>
  await setDoc(doc(FIRESTORE, colection, id), datos);
