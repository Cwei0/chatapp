import { Box, CssBaseline } from "@mui/material"
import { PopularChannel, ExploreCategory } from "../components"
import { Navbar, Dashbord, SecondaryDashbord, Main } from "./layout"

export const Explore = () => {
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
      <Main />
    </Box>
  )
}
