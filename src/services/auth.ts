import { createUserWithEmailAndPassword } from "firebase/auth";
import { AUTH } from "@/firebase/config";

export const CREAR_CUENTA = async (correo: string, password: string) =>
  await createUserWithEmailAndPassword(AUTH, correo, password);
