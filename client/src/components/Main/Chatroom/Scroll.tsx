import { Box, styled } from "@mui/material";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const ScrollContainer = styled(Box)(({ theme }) => ({
  height: "calc(100vh - 100px)",
  overflowY: "scroll",
  "&::-webkit-scrollbar": {
    width: "8px",
    height: "8px",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "#888",
    borderRadius: "4px",
  },
  "&::-webkit-scrollbar-thumb:hover": {
    backgroundColor: "#555",
  },
  "&::-webkit-scrollbar-track": {
    // backgroundColor: "#f0f0f0",
  },
  "&::-webkit-scrollbar-corner": {
    backgroundColor: "transparent",
  },
}));

export const Scroll = ({ children }: Props) => {
  return <ScrollContainer>{children}</ScrollContainer>;
};
