import { Box, styled } from "@mui/material";
import React, { useCallback, useEffect, useRef } from "react";

/**
 * Props for the Scroll component.
 */
type ScrollProps = {
  /** The content to be scrolled. */
  children: React.ReactNode;
};

/**
 * A scrollable container component with custom styling.
 */
const ScrollContainer = styled(Box)(() => ({
  height: "calc(100vh - 190px)",
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

/**
 * Scroll component that automatically scrolls to the bottom when its content changes.
 */
export const Scroll = ({ children }: ScrollProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  /**
   * Scroll to the bottom of the container.
   */
  const scrollToBottom = useCallback(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [scrollToBottom, children]);

  return <ScrollContainer ref={scrollRef}>{children}</ScrollContainer>;
};
 