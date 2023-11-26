import {
  addDoc,
  collection,
  doc,
  DocumentData,
  getDoc,
  getDocs,
  orderBy,
  query,
  QuerySnapshot,
  setDoc,
  updateDoc,
  where,
  WhereFilterOp,
} from "firebase/firestore";
import { FIRESTORE } from "@/infrastructure/firebase/config/config";
import { tipo_dato } from "@/generals/formats";

export const LIST = async (colection: string): Promise<QuerySnapshot> => {
  const coleccion = collection(FIRESTORE, colection);
  const consulta = query(coleccion, orderBy("created_at", "desc"));
  return await getDocs(consulta);
};

export const LIST_IN = async (
  colection: string,
  campo: string,
  valor: string | number
): Promise<QuerySnapshot> => {
  const coleccion = collection(FIRESTORE, colection);
  const consulta = query(coleccion, where(campo, "in", [valor]));
  return await getDocs(consulta);
};

export const SAVE = async <T extends DocumentData>(
  colection: string,
  datos: T
): Promise<DocumentData> => {
  delete datos.id;
  return addDoc(collection(FIRESTORE, colection), datos);
};

export const FIND_BY_ID = async (
  colection: string,
  id: string
): Promise<DocumentData | null> => {
  const result = await getDoc(doc(FIRESTORE, colection, id));
  if (result.exists()) {
    return result.data();
  }
  return null;
};

export const SET_DATA = async <T extends DocumentData>(
  colection: string,
  id: string,
  datos: T
): Promise<T> => {
  delete datos.id;
  await setDoc(doc(FIRESTORE, colection, id), datos);
  return datos;
};

export const UPDATE = async <T extends DocumentData>(
  colection: string,
  id: string,
  datos: T
): Promise<T> => {
  delete datos.id;
  await updateDoc(doc(FIRESTORE, colection, id), datos);
  return datos;
};

export const LOAD_INFORMATION = async (coleccion: string) => {
  const filas: any = [];
  (await LIST(coleccion)).forEach((item) => {
    const obj: any = JSON.parse(JSON.stringify(item.data()));
    obj.id = item.id;
    Object.values(obj).map(async (value: any, index: number) => {
      if (typeof value === "object" && value) {
        value = await tipo_dato(value);
        const key: string = Object.keys(obj)[index].toString();
        obj[key] = value;
      }
    });
    filas.push(obj);
  });
  return filas;
};

export const CONSULT_DATA = async (
  colection: string,
  consulta: any
): Promise<QuerySnapshot<DocumentData>> => {
  const coleccion = collection(FIRESTORE, colection);
  let res: any = "";
  if (consulta.length === 1) {
    res = query(
      coleccion,
      where(consulta[0][0], consulta[0][1], consulta[0][2])
    );
  } else {
    res = query(
      coleccion,
      where(consulta[0][0], consulta[0][1], consulta[0][2]),
      where(consulta[1][0], consulta[1][1], consulta[1][2])
    );
  }
  return await getDocs(res);
};

export const FIND_BY_QUERY = async (
  coleccion: string,
  propierty: string,
  condition: WhereFilterOp,
  value: string | number
): Promise<DocumentData | null> => {
  const res = await getDocs(
    query(collection(FIRESTORE, coleccion), where(propierty, condition, value))
  );
  if (!res.empty) {
    return res.docs[0].data();
  }
  return null;
};

export const COMPOUND_CONSULT = async (
  coleccion: string,
  propiedad: string,
  condicion: WhereFilterOp,
  valor: string | number,
  propiedad2: string,
  condicion2: WhereFilterOp,
  valor2: string | number
): Promise<QuerySnapshot<DocumentData>> => {
  return await getDocs(
    query(
      collection(FIRESTORE, coleccion),
      where(propiedad, condicion, valor),
      where(propiedad2, condicion2, valor2)
    )
  );
};

export const DATA_IN_ARRAY = (datos: any) => {
  const filas: any[] = [];
  datos.forEach((item: any) => {
    const obj: any = JSON.parse(JSON.stringify(item.data()));
    obj.id = item.id;
    Object.values(obj).map(async (value: any, index: number) => {
      if (typeof value === "object" && value) {
        const key: string = Object.keys(obj)[index].toString();
        obj[key] = value;
      }
    });
    filas.push(obj);
  });
  return filas;
};
