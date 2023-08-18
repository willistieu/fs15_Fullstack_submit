import React, { useState } from "react";
import ProductItem, { IItem } from "./ProductItem";
import { Box } from "@mui/material";
import { useAppSelector } from "../redux/hook";
import { getallProdut } from "../redux/slices/productListSlice";
interface IproductList {
  data: IItem[];
  addToCart: (event: any) => void;
  removeFromCart: (event: any) => void;
}

const ProductList = (props: IproductList) => {
  // const data = useAppSelector(getallProdut);
  // console.log(data);
  return (
    <Box id="productlist">
      {Array.isArray(props.data)
        ? props.data.map((p, index) => {
            return (
              <ProductItem
                key={index}
                id={p.id}
                name={p.name}
                description={p.description}
                price={p.price}
                imgUrl={p.imgUrl}
                createBy={p.createBy}
                editedBy={p.editedBy}
                addToCart={() => props.addToCart(p)}
                removeFromCart={() => props.removeFromCart(p)}
              />
            );
          })
        : null}
    </Box>
  );
};

export default ProductList;
