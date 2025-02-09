import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import { Container } from "@mui/material";
import Products from "../pages/Products";

const Main = () => {
  return (
    <Container sx={{ m: 2 }} maxWidth="xl">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="admin/product" element={<Products />} />
      </Routes>
    </Container>
  );
};

export default Main;
