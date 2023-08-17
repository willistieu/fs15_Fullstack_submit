import { dataInstance } from "./externalFetch";

export const fetchProductList = async () => {
  const { data } = await dataInstance.get("products");
  return data;
};
