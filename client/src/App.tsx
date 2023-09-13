import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { Explore, Home } from "./pages";
import { ThemeProvider } from "@emotion/react";
import { createMuiTheme } from "./theme";

function App() {
  const theme = createMuiTheme();
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/" element={<Home />} />
        <Route path="/explore/:categoryName" element={<Explore />} />
      </Route>
    )
  );
  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
