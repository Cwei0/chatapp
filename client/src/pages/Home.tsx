import { Box, CssBaseline } from "@mui/material";
import { Navbar } from "./templates";

export const Home = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Navbar />
    </Box>
  );
};
