import { AccountCircle } from "@mui/icons-material";
import { Box, IconButton, Menu, MenuItem } from "@mui/material";
import { ColorModeSwitch } from ".."; // Make sure to import ColorModeSwitch from the correct location.
import { useState } from "react";

/**
 * Component for rendering an account button with a dropdown menu.
 *
 * This component displays an account button with an associated dropdown menu
 * that can contain various options. In this example, it includes the ColorModeSwitch component.
 *
 * @returns {JSX.Element} The AccountButton component.
 */
export const AccountButton = (): JSX.Element => {
  // State to manage the anchor element for the menu.
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  // Check if the menu is open.
  const isMenuOpen = Boolean(anchorEl);

  // Function to handle opening the profile menu.
  const handleProfileMenuOpen = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  };

  // Function to handle closing the menu.
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Render the menu with options.
  const renderMenu = (
    <Menu
      keepMounted
      open={isMenuOpen}
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      onClose={handleMenuClose}
    >
      {/* Include the ColorModeSwitch component in the menu */}
      <MenuItem>
        <ColorModeSwitch />
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ display: { xs: "flex" } }}>
      {/* Display the account button */}
      <IconButton edge="end" color="inherit" onClick={handleProfileMenuOpen}>
        <AccountCircle />
      </IconButton>

      {/* Render the dropdown menu */}
      {renderMenu}
    </Box>
  );
};
