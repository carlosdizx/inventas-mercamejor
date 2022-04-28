import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD7pWRCmb4OctEOsceK-vA1QDG93evlyX4",
  authDomain: "inventas-mercamejor-test.firebaseapp.com",
  projectId: "inventas-mercamejor-test",
  storageBucket: "inventas-mercamejor-test.appspot.com",
  messagingSenderId: "162484730842",
  appId: "1:162484730842:web:6beebd91f8d295c554dee3",
  measurementId: "G-4GC3M3RH0R",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const FIRESTORE = getFirestore(app);
export const AUTH = getAuth(app);

export const DOWNLOAD_URL = (nombre: string, carpeta: string) =>
  getDownloadURL(ref(getStorage(), carpeta + "/" + nombre));
