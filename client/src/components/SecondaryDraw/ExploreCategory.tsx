import { useEffect } from "react";
import { useCrud } from "../../service";
import {
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import { Link } from "react-router-dom";
import { MEDIA_URL } from "../../config";
import { Category } from "../../types";

export const ExploreCategory = () => {
  const theme = useTheme();
  const { data, fetchData } = useCrud<Category>({
    initialData: [],
    apiUrl: "server/category/",
  });

  useEffect(() => {
    fetchData();
  }, []);

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
        Explore
      </Box>
      <List sx={{ py: 0 }}>
        {data.map((item) => (
          <ListItem
            disablePadding
            key={item.id}
            sx={{ display: "block" }}
            dense={true}
          >
            <Link
              to={`/explore/${item.name}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <ListItemButton sx={{ minHeight: 48 }}>
                <ListItemIcon sx={{ minWidth: 0, justifyContent: "center" }}>
                  <ListItemAvatar sx={{ minWidth: "0px" }}>
                    <img
                      alt="Category Icon"
                      src={`${MEDIA_URL}${item.icon}`}
                      style={{
                        width: "25px",
                        height: "25px",
                        display: "block",
                        margin: "auto",
                      }}
                    />
                  </ListItemAvatar>
                </ListItemIcon>
                <ListItemText 
                  primary={
                    <Typography variant="body1" textAlign="start" padding={1} textTransform="capitalize">
                      {item.name}
                    </Typography>
                  }
                />
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>
    </>
  );
};
