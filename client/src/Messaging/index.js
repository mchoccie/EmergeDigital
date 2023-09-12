import React, { useState } from "react";
import styled from "styled-components";
import { Fab, Collapse } from "@mui/material";
import MessageRoundedIcon from "@mui/icons-material/MessageRounded";
import { useSelector } from "react-redux";
import MessagePopup from "Messaging/MessagePopup";

const MessageWrapper = styled.div`
  position: fixed;
  bottom: 4vh;
  right: 4vw;
  text-align: right;
`;

/**
 *
 * @returns {JSX} - JSX representing the Leader messaging icon and corresponding popup
 */
const MessageIcon = () => {
  const [open, setOpen] = useState(false);

  const toggleOpen = () => {
    setOpen(!open);
  };

  const userData = useSelector((state) => state.user);

  let coachName = "No coach found";
  if (userData.pairedCoach) {
    coachName =
      userData.pairedCoach.firstName + " " + userData.pairedCoach.lastName;
  }

  return (
    <MessageWrapper>
      <Collapse in={open} sx={{ flexDirection: "column-reverse" }}>
        <MessagePopup
          name={coachName}
          toggleOpen={toggleOpen}
          popup={true}
          recipientId={userData.pairedCoach?._id}
        />
      </Collapse>

      <Fab
        color="secondary"
        aria-label="message"
        onClick={() => toggleOpen()}
        sx={{ mt: 1 }}
      >
        <MessageRoundedIcon />
      </Fab>
    </MessageWrapper>
  );
};

export default MessageIcon;
