import { useParams } from "react-router-dom";
import { useCrud } from "../../service";
import { Server } from "../../types";
import { useEffect } from "react";
import { Box, Container, Typography } from "@mui/material";

export const ExploreServers = () => {
  const { categoryName } = useParams();
  const url = categoryName
    ? `/server/select/?category=${categoryName}`
    : "/server/select/";
  const { data, fetchData } = useCrud<Server>({
    apiUrl: url,
    initialData: [],
  });
  useEffect(() => {
    fetchData();
  }, [categoryName]);
  return (
    <>
      <Container maxWidth="lg">
        <Box sx={{ pt: 6 }}>
          <Typography
            variant="h3"
            noWrap
            component="h1"
            sx={{
              display: {
                sm: "block",
                fontWeight: 700,
                fontSize: "48px",
                letterSpacing: "-2px",
              },
              textAlign: { xs: "center", sm: "left" },
            }}
          >
            {categoryName ? categoryName : "Popular Channels"}
          </Typography>
        </Box>
      </Container>
    </>
  );
};
