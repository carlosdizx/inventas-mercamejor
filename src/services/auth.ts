import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";

import { AUTH, FIRESTORE } from "@/firebase/config";

export const CREAR_CUENTA = async (correo: string, password: string) =>
  await createUserWithEmailAndPassword(AUTH, correo, password);

export const LOGIN = async (email: string, password: string) => {
  try {
    const res = await signInWithEmailAndPassword(AUTH, email, password);
    return res ? res.user.uid : "null";
  } catch (error) {
    console.log(error);
  }
};

export const TRAERDATOSUSUARIO = async (uid: string) =>
  await getDocs(collection(FIRESTORE, `Users/${uid}`));
