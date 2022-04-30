import { EDITAR, GUARDAR } from "@/services/crud";
import Swal from "sweetalert2";
import { DATOS_USUARIO } from "@/services/auth";

export const CAPTURAR_CAMPOS = async (item: any, campos: any) => {
  const datos = {};
  if (item) {
    Object.values(item).forEach((value: any, index) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      datos[Object.keys(item)[index]] = value;
    });
  } else {
    campos.forEach((campo: any) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      datos[campo.name] = campo.model;
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      if (campo.name2) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        datos[campo.name2] = campo.model2;
      }
    });
  }
  return datos;
};

export async function PROCESAR_FORMULARIO(
  coleccion: string,
  datos: any,
  campos: any,
  item: any
) {
  const datosUser = JSON.parse(<string>await DATOS_USUARIO());
  const datosMovimiento: any = {
    entidad: coleccion,
    created_at: new Date(),
    responsable: datosUser.nombres,
    documento: datosUser.documento,
    email: datosUser.email,
  };
  if (!item) {
    await GUARDAR(coleccion, datos);
    await Swal.fire({
      title: "Registro exitoso",
      html: "Datos registrados",
      icon: "success",
      showConfirmButton: false,
      timer: 1000,
    });
    datosMovimiento.accion = "Registró";
    datosMovimiento.objeto = JSON.stringify(datos);
    await GUARDAR("movimientos", datosMovimiento);
  } else {
    await EDITAR(coleccion, item.id, datos);
    await Swal.fire({
      title: "Actualización exitosa",
      html: "Datos actualizados",
      icon: "success",
      showConfirmButton: false,
      timer: 1000,
    });
    datosMovimiento.accion = "Editó";
    item.created_at = null;
    datos.created_at = null;
    item.updated_at = null;
    datos.updated_at = null;
    datosMovimiento.objeto = JSON.stringify(item);
    datosMovimiento.objeto_edit = JSON.stringify(datos);
    await GUARDAR("movimientos", datosMovimiento);
  }
  campos.forEach((campo: any) => {
    campo.model = "";
    campo.model2 = "";
  });
}

export const ASIGNARPERMISOS = (rol: string, listas: any, permisos: any) => {
  const listasDispo = [{}];
  permisos.forEach((permiso: any, index: number) => {
    if (permiso.tipo === rol) {
      listas.forEach((lista: any) => {
        if (lista.id) {
          permisos[index].idDisponibles.forEach((id: number) => {
            if (lista.id === id) {
              listasDispo.push(lista);
            }
          });
        } else {
          listasDispo.push(lista);
        }
      });
    }
  });
  return listasDispo;
};

export const VALIDARCAMPOSNULOS = (obj: any) => {
  let value = true;
  Object.keys(obj).forEach((key) => {
    if (!obj[key]) {
      value = false;
    }
  });
  return value;
};
