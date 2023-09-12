import React, { useState } from "react";
import {
  SwipeableDrawer,
  Box,
  IconButton,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
// Hamburger icon
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
// Close icon
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
// Common icons
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import HelpRoundedIcon from "@mui/icons-material/HelpRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
// Leader icons
import PermContactCalendarRoundedIcon from "@mui/icons-material/PermContactCalendarRounded";
import EventRoundedIcon from "@mui/icons-material/EventRounded";
import MenuBookRoundedIcon from "@mui/icons-material/MenuBookRounded";
// Coach icons
import PeopleRoundedIcon from "@mui/icons-material/PeopleRounded";
import FeedbackRoundedIcon from "@mui/icons-material/FeedbackRounded";
import LibraryBooksRoundedIcon from "@mui/icons-material/LibraryBooksRounded";

import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "Reducers/UserSlice";
import logoutUser from "Common/Logout";

/**
 *
 * @returns {JSX} - JSX representing mobile hambuger navigation swipe-in
 */
const Hamburger = () => {
  const [open, setOpen] = useState(false);
  const data = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const leaderLinks = [
    { link: "/leader", icon: HomeRoundedIcon, name: "Home" },
    {
      link: "/leader/mycoach",
      icon: PermContactCalendarRoundedIcon,
      name: "My Coach",
    },
    {
      link: "/leader/schedule-sessions",
      icon: EventRoundedIcon,
      name: "Schedule Sessions",
    },
    {
      link: "/leader/methodology",
      icon: MenuBookRoundedIcon,
      name: "Our Methodology",
    },
    { link: "/settings", icon: SettingsRoundedIcon, name: "Settings" },
    { link: "/help", icon: HelpRoundedIcon, name: "Help" },
  ];

  const coachLinks = [
    {
      link: "/coach",
      icon: HomeRoundedIcon,
      name: "Home",
    },
    {
      link: "/coach/myleaders",
      icon: PeopleRoundedIcon,
      name: "My Leaders",
    },
    {
      link: "/coach/feedback",
      icon: FeedbackRoundedIcon,
      name: "Feedback",
    },
    {
      link: "/coach/resources",
      icon: LibraryBooksRoundedIcon,
      name: "Resources",
    },
    { link: "/settings", icon: SettingsRoundedIcon, name: "Settings" },
    { link: "/help", icon: HelpRoundedIcon, name: "Help" },
  ];

  let links = [];

  if (data.userType === "leader") links = leaderLinks;
  else if (data.userType === "coach") links = coachLinks;

  const toggleDrawer = (state) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setOpen(state);
  };

  const toggleLogout = async () => {
    const success = await logoutUser();
    if (success) {
      dispatch(logout());
    }
  };

  const list = (
    <Box sx={{ width: "70vw" }} role="presentation">
      <Box sx={{ p: 2, textAlign: "end" }} role="presentation">
        <IconButton onClick={toggleDrawer(false)} color="primary">
          <CloseRoundedIcon sx={{ fontSize: 30 }} />
        </IconButton>
        <Divider sx={{ mb: 2 }} />
      </Box>
      <List disablePadding onClick={toggleDrawer(false)}>
        {links.map((obj, index) => {
          return (
            <ListItemButton component={NavLink} exact to={obj.link} key={index}>
              <ListItemIcon>
                <obj.icon color="primary" sx={{ fontSize: 30 }} />
              </ListItemIcon>
              <ListItemText primary={obj.name} />
            </ListItemButton>
          );
        })}
        <ListItemButton onClick={(e) => toggleLogout()}>
          <ListItemIcon>
            <LogoutRoundedIcon color="primary" sx={{ fontSize: 30 }} />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItemButton>
      </List>
    </Box>
  );

  return (
    <>
      <IconButton
        onClick={toggleDrawer(true)}
        aria-label="open-drawer"
        color="primary"
      >
        <MenuRoundedIcon sx={{ fontSize: 30 }} />
      </IconButton>

      <SwipeableDrawer
        anchor="left"
        open={open}
        onOpen={toggleDrawer(true)}
        onClose={toggleDrawer(false)}
      >
        {list}
      </SwipeableDrawer>
    </>
  );
};

export default Hamburger;
