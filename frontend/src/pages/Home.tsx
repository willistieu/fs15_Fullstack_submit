import { Box, Button, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  fetchProductList,
  initLoadingProductList,
} from "../utils/productController";
import ProductList from "../components/ProductList";
import { IItem } from "../components/ProductItem";

import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import Cart, { ICart } from "../components/Cart";
import { addCartItemToDb, addItem, removeItem } from "../utils/cartController";

const Home = () => {
  const [fetchParams, setFetchParams] = useState({
    offset: 0,
    limit: 5,
  });
  const [productList, setProductList] = useState<IItem[]>([]);
  const [cart, setCart] = useState<ICart[]>([]);
  const [totalAmount, settotalAmount] = useState(0);
  const [cartSubmitDisable, setCartSubmitDisable] = useState(false);
  const loadProductList = async () => {
    const products = await initLoadingProductList(
      fetchParams.offset,
      fetchParams.limit
    );

    setProductList(products);
  };

  // const first = (second) => { third }
  const totalAmountCal = (inputCart: ICart[]) => {
    let totAm = 0;
    inputCart.forEach((ic) => {
      totAm += ic.amount;
    });
    return totAm;
  };

  const addNewCartItems = async () => {
    if (cart.length > 0) {
      cart.forEach(async (c) => {
        await addCartItemToDb(c)
          .then((result) => {
            console.log(result);
          })
          .catch((err) => {
            console.log(err);
          });
      });
    }
  };
  useEffect(() => {
    loadProductList();
  }, []);
  useEffect(() => {
    console.log(cart);
    settotalAmount(totalAmountCal(cart));
  }, [cart]);
  return (
    <Box>
      <Cart
        cart={cart}
        removeItem={async (e) => {
          const currCart = await removeItem(cart, e);
          setCart(currCart);
          // console.log(e)
        }}
        totalAmount={totalAmount}
        submitCheckout={() => {
          addNewCartItems();
          setCartSubmitDisable(!cartSubmitDisable);
        }}
        submitDisable={cartSubmitDisable}
      />
      <Box>
        <IconButton
          disabled={fetchParams.offset === 0 ? true : false}
          onClick={async () => {
            await setFetchParams({
              offset: (fetchParams.offset -= 5),
              limit: 5,
            });
            loadProductList();
          }}
        >
          <ArrowBackIos />
        </IconButton>
        <IconButton
          disabled={productList.length < 5 ? true : false}
          onClick={async () => {
            await setFetchParams({
              offset: (fetchParams.offset += 5),
              limit: 5,
            });
            loadProductList();
          }}
        >
          <ArrowForwardIos />
        </IconButton>
      </Box>
      <ProductList
        data={productList}
        addToCart={async (e) => {
          setCart([]);
          const currentcart = await addItem(cart, e);
          setCart(currentcart);
          // console.log(cart);
        }}
        removeFromCart={(e) => console.log(e)}
      />
    </Box>
  );
};

export default Home;
