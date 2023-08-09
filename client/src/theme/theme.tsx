import { createTheme, responsiveFontSizes } from "@mui/material";

declare module "@mui/material/styles" {
  interface Theme {
    primaryAppBar: {
      height: number;
    };
    primaryDraw: {
      width: number;
      closed:number;
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    primaryAppBar?: {
      height?: number;
    };
    primaryDraw?: {
      width?: number;
      closed?: number;
    };
  }
}

export const createMuiTheme = () => {
  let theme = createTheme({
    primaryAppBar: {
      height: 50,
    },
    primaryDraw: {
      width: 240,
      closed: 70
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