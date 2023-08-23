import { IItem } from "../components/ProductItem";
import { dataInstance } from "./externalFetch";

export interface IProduct {
  id: number;
  name: string;
  description: string;
  price: number;
  imgUrl: string;
  createBy: string;
  editedBy: string;
}

export const fetchProductList = async (offset: number, limit: number) => {
  const { data } = await dataInstance.get(
    `products?offset=${offset}&limit=${limit}`
  );
  return data;
};

export const getProductLength = async () => {
  const { data } = await dataInstance.get("product/length");
  return data;
};

export const initLoadingProductList = async (offset: number, limit: number) => {
  const products = await fetchProductList(offset, limit);
  return products;
};

export const deleteAProduct = async (id: number) => {
  const { data } = await dataInstance.delete(`products/${id}`);
  return data;
};

export const createAProduct = async (product: IProduct) => {
  const body = {
    id: product.id,
    name: product.name,
    description: product.description,
    price: product.price,
    imgUrl: product.imgUrl,
    createBy: product.createBy,
    editedBy: product.editedBy,
  };
  const { data } = await dataInstance.post("products", body);
  return data;
};

export const editProduct = async (product: IProduct) => {
  const body = {
    id: 0,
    name: product.name,
    description: product.description,
    price: product.price,
    imgUrl: product.imgUrl,
    createBy: product.createBy,
    editedBy: product.editedBy,
  };
  const { data } = await dataInstance.put(`products/${product.id}`, body);
  return data;
};
