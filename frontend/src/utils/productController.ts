import { dataInstance } from "./externalFetch";

export const fetchProductList = async (offset: number, limit: number) => {
  const { data } = await dataInstance.get(
    `products?offset=${offset}&limit=${limit}`
  );
  return data;
};

export const initLoadingProductList = async (offset: number, limit: number) => {
  const products = await fetchProductList(offset, limit);
  return products;
};
