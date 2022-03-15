import Swal from "sweetalert2";

const comprobarErrores = async (error: string, errores: any[]) => {
  let valido = true;
  errores.forEach((e) => {
    if (e === error) {
      valido = false;
    }
  });
  if (valido) {
    errores.push(error);
  }
};

export const VALIDAR_FORM = async (campos: any[], item: any) => {
  const errores: any[] = [];
  for (const campo of campos) {
    if (item) {
      if (campo.type === 1) {
        await VALIDAR_INPUT(item[campo.name].trim(), campo.format, errores);
      }
      if (campo.blank && item[campo.name].trim() === "") {
        comprobarErrores(
          `El campo '${campo.label}' no puede estar vacío`,
          errores
        );
      }
      const caracteres = item[campo.name].trim().length;
      if (
        campo.min &&
        campo.max &&
        (caracteres < campo.min || caracteres > campo.max)
      ) {
        comprobarErrores(
          `El campo '${campo.label}' minimo ${campo.min} y maximo ${campo.max} de caracteres,
               actualmente tiene ${caracteres}`,
          errores
        );
      }
    } else {
      if (campo.type === 1) {
        await VALIDAR_INPUT(campo.model, campo.format, errores);
      }
      if (campo.blank && campo.model.trim() === "") {
        await comprobarErrores(
          `El campo '${campo.label}' no puede estar vacío`,
          errores
        );
      }
      const caracteres = campo.model.trim().length;
      if (
        campo.min &&
        campo.max &&
        (caracteres < campo.min || caracteres > campo.max)
      ) {
        await comprobarErrores(
          `El campo '${campo.label}' minimo ${campo.min} y maximo ${campo.max} de caracteres,
               actualmente tiene ${caracteres}`,
          errores
        );
      }
    }
  }
  return errores;
};

export const VALIDAR_INPUT = async (
  modelo: any,
  type: string,
  errores: any[]
) => {
  if (modelo.trim() !== "") {
    if (type === "email") {
      if (!/.+@.+\..+/.test(modelo)) {
        await Swal.fire({
          timer: 1000,
          title: "Correo electrónico incorrecto",
          showConfirmButton: false,
          icon: "error",
        });
      }
      await comprobarErrores("Correo electrónico incorrecto", errores);
    }
  }
};

export const VALIDAR_COMBO = async (seleccionados: any[]) => {
  let contador = 0;
  seleccionados.forEach((seleccionado: any, index) => {
    if (typeof seleccionado === "string") {
      seleccionados.splice(index, 1);
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
  return seleccionados;
};
