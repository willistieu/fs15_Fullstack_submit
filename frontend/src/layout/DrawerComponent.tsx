import { Box, Button, List, ListItem, Typography, Drawer } from "@mui/material";
import { Home, Info } from "@mui/icons-material";
import React from "react";

interface props {
  anchor: "top" | "right" | "bottom" | "left";
  open: true | false;
  onClose: () => void;
}

const DrawerComponent = (drawerProps: props) => {
  const drawItems = [
    { name: "Home", icon: <Home /> },
    { name: "About", icon: <Info /> },
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
              </ListItem>
            );
          })}
        </List>
      </Box>
    </Drawer>
  );
};

export default DrawerComponent;
