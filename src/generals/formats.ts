import moment from "moment/min/moment-with-locales";

moment.locale("es");

// export const toDate = (dat: any) => moment(dat).format("MMMM, DD YYYY");

export const toDateWithDetail = (dat: any) =>
  moment(dat).locale('es').format("dddd DD MMMM, YYYY h:mm:ss a");
export const toNumber = (dat: any) => new Intl.NumberFormat('es-ES').format(dat);

export const tipo_dato = async (valor: any) => {
  let aux = null;
  if (valor && typeof valor === 'object') {
    // Firestore Timestamp serializado: { seconds, nanoseconds }
    if (
      Object.prototype.hasOwnProperty.call(valor, 'seconds') &&
      Object.prototype.hasOwnProperty.call(valor, 'nanoseconds')
    ) {
      const fecha: Date = new Date(
        valor.seconds * 1000 + valor.nanoseconds / 1000000
      );
      return toDateWithDetail(fecha);
    }

    // Firestore Timestamp sin serializar
    if (typeof (valor as any).toDate === 'function') {
      return toDateWithDetail((valor as any).toDate());
    }

    // Instancia de Date
    if (valor instanceof Date) {
      return toDateWithDetail(valor);
    }

    // Estructuras especiales
    Object.keys(valor).forEach((key, index) => {
      const dato: any = Object.values(valor)[index];
      if (key === "numero") {
        aux = toNumber(dato);
      } else if (key === "moneda") {
        aux = "$" + toNumber(dato);
      } else if (key === "calificacion") {
        aux = parseFloat(dato);
      } else {
        aux = valor;
      }
    });
    return aux;
  }

  // Cadenas con fecha ISO u otras parseables
  if (typeof valor === 'string') {
    const m = moment(valor, moment.ISO_8601, true);
    if (m.isValid()) {
      return m.locale('es').format("dddd DD MMMM, YYYY h:mm:ss a");
    }
    // Intento flexible si no es ISO estricto
    const mf = moment(valor);
    if (mf.isValid()) {
      return mf.locale('es').format("dddd DD MMMM, YYYY h:mm:ss a");
    }
    return valor;
  }

  // Números, booleanos u otros
  return valor;
};

export const getFechaDesdeInput = (stringfecha: string | null): Date => {
  if (stringfecha) {
    const datosFecha: string[] = stringfecha.split("-");
    return new Date(
      Number(datosFecha[0]),
      Number(datosFecha[1]) - 1,
      Number(datosFecha[2])
    );
  } else {
    return new Date();
  }
};
