import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, IconButton, Menu, MenuItem } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { logout, setPairedCoach } from "Reducers/UserSlice";
import logoutUser from "Common/Logout";
import { getUserName } from "Header/Fetch";
import { stringToColor } from "Common/StringAvatar";

/**
 *
 * @returns {JSX} - JSX representing user dropdown menu
 */
const DropdownButton = () => {
  const data = useSelector((state) => state.user);
  const [userName, setUserName] = useState(undefined);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const dispatch = useDispatch();

  useEffect(() => {
    const _getUserName = async () => {
      console.log(data.userType);
      const name = await getUserName(data.userType);
      console.log(name);
      setUserName(name);
    };
    _getUserName();
  }, [data]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  /**
   * Updates web app to match logout state
   */
  const toggleLogout = async () => {
    handleClose();
    const success = await logoutUser();
    if (success) {
      dispatch(logout());
      dispatch(setPairedCoach(undefined));
    }
  };

  const theme = createTheme({
    components: {
      MuiMenuItem: {
        styleOverrides: {
          root: {
            width: "200px",
            fontFamily: ["Lato", "sans-serif"].join(","),
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      {userName && (
        <>
          <IconButton size="small" onClick={handleClick}>
            <Avatar
              sx={{
                width: "calc(var(--header-height) - 1rem)",
                height: "calc(var(--header-height) - 1rem)",
                bgcolor: stringToColor(
                  userName?.firstName + " " + userName?.lastName
                ),
              }}
            >
              {userName.firstName[0]}
            </Avatar>
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            sx={{ width: "300px" }}
          >
            <MenuItem
              onClick={handleClose}
              sx={{ pointerEvents: "none", cursor: "default" }}
              divider
            >
              Hi, {userName.firstName}
            </MenuItem>
            <MenuItem
              component={NavLink}
              exact
              to="/settings"
              onClick={handleClose}
            >
              Settings
            </MenuItem>
            <MenuItem
              divider
              component={NavLink}
              exact
              to="/help"
              onClick={handleClose}
            >
              Get Help
            </MenuItem>
            <MenuItem onClick={toggleLogout}>Log Out</MenuItem>
          </Menu>
        </>
      )}
    </ThemeProvider>
  );
};

export default DropdownButton;
