import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Avatar, Divider, List, ListItem, ListItemText } from "@mui/material";
import { stringAvatar } from "Common/StringAvatar";

const LeaderInfo = styled.div`
  display: flex;
  align-items: center;

  p {
    margin-right: 0.5em;
    display: none;
  }
  @media only screen and (min-width: 330px) {
    p {
      display: block;
    }
  }
`;

/**
 *
 * @param {Object} props - props passed in to the component
 * @param {Array} props.sessions - array of session information containing date, name,
 * profile picture
 * @returns {JSX} - JSX representing the sessions section on the CoachMyLeaders page
 */
const Sessions = ({ sessions }) => {
  const sessionList = sessions.map((session, key) => {
    return (
      <React.Fragment key={key}>
        <ListItem
          sx={{ mt: 1, mb: 1 }}
          secondaryAction={
            <LeaderInfo>
              <p>{session.leader}</p>
              <Avatar {...stringAvatar(session.leader)} />
            </LeaderInfo>
          }
        >
          <ListItemText disableTypography primary={session.date} />
        </ListItem>
        <Divider />
      </React.Fragment>
    );
  });
  return <List>{sessionList}</List>;
};

Sessions.propTypes = {
  sessions: PropTypes.arrayOf(PropTypes.object),
};

export default Sessions;
