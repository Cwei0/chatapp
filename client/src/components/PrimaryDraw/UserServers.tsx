import { Server } from "../../types";
import {
  Avatar,
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { MEDIA_URL } from "../../config";

type Props = {
  open: boolean;
  data: Array<Server>;
};

export const UserServers = ({ open, data }: Props) => {
  
  return (
    <>
      <Box
        sx={{
          height: 50,
          p: 2,
          display: "flex",
          alignItems: "center",
          flex: "1 1 100%",
        }}
      >
        <Typography sx={{ display: open ? "block" : "none" }}>
          Servers
        </Typography>
      </Box>
      <List>
        {data.map((item) => (
          <ListItem
            key={item.id}
            disablePadding
            sx={{ display: "block" }}
            dense={true}
          >
            <Link
              to={`/server/${item.id}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <ListItemButton sx={{ minHeight: 0 }}>
                <ListItemIcon sx={{ minWidth: 0, justifyContent: "center" }}>
                  <ListItemAvatar sx={{ minWidth: "50px" }}>
                    <Avatar
                      alt="Server Icon"
                      src={`${MEDIA_URL}${item.icon}`}
                    />
                  </ListItemAvatar>
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: 700,
                        lineHeight: 1.2,
                        textOverflow: "ellipsis",
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        textTransform: "capitalize",
                      }}
                    >
                      {item.name}
                    </Typography>
                  }
                  secondary={
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: 500,
                        lineHeight: 1.2,
                        color: "GrayText",
                        textTransform: "capitalize",
                      }}
                    >
                      {item.category}
                    </Typography>
                  }
                  sx={{ opacity: open ? 1 : 0 }}
                  primaryTypographyProps={{
                    sx: { textOverflow: "ellipsis", overflow: "hidden" },
                  }}
                />
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>
    </>
  );
};
