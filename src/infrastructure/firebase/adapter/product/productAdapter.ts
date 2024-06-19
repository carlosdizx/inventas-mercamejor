import {
  UPDATE,
  LIST_IN,
  LIST,
} from "@/infrastructure/firebase/template/basicOperations";
import {
  BAR_CODE,
  ProductToList,
  UpdatedProduct,
} from "@/domain/model/product/Product";
import { DocumentData } from "firebase/firestore";

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

export const FIND_PRODUCT_BY_BAR_CODE = async (codigo: string) => {
  const data = await LIST_IN(productCollection, BAR_CODE, codigo);
  if (data.size > 0) {
    return {
      product: data.docs[0].data(),
      id: data.docs[0].id,
    };
  } else {
    return null;
  }
};

export const GET_ALL_PRODUCTS = async (): Promise<ProductToList[]> => {
  const products = [] as Array<ProductToList>;
  const data = await LIST(productCollection);
  if (!data.empty) {
    data.forEach((a: DocumentData) => {
      const productData = a.data();
      const product: ProductToList = {
        id: a.id,
        bar_code: productData.bar_code,
        name: productData.name,
        unit_price: productData.unit_price,
        sale_price: productData.sale_price,
      };
      products.push(product);
    });
  }
  return products;
};
