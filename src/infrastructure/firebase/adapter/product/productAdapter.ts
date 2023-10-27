import { UPDATE, LISTAR_IN } from "../../template/basicOperations";
import { BAR_CODE, UpdatedProduct } from "@/domain/model/product/Product";

const productCollection = "products";

export const UPDATE_AMOUNT_PRODUCT = async (
  idProduct: string,
  amount: number,
  unitPrice: number,
  salePrice: number
): Promise<void> => {
  const updatedType: UpdatedProduct = {
    amount,
    sale_price: salePrice,
    unit_price: unitPrice,
  };
  await UPDATE(productCollection, idProduct, updatedType);
};

export const FIND_PRODUCT_BY_BAR_CODE = async (codigo: number) => {
  const data = await LISTAR_IN(productCollection, BAR_CODE, codigo);
  if (data.size === 1) {
    return {
      product: data.docs[0].data(),
      id: data.docs[0].id,
    };
  } else {
    return null;
  }
};
