import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
  getAuth,
  deleteUser,
} from "firebase/auth";
import { AUTH } from "@/firebase/config";
import login from "@/components/autenticacion/Login.vue";

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

export const ACTUALIZAR = async (user: any, datos: any) =>
  await updateProfile(user, {
    displayName: datos,
  });

// export const ISUSERAUT = async () =>
//   await onAuthStateChanged(AUTH, function (user) {
//     if (user) {
//       return true;
//     } else {
//       return false;
//     }
//   });

export const LOGOUT = async () => signOut(AUTH);

export const BORARR = async (user: any) => await deleteUser(user);
