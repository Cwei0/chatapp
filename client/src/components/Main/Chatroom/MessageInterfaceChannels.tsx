import {
  AppBar,
  Avatar,
  Box,
  Drawer,
  IconButton,
  ListItemAvatar,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Server } from "../../../types";
import { useParams } from "react-router-dom";
import { MEDIA_URL } from "../../../config";
import { MoreVert } from "@mui/icons-material";
import { ServerChannels } from "../..";
import { useEffect, useState } from "react";

type Props = {
  data: Array<Server>;
};

export const MessageInterfaceChannels = ({ data }: Props) => {
  const theme = useTheme();
  const { serverId, channelId } = useParams();
  const [sideMenu, setSideMenu] = useState<boolean>(false);
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("sm"));
  const channelName =
    data
      ?.find((server) => server.id == Number(serverId))
      ?.channel_server?.find((channel) => channel.id == Number(channelId))
      ?.name || "Home";
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
  const list = () => (
    <Box
      sx={{ pt: `${theme.primaryAppBar.height}px`, minWidth: 200 }}
      onClick={() => toggleDraw(false)}
      onKeyDown={() => toggleDraw(false)}
    >
      <ServerChannels data={data} />
    </Box>
  );
  useEffect(() => {
    if (isLargeScreen && sideMenu) {
      setSideMenu(!sideMenu);
    }
  }, [isLargeScreen, sideMenu]);
  return (
    <>
      <AppBar
        sx={{
          backgroundColor: theme.palette.background.default,
          borderBottom: `1px solid ${theme.palette.divider}`,
        }}
        color="default"
        position="sticky"
        elevation={0}
      >
        <Toolbar
          variant="dense"
          sx={{
            minHeight: theme.primaryAppBar.height,
            height: theme.primaryAppBar.height,
            display: "flex",
            alignItems: "center",
          }}
        >
          <Box sx={{ display: { xs: "block", sm: "none" } }}>
            <ListItemAvatar sx={{ minWidth: "40px" }}>
              <Avatar
                alt="Server Icon"
                src={`${MEDIA_URL}${data?.[0]?.icon}`}
                sx={{ width: 30, height: 30 }}
              />
            </ListItemAvatar>
          </Box>
          <Typography noWrap component="div" sx={{textTransform: "capitalize"}}>
            {channelName}
          </Typography>
          <Box flexGrow={1}></Box>
          <Box sx={{ display: { xs: "block", sm: "none" } }}>
            <IconButton color="inherit" edge="end" onClick={toggleDraw(true)}>
              <MoreVert />
            </IconButton>
          </Box>
          <Drawer anchor="left" open={sideMenu} onClose={toggleDraw(false)}>
            {list()}
          </Drawer>
        </Toolbar>
      </AppBar>
    </>
  );
};
