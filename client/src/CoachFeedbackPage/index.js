import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  Collapse,
  Typography,
  Dialog,
  DialogContent,
  AppBar,
  IconButton,
  Toolbar,
  useMediaQuery,
} from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import DoneIcon from "@mui/icons-material/Done";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { stringAvatar } from "Common/StringAvatar";
import FeedbackForm from "CoachFeedbackPage/FeedbackForm";

const Sidebar = styled.div`
  width: 300px;
  flex-shrink: 0;

  @media only screen and (max-width: 768px) {
    width: 100%;
  }
`;

const Content = styled.div`
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

async function getFeedback() {
  return fetch(process.env.REACT_APP_BACKEND_URL + "/api/feedback", {
    method: "GET",
    credentials: "include",

    headers: {
      "Content-Type": "application/json",
    },
  }).then((data) => data.json());
}

const CoachFeedbackPage = () => {
  const [leadersList, setLeadersList] = useState([]);
  const [feedbackList, setFeedbackList] = useState([]);

  useEffect(() => {
    const leaders = async () => {
      const dbLeaders = await getLeaders();

      let setOfLeaders = [];
      if (dbLeaders !== "No leaders found") {
        const lengthLeaders = dbLeaders["leader_details"]["length"];

        for (var i = 0; i < lengthLeaders; i++) {
          const name =
            dbLeaders["leader_details"][i]["firstName"] +
            " " +
            dbLeaders["leader_details"][i]["lastName"];
          const id = dbLeaders["leader_details"][i]["_id"];

          setOfLeaders.push({
            name: name,
            id: id,
          });
        }
      }
      setLeadersList(setOfLeaders);
    };
    const feedback = async () => {
      const dbFeedback = await getFeedback();
      setFeedbackList(dbFeedback);
    };
    leaders();
    feedback();
  }, []);

  const [data, setData] = useState("Select a leader.");
  const [name, setName] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [selectedSubIndex, setSelectedSubIndex] = useState(-1);
  const [open, setOpen] = useState({});
  const [dialogOpen, setDialogOpen] = useState(false);
  const small = useMediaQuery("(max-width:768px)");

  const handleClickLeader = (index) => {
    setOpen({ ...open, [index]: !open[index] });
  };

  const handleClickSession = (index, i, feedback) => {
    setData(feedback);
    setName(leadersList[index].name);
    setSelectedIndex(index);
    setSelectedSubIndex(i);
    setDialogOpen(true);
  };

  const handleClose = () => {
    setDialogOpen(false);
  };

  return (
    <div>
      <h1>Feedback Page</h1>
      <Box sx={{ display: "flex" }}>
        <Sidebar>
          <List
            sx={{
              width: 300,
              padding: 0,
              flexShrink: 0,
              maxHeight: "70vh",
              overflow: "auto",
            }}
          >
            {leadersList.map((leader, index) => {
              const leaderFeedbackList = feedbackList.filter(
                (f) => f.senderId === leader.id
              );
              const o = open[index] || false;
              return (
                <React.Fragment key={leader.id}>
                  <ListItem
                    button
                    key={leader.id}
                    onClick={() => handleClickLeader(index)}
                  >
                    <ListItemIcon>
                      <Avatar {...stringAvatar(leader.name)} />
                    </ListItemIcon>
                    <ListItemText primary={leader.name} />
                    {o ? <ExpandLess /> : <ExpandMore />}
                  </ListItem>

                  <Collapse in={o} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      {leaderFeedbackList.map((f, i) => (
                        <ListItem
                          button
                          key={f._id}
                          selected={
                            selectedIndex === index && selectedSubIndex === i
                          }
                          onClick={() => handleClickSession(index, i, f)}
                          sx={{ pl: 4 }}
                        >
                          <ListItemIcon>
                            <DoneIcon />
                          </ListItemIcon>
                          <ListItemText
                            primary={new Date(f.timestamp).toLocaleString()}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </Collapse>
                </React.Fragment>
              );
            })}
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
              maxHeight: "70vh",
              minHeight: "70vh",
              overflow: "auto",
              borderLeft: 1,
              borderColor: "#0000001f",
            }}
          >
            {data === "Select a leader." && data}
            {data !== "Select a leader." && (
              <FeedbackForm name={name} feedbackAnswers={data} />
            )}
          </Box>
          {small && data !== "Select a leader." && (
            <Dialog fullScreen open={dialogOpen} onClose={handleClose} scroll="paper">
              <AppBar sx={{ position: "relative" }}>
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
                    {name + ", " + new Date(data.timestamp).toLocaleDateString()}
                  </Typography>
                </Toolbar>
              </AppBar>
              <DialogContent>
                <FeedbackForm name={name} feedbackAnswers={data} />
              </DialogContent>
            </Dialog>
          )}
        </Content>
      </Box>
    </div>
  );
};

export default CoachFeedbackPage;
