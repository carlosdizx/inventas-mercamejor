import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage, ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBFzkqsaf-5MDzXHlO-hOFSUI5fd-4iZLw",
  authDomain: "inventas-app.firebaseapp.com",
  projectId: "inventas-app",
  storageBucket: "inventas-app.appspot.com",
  messagingSenderId: "533111161621",
  appId: "1:533111161621:web:33225404310a005e489f1c",
  measurementId: "G-NK2YTKY68M",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const FIRESTORE = getFirestore(app);
export const AUTH = getAuth(app);

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
