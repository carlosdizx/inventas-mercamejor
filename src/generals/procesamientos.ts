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
