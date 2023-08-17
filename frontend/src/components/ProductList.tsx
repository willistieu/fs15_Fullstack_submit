import React from "react";
import ProductItem, { IItem } from "./ProductItem";
import { Box } from "@mui/material";

interface Iprops {
  data: IItem[];
}

const ProductList = (props: Iprops) => {
  return (
    <Box id="productlist">
      {props.data.map((p) => {
        return (
          <ProductItem
            id={p.id}
            name={p.name}
            description={p.description}
            price={p.price}
            imgUrl={p.imgUrl}
            createBy={p.createBy}
            editedBy={p.editedBy}
          />
        );
      })}
    </Box>
  );
};

export default ProductList;
