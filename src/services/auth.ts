import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
  deleteUser,
} from "firebase/auth";
import { AUTH } from "@/firebase/config";

const API_KEY = "AIzaSyBFzkqsaf-5MDzXHlO-hOFSUI5fd-4iZLw";
const URL_SING_UP = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`;

export const REGISTRO_USUARIO = async (email: string, password: string) => {
  return await (
    await fetch(URL_SING_UP, {
      method: "POST",
      body: JSON.stringify({
        email: email,
        password: password,
        returnSecureToken: true,
      }),
    })
  ).json();
};
export const CREAR_CUENTA = async (correo: string, password: string) => {
  const resuesta = await createUserWithEmailAndPassword(AUTH, correo, password);
  if (resuesta.user) {
    await ENVIAR_CORREO_VERIFICACION(resuesta.user);
  }
  return resuesta;
};

export const ENVIAR_CORREO_VERIFICACION = async (user: any) =>
  await sendEmailVerification(user);

export const INICIAR_SESION = async (correo: string, password: string) =>
  await signInWithEmailAndPassword(AUTH, correo, password);

export const LOGOUT = async () => signOut(AUTH);

export const BORARR = async (user: any) => await deleteUser(user);

export const OBTENER_CORREO_CUENTA_ACTUAL = () => AUTH.currentUser?.email;
