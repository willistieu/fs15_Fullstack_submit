import { ExpandLess, MoreHoriz } from "@mui/icons-material";
import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

export interface IItem {
  id: Number;
  name: String;
  description: String;
  price: Number;
  imgUrl: String;
  createBy: String;
  editedBy: String;
}

const ProductItem = (item: IItem) => {
  const [desExpand, setDesExpand] = useState(false);
  return (
    <Card variant="outlined" sx={{ maxWidth: 150 }}>
      {/* <CardHeader title={item.name} /> */}
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
    </Card>
  );
};

export default ProductItem;
