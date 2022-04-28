import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCKOq2uBZ5nepVWh8smpPVWitKWbG6uRXQ",
  authDomain: "inventas-mercamejor.firebaseapp.com",
  projectId: "inventas-mercamejor",
  storageBucket: "inventas-mercamejor.appspot.com",
  messagingSenderId: "226355619712",
  appId: "1:226355619712:web:531786afd762db92418365",
  measurementId: "G-3YEYK6K411",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const FIRESTORE = getFirestore(app);
export const AUTH = getAuth(app);

export const DOWNLOAD_URL = (nombre: string, carpeta: string) =>
  getDownloadURL(ref(getStorage(), carpeta + "/" + nombre));
