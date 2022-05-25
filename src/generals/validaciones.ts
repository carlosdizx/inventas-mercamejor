import Swal from "sweetalert2";
import { BUSCAR, LISTAR_IN } from "@/services/crud";

export const VALIDAR_COMBO = async (modelo: any, items: Array<any>) => {
  if (modelo) {
    if (typeof modelo === "string") {
      await Swal.fire({
        timer: 1000,
        title: "Valor ingresado incorrecto",
        showConfirmButton: false,
        icon: "error",
      });
      return (modelo = "");
    }
    if (modelo.constructor.name === "Array") {
      let contador = 0;
      modelo.forEach((seleccionado: any, index: number) => {
        if (typeof seleccionado === "string") {
          modelo.splice(index, 1);
          contador++;
        }
      });
      if (contador !== 0) {
        await Swal.fire({
          timer: 1000,
          title: "Valor ingresado incorrecto",
          showConfirmButton: false,
          icon: "error",
        });
      }
      return modelo;
    } else {
      return modelo;
    }
  }
};

export const VALIDAR_CAMPO = async (
  datos: any,
  validacion: any,
  colecion: string,
  edicion: boolean
) => {
  let mensjaes = "";
  if (validacion.tipo === 1) {
    const val1 = datos[validacion.nombres[0]];
    const val2 = datos[validacion.nombres[1]];
    const resultado = await VALIDAR_PRECIOS(val1, val2);
    if (resultado) {
      mensjaes = "Los valores de los precios son incorrectos";
    }
  } else if (validacion.tipo === 2) {
    const listado = await LISTAR_IN(
      colecion,
      validacion.nombres[0],
      datos[validacion.nombres[0]]
    );
    if (!listado.empty) {
      if (edicion) {
        let obj: any = {};
        listado.forEach((item) => {
          obj = item;
        });
        if (listado.size > 0 && datos["id"] !== obj["id"]) {
          mensjaes = `El valor ${validacion.nombres[0]} ya se encuentra registrado`;
        }
      } else {
        mensjaes = `El valor ${validacion.nombres[0]} no debe estar repetido`;
      }
    }
  }
  return mensjaes;
};

const VALIDAR_PRECIOS = async (valor1: any, valor2: any): Promise<boolean> =>
  valor1 >= valor2;
