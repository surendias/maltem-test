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
  IconButton,
} from "@mui/material";
import DiningIcon from "@mui/icons-material/Dining";
import HomeIcon from "@mui/icons-material/Home";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";

const drawerWidth = 240;

const Layout = ({ children }) => {
  const navigate = useNavigate();

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: `calc(100% - ${drawerWidth}px)`,
          ml: `${drawerWidth}px`,
          backgroundColor: "#3f51b5",
          boxShadow: "0px 4px 20px rgba(0,0,0,0.3)",
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
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
            backgroundColor: "#f5f5f5",
            borderRight: "1px solid #e0e0e0",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Box sx={{ overflow: "auto" }}>
          <List>
            <ListItem button onClick={() => navigate("/")} key="Home">
              <ListItemIcon>
                <HomeIcon sx={{ color: "#3f51b5" }} />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItem>
            <ListItem button onClick={() => navigate("/cafes")} key="Cafe">
              <ListItemIcon>
                <DiningIcon sx={{ color: "#3f51b5" }} />
              </ListItemIcon>
              <ListItemText primary="Cafes" />
            </ListItem>
          </List>
        </Box>
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: "#f0f0f0",
          p: 3,
          minHeight: "100vh",
          boxShadow: "inset 0px 0px 10px rgba(0,0,0,0.1)",
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
