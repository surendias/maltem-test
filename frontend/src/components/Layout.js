import React from "react";
import {
  Box,
  CssBaseline,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  AppBar,
} from "@mui/material";

import DiningIcon from "@mui/icons-material/Dining";
import HomeIcon from "@mui/icons-material/Home";

const drawerWidth = 240;

const Layout = ({ children }) => {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Café Employee
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        {/* <Toolbar /> */}
        <Box sx={{ overflow: "auto" }}>
          <List>
            <a href="/">
              <ListItem button key="Home">
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText primary="Home" />
              </ListItem>
            </a>
            <a href="/cafes">
              <ListItem button key="Cafe">
                <ListItemIcon>
                  <DiningIcon />
                </ListItemIcon>
                <ListItemText primary="Cafes" />
              </ListItem>
            </a>
          </List>
        </Box>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
      >
        {/* <Toolbar /> */}
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
