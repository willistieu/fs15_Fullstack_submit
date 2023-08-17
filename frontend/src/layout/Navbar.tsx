import {
  AppBar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
// import MenuIcon from "@mui/icons-material/Menu";

import React, { useState } from "react";
import { Menu } from "@mui/icons-material";
import Drawer from "./DrawerComponent";
import DrawerComponent from "./DrawerComponent";

const Navbar = () => {
  const [drawerState, setDrawerState] = useState(false);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={() => setDrawerState(!drawerState)}
          >
            <Menu />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Shopping App
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      <DrawerComponent
        anchor="left"
        open={drawerState}
        onClose={() => setDrawerState(!drawerState)}
      />
    </Box>
  );
};

export default Navbar;
