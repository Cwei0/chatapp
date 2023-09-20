import { IconButton, Typography, useTheme } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext } from "../../../context";
import { Brightness4, ToggleOff, ToggleOn } from "@mui/icons-material";

/**
 * Component for rendering a color mode switcher button.
 *
 * This component displays the current color mode and a button to toggle
 * between light and dark modes.
 *
 * @returns {JSX.Element} The ColorModeSwitch component.
 */
export const ColorModeSwitch = (): JSX.Element => {
  // Access the current theme.
  const theme = useTheme();

  // Access the color mode context to toggle between modes.
  const colorMode = useContext(ColorModeContext);

  return (
    <>
      <Brightness4 sx={{ marginRight: "6px", fontSize: "20px" }} />
      {/* Display the current color mode */}
      <Typography variant="body2" sx={{ textTransform: "capitalize" }}>
        {theme.palette.mode} mode
      </Typography>

      {/* Render the color mode toggle button */}
      <IconButton
        sx={{ m: 0, p: 0, pl: 2 }}
        onClick={colorMode.toggleColorMode}
        color="inherit"
      >
        {/* Display the appropriate icon based on the current color mode */}
        {theme.palette.mode === "dark" ? (
          <ToggleOff sx={{ fontSize: "2.5rem", p: 0 }} />
        ) : (
          <ToggleOn sx={{ fontSize: "2.5rem" }} />
        )}
      </IconButton>
    </>
  );
};
