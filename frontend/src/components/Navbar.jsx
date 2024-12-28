import React, { useState } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Avatar, 
  Menu, 
  MenuItem,
  IconButton,
} from '@mui/material';

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSettings = () => {
    console.log("Settings clicked");
    handleClose();
  };

  const handleLogout = () => {
    console.log("Logout clicked");
    handleClose();
  };

  return (
    <AppBar position="static" className="bg-gray-900">
      <Toolbar className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo/Brand */}
        <div className="text-2xl font-bold text-white">
          User Vault
        </div>

        {/* Profile Menu */}
        <div>
          <IconButton
            onClick={handleClick}
            size="small"
            className="p-0"
          >
            <Avatar 
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Jane"
              alt="User"
              className="w-10 h-10 border-2 border-gray-200 hover:border-gray-300 transition-all"
            />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
              className: 'mt-2'
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <MenuItem 
              onClick={handleSettings}
              className="px-4 py-2 hover:bg-gray-100"
            >
              Settings
            </MenuItem>
            <MenuItem 
              onClick={handleLogout}
              className="px-4 py-2 hover:bg-gray-100 text-red-600"
            >
              Logout
            </MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;