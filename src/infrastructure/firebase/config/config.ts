import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage, ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
  measurementId: import.meta.env.VITE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
export const FIRESTORE = getFirestore(app);
export const AUTH = getAuth(app);
export const APK = firebaseConfig.apiKey;

export const DOWNLOAD_URL = (nombre: string, carpeta: string) =>
  getDownloadURL(ref(getStorage(), carpeta + "/" + nombre));

export const UPLOAD_FILE = async (
  file: any,
  nombre: string,
  carpeta: string
) => {
  const referencia = ref(getStorage(), carpeta + "/" + nombre);
  return await uploadBytes(referencia, file);
};
