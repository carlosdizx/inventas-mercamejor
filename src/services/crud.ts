import {
  addDoc,
  collection,
  deleteDoc,
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
import { FIRESTORE } from "@/firebase/config";
import { BUSCAR_USUARIO_ACTUAL } from "@/services/usuarios";
import { tipo_dato } from "@/generals/formats";

export const LISTAR = async (colection: string) => {
  const coleccion = collection(FIRESTORE, colection);
  const consulta = query(coleccion, orderBy("created_at", "desc"));
  return await getDocs(consulta);
};

export const LISTAR_IN = async (
  colection: string,
  campo: string,
  valor: any
) => {
  const coleccion = collection(FIRESTORE, colection);
  const consulta = query(coleccion, where(campo, "in", [valor]));
  return await getDocs(consulta);
};

export const GUARDAR = async (colection: string, datos: any) =>
  addDoc(collection(FIRESTORE, colection), datos);

export const BUSCAR = async (colection: string, id: string) =>
  await (await getDoc(doc(FIRESTORE, colection, id))).data();

export const ELIMINAR = async (colection: string, objeto: any) => {
  const eliminacion = await deleteDoc(doc(FIRESTORE, colection, objeto.id));
  const datosUser: any = await BUSCAR_USUARIO_ACTUAL();
  const datosMovimiento: any = {
    entidad: colection,
    created_at: new Date(),
    responsable: datosUser.nombres,
    documento: datosUser.documento,
    objeto: JSON.stringify(objeto),
  };
  datosMovimiento.accion = "Eliminó";
  await GUARDAR("movimientos", datosMovimiento);
  return eliminacion;
};

export const EDITAR = async (colection: string, id: string, datos: any) =>
  await setDoc(doc(FIRESTORE, colection, id), datos);

export const ACTUALIZAR = async (colection: string, id: string, datos: any) =>
  await updateDoc(doc(FIRESTORE, colection, id), datos);

export const CARGAR_INFORMACION = async (coleccion: string) => {
  const filas: any = [];
  (await LISTAR(coleccion)).forEach((item) => {
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

export const CONSULTA_DATOS = async (
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

export const CONSULTA_SIMPLE = async (
  coleccion: string,
  propiedad: string,
  condicion: WhereFilterOp,
  valor: string | number
): Promise<QuerySnapshot<DocumentData>> => {
  return await getDocs(
    query(collection(FIRESTORE, coleccion), where(propiedad, condicion, valor))
  );
};

export const CONSULTA_COMPUESTA = async (
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

export const DATOS_IN_ARRAY = (datos: any) => {
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
