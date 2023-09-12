import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Grid from "@mui/material/Grid";
import { useDispatch } from "react-redux";
import { setPairedCoach } from "Reducers/UserSlice";
import Sessions from "LeaderHomePage/Sessions";
import Actions from "LeaderHomePage/Actions";
import SubgoalButton from "LeaderHomePage/SubgoalButton";
import Goal from "LeaderHomePage/Goal";
import { getCoachName, getGoalsActions, getCoach } from "Common/Fetch";

const UserWrapper = styled.div`
  width: 100%;
  margin: 0 auto;
  && .MuiGrid-item {
    padding: 0;
  }
`;

/**
 *
 * @returns {JSX} - JSX representing User page
 */
const User = () => {
  const [coachName, setCoachname] = useState("");
  useEffect(() => {
    const _getCoachName = async () => {
      const names = await getCoachName();
      setCoachname(names.firstName + " " + names.lastName);
    };
    _getCoachName();
  }, []);

  const [tasks, setTasks] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    // get all actions and subgoals
    const _getGoalsActions = async () => {
      const goals = await getGoalsActions();
      setTasks(goals.subgoals);
    };

    // attempt to find matching coach
    const _getUserCoach = async () => {
      const coach = await getCoach();
      if (typeof coach !== "string") {
        dispatch(setPairedCoach(coach));
      }
    };

    _getGoalsActions();
    _getUserCoach();
  }, [dispatch]);

  return (
    <UserWrapper>
      <Grid container spacing={0}>
        <Grid item xs={12} container justifyContent="center">
          <Goal tasks={tasks} setTasks={setTasks} />
        </Grid>
        <Grid item xs={12}>
          <Sessions coachName={coachName} />
        </Grid>
        <Grid item xs={12}>
          <br />
        </Grid>
        <Grid item xs={12} container direction="column" alignItems="center">
          <h2 className="goal-header">Your Subgoals</h2>
        </Grid>
        <Grid item xs={12}>
          <SubgoalButton tasks={tasks} setTasks={setTasks} />
          <div className="actions">
            <Actions tasks={tasks} setTasks={setTasks} />
          </div>
        </Grid>
        <Grid item xs={12}>
          {tasks.length === 0 && <p>No subgoals. Add a new one to start.</p>}
        </Grid>
      </Grid>
    </UserWrapper>
  );
};

export default User;
