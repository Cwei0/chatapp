import { createTheme, responsiveFontSizes } from "@mui/material";

declare module "@mui/material/styles" {
  interface Theme {
    primaryAppBar: {
      height: number;
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    primaryAppBar?: {
      height?: number;
    };
  }
}

export const createMuiTheme = () => {
  let theme = createTheme({
    primaryAppBar: {
      height: 50,
    },
    components: {
      MuiAppBar: {
        defaultProps: {
          color: "default",
          elevation: 0,
        },
      },
    },
    typography: {
      fontFamily: ["IBM Plex Sans", "sans-serif"].join(","),
    },
  });

  theme = responsiveFontSizes(theme);
  return theme;
};
