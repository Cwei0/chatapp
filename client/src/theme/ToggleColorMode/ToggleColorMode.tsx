/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import { CssBaseline, ThemeProvider, useMediaQuery } from "@mui/material";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { createMuiTheme } from "..";
import { ColorModeContext } from "../../context";
import Cookies from "js-cookie";

/**
 * Props for the ToggleColorMode component.
 */
type ToggleModeProps = {
  children: React.ReactNode;
};

/**
 * Component for toggling between light and dark color modes in the application.
 *
 * This component provides a context for managing the color mode and
 * applies the chosen theme using Material-UI's ThemeProvider.
 *
 * @param {ToggleModeProps} props - The component props.
 * @returns {JSX.Element} The ToggleColorMode component.
 */
export const ToggleColorMode = ({ children }: ToggleModeProps): JSX.Element => {
  type PreferredMode = "light" | "dark";

  // Initialize the color mode state from local storage or the user's preference.
  const storedMode = Cookies.get("colorMode") as "light" | "dark";
  const defaultMode =
    storedMode ||
    (useMediaQuery("([prefers-color-scheme: dark])") ? "dark" : "light");
  const [mode, setMode] = useState<PreferredMode>(defaultMode);

  // Function to toggle the color mode between light and dark.
  const toggleColorMode = useCallback(() => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  }, []);

  // Store the selected color mode in local storage.
  useEffect(() => {
    Cookies.set("colorMode", mode);
  }, [mode]);

  // Create a context value to provide the color mode and toggle function.
  const colorMode = useMemo(() => ({ toggleColorMode }), [toggleColorMode]);

  // Create a Material-UI theme based on the selected color mode.
  const theme = useMemo(() => createMuiTheme(mode), [mode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};
