import React from "react";
import "./styles/app.css";
import { BrowserRouter } from "react-router-dom";
import { fetchProductList } from "./utils/productController";
import Navbar from "./layout/Navbar";
import Main from "./layout/Main";
import Footer from "./layout/Footer";
import { Container } from "@mui/material";

const App = () => {
  // console.log(fetchProductList());
  return (
    <div>
      <Navbar />
      <Container>
        <BrowserRouter>
          <Main />
        </BrowserRouter>
        <Footer />
      </Container>
    </div>
  );
};

export default App;
