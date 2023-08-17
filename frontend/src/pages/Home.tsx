import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { fetchProductList } from "../utils/productController";
import ProductList from "../components/ProductList";

const Home = () => {
  const [productList, setProductList] = useState([]);
  useEffect(() => {
    fetchProductList()
      .then((result) => {
        console.log(result);
        setProductList(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <Box>
      <ProductList data={productList} />
    </Box>
  );
};

export default Home;
