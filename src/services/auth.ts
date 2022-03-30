import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { AUTH } from "@/firebase/config";

export const CREAR_CUENTA = async (correo: string, password: string) =>
  await createUserWithEmailAndPassword(AUTH, correo, password);

export const INICIAR_SESION = async (correo: string, password: string) =>
  await signInWithEmailAndPassword(AUTH, correo, password);

export const ACTUALIZAR = async (user: any, datos: any) =>
  await updateProfile(user, {
    displayName: datos,
  });
