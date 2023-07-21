import { EDITAR, LISTAR_IN } from "../../template/basicOperations";
import { BAR_CODE, AmountProduct } from "@/domain/model/product/Product";

const productCollection = "products";

export const UPDATE_AMOUNT_PRODUCT = async (
  idProduct: string,
  amount: number
): Promise<void> => {
  const updatedType: AmountProduct = {
    amount,
  };
  await EDITAR(productCollection, idProduct, updatedType);
};

export const FIND_PRODUCT_BY_BAR_CODE = async (codigo: number) => {
  const data = await LISTAR_IN(productCollection, BAR_CODE, codigo);
  if (data.size === 1) {
    return {
      producto: data.docs[0].data(),
      id: data.docs[0].id,
    };
  } else {
    return null;
  }
};
