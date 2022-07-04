import { LISTAR_IN } from "@/services/crud";

export const BUSCAR_CLIENTE_POR_DOCUMENTO = async (documento: any) => {
  const resultado = await LISTAR_IN("clientes", "documento", documento);
  if (resultado.size === 1) {
    return resultado.docs[0].data();
  } else {
    return { nombres: "Clientes", apellidos: "Varios", documento: 2222222 };
  }
};
