import { createContext } from "react";

/**
 * Defines the structure of the context for managing color mode.
 */
interface ContextProps {
  /**
   * Function to toggle between light and dark color modes.
   */
  toggleColorMode: () => void;
}

/**
 * A React context for managing the application's color mode.
 *
 * This context provides the `toggleColorMode` function to control the color mode
 * within the application.
 */
export const ColorModeContext = createContext<ContextProps>({
  /**
   * A default implementation of the `toggleColorMode` function.
   *
   * This function does nothing by default and should be overridden with the
   * actual implementation when using the context.
   */
  toggleColorMode() {},
});
