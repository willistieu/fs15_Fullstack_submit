import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { IProduct, editProduct } from "../utils/productController";
// import { Ievent } from "../pages/Products";
type Ievent = React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>;

interface Iprops {
  product: IProduct;
  onclose: () => void;
}

const EditProduct = (props: Iprops) => {
  const [currProduct, setCurrProduct] = useState<IProduct>(props.product);
  return (
    <Card
      variant="outlined"
      sx={{
        maxWidth: 550,
      }}
    >
      <CardHeader title="Product Detail" />
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          alignContent: "space-around",
          gap: "1em",
        }}
      >
        <TextField
          fullWidth
          defaultValue={props.product.name}
          onChange={(e: Ievent) => {
            let currP = currProduct;
            currP.name = e.target.value.toString();
            setCurrProduct(currP);
          }}
          label="Name"
          variant="outlined"
        />
        <TextField
          fullWidth
          defaultValue={props.product.description}
          label="Description"
          variant="outlined"
          onChange={(e: Ievent) => {
            let currP = currProduct;
            currP.description = e.target.value.toString();
            setCurrProduct(currP);
          }}
        />
        <TextField
          fullWidth
          defaultValue={props.product.price}
          label="Price"
          variant="outlined"
          onChange={(e: Ievent) => {
            let currP = currProduct;
            currP.price = Number(e.target.value);
            setCurrProduct(currP);
          }}
        />
        <TextField
          fullWidth
          defaultValue={props.product.imgUrl}
          label="Image Url"
          variant="outlined"
          onChange={(e: Ievent) => {
            let currP = currProduct;
            currP.imgUrl = e.target.value.toString();
            setCurrProduct(currP);
          }}
        />
      </CardContent>
      <CardActions>
        <Button
          variant="contained"
          onClick={() => {
            editProduct(currProduct)
              .then((result) => {
                console.log(result);
              })
              .catch((err) => {
                console.log(err);
              });
            props.onclose();
          }}
        >
          Submit
        </Button>
      </CardActions>
    </Card>
  );
};

export default EditProduct;
