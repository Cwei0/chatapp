import { Box, useTheme } from "@mui/material";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
}

export const Main = ({children}:Props) => {
  const theme = useTheme();
  return (
    <Box
      flexGrow={1}
      sx={{
        mt: `${theme.primaryAppBar.height}px`,
        height: `calc(100vh - ${theme.primaryAppBar.height}px)`,
        overflow: "hidden"
      }}
    >
      {children}
    </Box>
  );
};
