import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { Explore, Home, ServerPage } from "./pages";
import { ToggleColorMode } from "./theme";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/" element={<Home />} />
        <Route path="/server/:serverId/:channelId?" element={<ServerPage />} />
        <Route path="/explore/:categoryName" element={<Explore />} />
      </Route>
    )
  );
  return (
    <ToggleColorMode>
      <RouterProvider router={router} />
    </ToggleColorMode>
  );
}

export default App;
