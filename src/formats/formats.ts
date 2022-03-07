import { async } from "@firebase/util";
import moment from "moment";
moment.locale("es");

export const toDate = (dat: any) => moment(dat).format("MMMM, DD YYYY");

export const toDateWithDetail = (dat: any) =>
  moment(dat).format("dddd DD MMMM, YYYY");

export const toNumber = (dat: any) => new Intl.NumberFormat().format(dat);

export const tipo_dato = (valor: any) => {
  let aux = null;
  Object.keys(valor).forEach((key, index) => {
    const dato: any = Object.values(valor)[index];
    if (key === "fecha") {
      aux = toDate(dato.seconds * 1000);
    } else if (key === "fecha_detalle") {
      aux = toDateWithDetail(dato.seconds * 1000);
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
