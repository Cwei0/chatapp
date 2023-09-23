import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import { Server } from "../../types";
import { Link, useParams } from "react-router-dom";

type ServerChannelProps = {
  data: Array<Server>;
};
export const ServerChannels = ({ data }: ServerChannelProps) => {
  const theme = useTheme();
  const { serverId } = useParams();
  const server_name = data?.[0]?.name ?? "Channels";
  return (
    <>
      <Box
        sx={{
          height: "50px",
          display: "flex",
          alignItems: "center",
          px: 2,
          borderBottom: `1px solid ${theme.palette.divider}`,
          position: "sticky",
          backgroundColor: `${theme.palette.background.default}`,
        }}
      >
        <Typography
          variant="body1"
          style={{
            textOverflow: "ellipsis",
            overflow: "hiiden",
            whiteSpace: "nowrap",
            textTransform: "capitalize",
          }}
        >
          {server_name}
        </Typography>
      </Box>
      <List sx={{ py: 0 }}>
        {data.flatMap((obj) =>
          obj.channel_server.map((item) => (
            <ListItem
              disablePadding
              key={item.id}
              sx={{ display: "block", maxHeight: "45px" }}
              dense={true}
            >
              <Link
                to={`/server/${serverId}/${item.id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <ListItemButton sx={{ minHeight: 48 }}>
                  <ListItemText
                    primary={
                      <Typography
                        variant="body1"
                        textAlign="start"
                        padding={1}
                        textTransform="capitalize"
                      >
                        {item.name}
                      </Typography>
                    }
                  />
                </ListItemButton>
              </Link>
            </ListItem>
          ))
        )}
      </List>
    </>
  );
};
