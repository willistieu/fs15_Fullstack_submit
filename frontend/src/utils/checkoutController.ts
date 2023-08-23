import { dataInstance } from "./externalFetch";

export interface ICheckout {
  id: number;
  customerName: string;
  customerId: number;
  amount: number;
  cartId: number;
}

export const createACheckout = async (checkout: ICheckout) => {
  const body = {
    id: 0,
    customerName: checkout.customerName,
    customerId: checkout.customerId,
    amount: checkout.amount,
    cartId: 0,
  };

  const { data } = await dataInstance.post("checkout", body);
  return data;
};
