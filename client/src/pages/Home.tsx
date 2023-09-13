import { Box, CssBaseline } from "@mui/material";
import { Dashbord, Main, Navbar, SecondaryDashbord } from "./layout";
import { ExploreCategory, ExploreServers, PopularChannel } from "../components";

export const Home = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Navbar />
      <Dashbord>
        <PopularChannel open={false} />
      </Dashbord>
      <SecondaryDashbord>
        <ExploreCategory/>
      </SecondaryDashbord>
      <Main>
        <ExploreServers/>
      </Main>
    </Box>
  );
};
