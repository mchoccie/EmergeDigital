import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
  Box,
  Toolbar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Dialog,
  DialogContent,
  AppBar,
  IconButton,
  Avatar,
  useMediaQuery,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { stringAvatar } from "Common/StringAvatar";
// import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Profile from "CoachMyLeadersPage/Profile";

const Sidebar = styled.div`
  width: 300px;
  min-width: 300px;

  @media only screen and (max-width: 768px) {
    width: 100%;
  }
`;

const Content = styled.div`
  width: 900px;
  @media only screen and (max-width: 768px) {
    display: none;
  }
`;

async function getLeaders() {
  return fetch(process.env.REACT_APP_BACKEND_URL + "/api/coach/leader", {
    method: "GET",
    credentials: "include",

    headers: {
      "Content-Type": "application/json",
    },
  }).then((data) => data.json());
}

// sizing on this creates some issues when zooming in, but otherwise it'll be compressed in the middle of the page
/**
 *
 * @returns {JSX} - React fragment representing no leaders selected
 */
const noLeaderSelected = () => {
  return (
    <Box
      sx={{
        display: "flex",
        height: "70vh",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography>No leader selected. Select a leader.</Typography>
    </Box>
  );
};

/**
 *
 * @returns {JSX} - JSX representing My Leaders page
 */
const CoachMyLeadersPage = () => {
  const [leadersList, setLeadersList] = useState([]);
  const [leadersDetails, setLeadersDetails] = useState([]);

  useEffect(() => {
    const leaders = async () => {
      const dbLeaders = await getLeaders();

      let setOfLeaders = [];
      let leaderDets = [];
      if (dbLeaders !== "No leaders found") {
        const lengthLeaders = dbLeaders["leader_details"]["length"];

        for (var i = 0; i < lengthLeaders; i++) {
          const name =
            dbLeaders["leader_details"][i]["firstName"] +
            " " +
            dbLeaders["leader_details"][i]["lastName"];

          setOfLeaders.push(name);
          leaderDets.push(dbLeaders["leader_details"][i]);
        }
      }
      setLeadersList(setOfLeaders);
      setLeadersDetails(leaderDets);
    };
    leaders();
  }, []);

  const [data, setData] = useState("Select a leader.");
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [open, setOpen] = useState(false);
  const small = useMediaQuery("(max-width:768px)");

  const handleClick = (index) => {
    setData(leadersDetails[index]);
    setSelectedIndex(index);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <h1>My Leaders</h1>
      <Box sx={{ display: "flex" }}>
        <Sidebar>
          <List
            sx={{
              padding: 0,
              flexShrink: 0,
              maxHeight: "70vh",
              overflow: "auto",
            }}
          >
            {leadersList.map((text, index) => (
              <ListItem
                button
                key={text}
                selected={selectedIndex === index}
                onClick={() => handleClick(index)}
              >
                <ListItemIcon>
                  <Avatar {...stringAvatar(text)} />
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </Sidebar>
        <Content>
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              bgcolor: "background.default",
              paddingRight: 3,
              paddingLeft: 3,
              overflowY: "none",
              borderLeft: 1,
              borderColor: "#0000001f",
            }}
          >
            {data === "Select a leader." && noLeaderSelected()}
            {data !== "Select a leader." && <Profile name={data} />}
          </Box>
          {small && (
            <Dialog fullScreen open={open} onClose={handleClose} scroll="paper">
              <AppBar position="relative">
                <Toolbar>
                  <IconButton
                    edge="start"
                    color="inherit"
                    onClick={handleClose}
                    aria-label="close"
                  >
                    <ChevronLeftIcon />
                  </IconButton>
                  <Typography sx={{ ml: 2, flex: 1 }} component="div">
                    {data["firstName"] + " " + data["lastName"]}
                  </Typography>
                </Toolbar>
              </AppBar>
              <DialogContent>
                <Profile name={data} />
              </DialogContent>
            </Dialog>
          )}
        </Content>
      </Box>
    </>
  );
};

export default CoachMyLeadersPage;
