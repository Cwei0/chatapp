import { Box, Typography, useTheme } from "@mui/material";

export const Main = () => {
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
      {[...Array(100)].map((_, i) => (
        <Typography key={i} paragraph>
          {i + 1}
        </Typography>
      ))}
    </Box>
  );
};
