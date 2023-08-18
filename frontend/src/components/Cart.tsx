import {
  Box,
  Button,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { IItem } from "./ProductItem";
import { RemoveShoppingCart } from "@mui/icons-material";

export interface ICart {
  index: number;
  productId: number;
  name: string;
  price: number;
  quantity: number;
  amount: number;
  products: IItem[];
}

interface Iprops {
  cart: ICart[];
  removeItem: (e: any) => void;
  totalAmount: number;
  submitCheckout: () => void;
  submitDisable: boolean;
}

const Cart = (props: Iprops) => {
  // const [submitDisable, setSubmitDisable] = useState(false);
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="Cart">
        <TableHead>
          <TableRow>
            <TableCell>Index</TableCell>
            <TableCell align="right">Product</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Qty</TableCell>
            <TableCell align="right">Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.cart.map((c) => {
            return (
              <TableRow key={c.name}>
                <TableCell>{c.index}</TableCell>
                <TableCell align="right">{c.name}</TableCell>
                <TableCell align="right">{c.price}</TableCell>
                <TableCell align="right">{c.quantity}</TableCell>
                <TableCell align="right">{c.amount.toFixed(2)}</TableCell>
                <TableCell align="right">
                  <IconButton color="error" onClick={() => props.removeItem(c)}>
                    <RemoveShoppingCart />
                  </IconButton>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <Box
        sx={{
          margin: "1em",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <div>
          <Button
            disabled={props.submitDisable}
            onClick={props.submitCheckout}
            variant="contained"
          >
            Submit
          </Button>
        </div>
        <div>
          <Typography variant="body1">
            {" "}
            Total amount: {props.totalAmount.toFixed(2)} &euro;
          </Typography>
        </div>
      </Box>
    </TableContainer>
  );
};

export default Cart;
