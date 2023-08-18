import {
  AddShoppingCart,
  ExpandLess,
  MoreHoriz,
  RemoveShoppingCart,
} from "@mui/icons-material";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";

import React, { useState } from "react";

export interface IItem {
  id: number;
  name: string;
  description: string;
  price: number;
  imgUrl: string;
  createBy: string;
  editedBy: string;
  addToCart: () => void;
  removeFromCart: () => void;
}

const ProductItem = (item: IItem) => {
  const [desExpand, setDesExpand] = useState(false);
  return (
    <Card variant="outlined" sx={{ maxWidth: 150 }}>
      <CardMedia
        component="img"
        height="150"
        image={item.imgUrl.toString()}
        alt={item.name.toString()}
      />
      <CardContent>
        <Typography variant="body2">Name: {item.name}</Typography>
        <Typography variant="body2">
          Price: {item.price.toString()} &euro;
        </Typography>
        <Typography variant="body2">
          Description:
          <br />
          {!desExpand ? (
            <>
              {String(item.description).slice(0, 5)}&nbsp;
              <IconButton onClick={() => setDesExpand(!desExpand)}>
                <MoreHoriz />
              </IconButton>
            </>
          ) : (
            <>
              {item.description}{" "}
              <IconButton onClick={() => setDesExpand(!desExpand)}>
                <ExpandLess />
              </IconButton>
            </>
          )}
        </Typography>
      </CardContent>
      <CardActions
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <IconButton color="primary" onClick={item.addToCart}>
          <AddShoppingCart />
        </IconButton>
        {/* <IconButton color="error" onClick={item.removeFromCart}>
          <RemoveShoppingCart />
        </IconButton> */}
      </CardActions>
    </Card>
  );
};

export default ProductItem;
