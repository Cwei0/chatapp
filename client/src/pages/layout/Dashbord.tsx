import {
  Box,
  styled,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { ReactNode, useEffect, useState } from "react";
import { DrawToggle } from "../../components";
import MuiDrawer from "@mui/material/Drawer";

type ChildProps = {
  open: boolean;
};

type Props = {
  children: ReactNode;
};

type ChildElement = React.ReactElement<ChildProps>;

export const Dashbord = ({ children }: Props) => {
  const theme = useTheme();
  const below800 = useMediaQuery("(max-width:599px)");
  const [open, setOpen] = useState<boolean>(!below800);

  useEffect(() => {
    setOpen(!below800);
  }, [below800]);

  const openedMixin = () => ({
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: "hidden",
  });

  const closedMixin = () => ({
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: "hidden",
    width: theme.primaryDraw.closed,
  });

  const Drawer = styled(
    MuiDrawer,
    {}
  )(({ theme, open }) => ({
    width: theme.primaryDraw.width,
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    ...(open && {
      ...openedMixin(),
      "& .MuiDrawer-paper": openedMixin(),
    }),
    ...(!open && {
      ...closedMixin(),
      "& .MuiDrawer-paper": closedMixin(),
    }),
  }));
  const handleDrawOpen = () => {
    setOpen(true);
  };
  const handleDrawClose = () => {
    setOpen(false);
  };
  return (
    <Drawer
      open={open}
      variant={below800 ? "temporary" : "permanent"}
      PaperProps={{
        sx: {
          mt: `${theme.primaryAppBar.height}px`,
          height: `calc(100vh - ${theme.primaryAppBar.height}px)`,
          width: theme.primaryDraw.width,
        },
      }}
    >
      <Box>
        <Box
          sx={{
            position: "absolute",
            top: 0,
            right: 0,
            p: 0,
            width: open ? "auto" : "100%",
          }}
        >
          <DrawToggle
            open={open}
            handleDrawOpen={handleDrawOpen}
            handleDrawClose={handleDrawClose}
          />
        </Box>
          {React.Children.map(children, (child) => {
            return React.isValidElement(child)
              ? React.cloneElement(child as ChildElement, { open })
              : child;
          })}
      </Box>
    </Drawer>
  );
};
