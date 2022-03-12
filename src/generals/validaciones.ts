export const VALIDAR_FORM = async (campos: any[], item: any) => {
  const errores: any[] = [];
  campos.forEach((campo: any) => {
    if (campo.type === 2) {
      return;
    }
    if (item) {
      if (campo.blank && item[campo.name].trim() === "") {
        errores.push(`El campo '${campo.label}' no puede estar vacío`);
      }
      const caracteres = item[campo.name].trim().length;
      if (
        campo.min &&
        campo.max &&
        (caracteres < campo.min || caracteres > campo.max)
      ) {
        errores.push(
          `El campo '${campo.label}' minimo ${campo.min} y maximo ${campo.max} de caracteres,
               actualmente tiene ${caracteres}`
        );
      }
    } else {
      if (campo.blank && campo.model.trim() === "") {
        errores.push(`El campo '${campo.label}' no puede estar vacío`);
      }
      const caracteres = campo.model.trim().length;
      if (
        campo.min &&
        campo.max &&
        (caracteres < campo.min || caracteres > campo.max)
      ) {
        errores.push(
          `El campo '${campo.label}' minimo ${campo.min} y maximo ${campo.max} de caracteres,
               actualmente tiene ${caracteres}`
        );
      }
    }
  });
  return errores;
};
