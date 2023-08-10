import { Box, CssBaseline } from "@mui/material";
import { Dashbord, Main, Navbar, SecondaryDashbord } from "./templates";

export const Home = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Navbar />
      <Dashbord />
      <SecondaryDashbord />
      <Main />
    </Box>
  );
};
