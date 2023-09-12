import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import {
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import placeholder from "CoachMyLeadersPage/placeholder.png";
import Progress from "LeaderHomePage/Progress";
import MessagePopup from "Messaging/MessagePopup";

const ProfileWrapper = styled.div`
  .tasks {
    text-align: center;
  }

  .actions {
    padding: 0;
    list-style-type: none;
  }
`;

/**
 *
 * @param {Array} actions - array of objects representing subgoals and
 * associated actions
 * @returns {JSX} - React fragment with all actions in a list
 */
const ShowActions = (actions) => {
  return actions.length > 0 ? (
    <>
      <List>
        {actions.map((action, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton>
              <ListItemText
                primary={action.name}
                secondary={`Progress: ${action.current_iterations} / ${action.max_iterations}`}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </>
  ) : (
    <li key="-1">No actions.</li>
  );
};

// currently accepts a String name, but will eventually need to accept an object representing leader

const Profile = ({ name }) => {
  let number_of_subgoals = name["leader"]["goals"]["subgoals"]["length"];
  let taskSet = [];
  for (var i = 0; i < number_of_subgoals; i++) {
    const dataItems = { subgoal: "", actions: [] };
    const subgoals = name["leader"]["goals"]["subgoals"];
    dataItems["subgoal"] = subgoals[i]["subgoal"];
    let numActions = subgoals[i]["actions"]["length"];
    for (var j = 0; j < numActions; j++) {
      let action_details = {
        name: "",
        max_iterations: " ",
        current_iterations: " ",
        completed: false,
      };

      action_details["name"] = subgoals[i]["actions"][j]["name"];
      action_details["max_iterations"] =
        subgoals[i]["actions"][j]["max_iterations"];
      action_details["current_iterations"] =
        subgoals[i]["actions"][j]["current_iterations"];
      action_details["completed"] = subgoals[i]["actions"][j]["completed"];
      dataItems["actions"].push(action_details);
    }

    taskSet.push(dataItems);
  }

  const fullName = name["firstName"] + " " + name["lastName"];

  return (
    <ProfileWrapper>
      <Card sx={{ display: "flex" }}>
        <CardMedia component="img" sx={{ width: 150 }} image={placeholder} />
        <CardContent>
          <h2>{name["firstName"]}</h2>
          <p>Gender: </p>
          <p>Age: </p>
        </CardContent>
      </Card>
      <Typography paragraph></Typography>
      <h2>Upcoming sessions</h2>
      <Typography paragraph>Insert sessions here</Typography>
      <h2>Overarching goal</h2>
      <Typography paragraph>
        Self-care & building effective work habits
      </Typography>
      <h2>Subgoals</h2>
      <Grid container spacing={{ xs: 0, sm: 2 }}>
        {taskSet.map((task) => (
          <Grid item xs={12} sm={4} key={task.subgoal}>
            <div className="tasks">
              <h3>{task.subgoal}</h3>
              <ul className="actions">{ShowActions(task.actions)}</ul>
            </div>
            <div className="progress">
              <Progress task={task} />
            </div>
          </Grid>
        ))}
      </Grid>
      <h2>Send a Message</h2>
      <MessagePopup
        name={fullName}
        toggleOpen={() => {}}
        popup={false}
        recipientId={name._id}
      />
      <h2>Additional Notes</h2>
      {/* <Typography paragraph>
        Consequat mauris nunc congue nisi vitae suscipit. Fringilla est
        ullamcorper eget nulla facilisi etiam dignissim diam. Pulvinar elementum
        integer enim neque volutpat ac tincidunt. Ornare suspendisse sed nisi
        lacus sed viverra tellus. Purus sit amet volutpat consequat mauris.
        Elementum eu facilisis sed odio morbi. Euismod lacinia at quis risus sed
        vulputate odio. Morbi tincidunt ornare massa eget egestas purus viverra
        accumsan in. In hendrerit gravida rutrum quisque non tellus orci ac.
        Pellentesque nec nam aliquam sem et tortor. Habitant morbi tristique
        senectus et. Adipiscing elit duis tristique sollicitudin nibh sit.
        Ornare aenean euismod elementum nisi quis eleifend. Commodo viverra
        maecenas accumsan lacus vel facilisis. Nulla posuere sollicitudin
        aliquam ultrices sagittis orci a.
      </Typography> */}
    </ProfileWrapper>
  );
};

Profile.propTypes = {
  name: PropTypes.object,
};

export default Profile;
