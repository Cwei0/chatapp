import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  Link,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import React, { useEffect, useState } from "react";
import { ExploreCategory } from "../../components";

export function Navbar() {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("sm"));
  const [sideMenu, setSideMenu] = useState<boolean>(false);
  const list = () => (
    <Box
      sx={{ pt: `${theme.primaryAppBar.height}px`, minWidth: 200 }}
      onClick={toggleDraw(false)}
      onKeyDown={toggleDraw(false)}
    >
      <ExploreCategory/>
    </Box>
  );
  const toggleDraw =
    (open: boolean) =>
    (e: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent) => {
      e.preventDefault();
      if (
        e.type === "keydown" &&
        ((e as React.KeyboardEvent).key === "Tab" ||
          (e as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }
      setSideMenu(open);
    };

  useEffect(() => {
    if (isLargeScreen && sideMenu) {
      setSideMenu(!sideMenu);
    }
  }, [isLargeScreen, sideMenu]);
  return (
    <AppBar
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 2,
        backgroundColor: theme.palette.background.default,
        borderBottom: `2px solid ${theme.palette.divider}`,
      }}
    >
      <Toolbar
        variant="dense"
        sx={{
          height: theme.primaryAppBar.height,
          minHeight: theme.primaryAppBar.height,
        }}
      >
        <Box sx={{ display: { xs: "block", sm: "none" } }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDraw(!sideMenu)}
            edge="start"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
        </Box>
        <Drawer anchor="left" open={sideMenu}>
          {list()}
        </Drawer>
        <Link href="/" underline="none" color="inherit">
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { fontWeight: 700, letterSpacing: "-0.5px" } }}
          >
            DJCHAT
          </Typography>
        </Link>
      </Toolbar>
    </AppBar>
  );
}
