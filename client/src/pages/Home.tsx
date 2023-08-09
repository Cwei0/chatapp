import { Box, CssBaseline } from "@mui/material";
import { Dashbord, Navbar } from "./templates";

export const Home = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Navbar />
      <Dashbord />
    </Box>
  );
};
