/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
import { Box, CssBaseline } from "@mui/material";
import { Dashbord, Main, Navbar, SecondaryDashbord } from "./layout";
import { MessageInterface, ServerChannels, UserServers } from "../components";
import { useNavigate, useParams } from "react-router-dom";
import { useCrud } from "../service";
import { Server } from "../types";
import { useEffect } from "react";

export const ServerPage = () => {
  const navigate = useNavigate();
  const { serverId, channelId } = useParams();
  const { data, fetchData, error } = useCrud<Server>({
    apiUrl: `server/select/?by_serverid=${serverId}`,
    initialData: [],
  });

  useEffect(() => {
    fetchData();
  }, []);

  if (error) {
    navigate("/");
    return null;
  }

  const isChannel = (): boolean => {
    if (!channelId) {
      return true;
    }

    return data.some((server) =>
      server.channel_server.some(
        (channel) => channel.id === parseInt(channelId)
      )
    );
  };

  useEffect(() => {
    if (!isChannel()) {
      navigate(`/server/${serverId}`);
    }
  }, [isChannel, channelId]);
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Navbar />
      <Dashbord>
        <UserServers open={false} data={data} />
      </Dashbord>
      <SecondaryDashbord>
        <ServerChannels data={data} />
      </SecondaryDashbord>
      <Main>
        <MessageInterface />
      </Main>
    </Box>
  );
};
