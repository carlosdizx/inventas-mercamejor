import { GUARDAR } from "@/services/crud";
import Swal from "sweetalert2";

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
    });
  }
  return datos;
};

export async function REGISTRAR_FORMULARIO(
  coleccion: string,
  datos: any,
  campos: any
) {
  await GUARDAR(coleccion, datos);
  await Swal.fire({
    title: "Registro exitoso",
    html: "Datos registrados",
    icon: "success",
    showConfirmButton: false,
    timer: 1000,
  });
  campos.forEach((campo: any) => {
    campo.model = "";
  });
}
