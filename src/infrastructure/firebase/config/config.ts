import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage, ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.VUE_APP_API_KEY,
  authDomain: process.env.VUE_APP_AUTH_DOMAIN,
  projectId: process.env.VUE_APP_PROJECT_ID,
  storageBucket: process.env.VUE_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_MESSAGING_SENDER_ID,
  appId: process.env.VUE_APP_APP_ID,
  measurementId: process.env.VUE_APP_MEASUREMENT_ID,
};

// Initialize Firebase
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
