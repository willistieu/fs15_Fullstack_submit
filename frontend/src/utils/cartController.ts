import { ICart } from "../components/Cart";
import { IItem } from "../components/ProductItem";
import { dataInstance } from "./externalFetch";

export const addItem = (cart: ICart[], product: IItem) => {
  let currentCart = cart;

  let itemProduct = [];
  itemProduct.push(product);

  let newItem = {
    index: currentCart.length + 1,
    productId: product.id,
    name: product.name,
    price: product.price,
    quantity: 1,
    amount: product.price,
  };
  const findItem = currentCart.find((c) => c.productId === product.id);
  if (!findItem) {
    currentCart = [...currentCart, newItem];
  } else {
    currentCart.forEach((c) => {
      if (c.productId === product.id) {
        c.quantity += 1;
        c.amount = c.quantity * c.price;
      }
    });
  }
  return currentCart;
};

export const removeItem = (cart: ICart[], cartItem: ICart) => {
  let currentCart = cart;
  currentCart = currentCart.filter((c) => c.index !== cartItem.index);
  let currIndex = 0;
  currentCart.forEach((c) => {
    c.index = currentCart.indexOf(c) + 1;
  });
  return currentCart;
};

export const addCartItemToDb = async (item: ICart) => {
  const body = {
    id: 0,
    productId: item.productId,
    productName: item.name,
    quantity: item.quantity,
  };
  const { data } = await dataInstance.post("carts", body);
  return data;
};
