import moment from "moment";

moment.locale("es");

// export const toDate = (dat: any) => moment(dat).format("MMMM, DD YYYY");

export const toDateWithDetail = (dat: any) =>
  moment(dat).format("dddd DD MMMM, YYYY h:mm:ss a");
export const toNumber = (dat: any) => new Intl.NumberFormat().format(dat);

export const tipo_dato = async (valor: any) => {
  let aux = null;
  Object.keys(valor).forEach((key, index) => {
    const dato: any = Object.values(valor)[index];
    if (key === "seconds" || key === "nanoseconds") {
      const fecha: Date = new Date(
        valor.seconds * 1000 + valor.nanoseconds / 1000000
      );
      aux = toDateWithDetail(fecha);
    } else if (key === "numero") {
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
};
