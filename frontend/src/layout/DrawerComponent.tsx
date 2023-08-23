import { Box, Button, List, ListItem, Typography, Drawer } from "@mui/material";
import { Category, Home, Info } from "@mui/icons-material";
import React from "react";
import { Link } from "react-router-dom";

interface props {
  anchor: "top" | "right" | "bottom" | "left";
  open: true | false;
  onClose: () => void;
}

const DrawerComponent = (drawerProps: props) => {
  const drawItems = [
    { name: "Home", icon: <Home />, value: "/" },
    { name: "About", icon: <Info />, value: "/about" },
    { name: "Admin", icon: <Category />, value: "/admin/product" },
  ];
  return (
    <Drawer
      open={drawerProps.open}
      anchor={drawerProps.anchor}
      onClose={drawerProps.onClose}
    >
      <Box>
        <List
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          {drawItems.map((_text, index) => {
            return (
              <ListItem key={index}>
                <a href={_text.value}>
                  <Typography variant="body1">
                    <Button
                      variant="text"
                      // color="primary"
                      // color="success"
                      size="small"
                      startIcon={_text.icon}
                      sx={{
                        width: "9em",
                        justifyContent: "left",
                      }}
                    >
                      {_text.name}
                    </Button>
                  </Typography>
                </a>
              </ListItem>
              // </Link>
            );
          })}
        </List>
      </Box>
    </Drawer>
  );
};

export default DrawerComponent;
