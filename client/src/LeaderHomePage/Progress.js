import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Grid } from "@mui/material";

const ProgressWrapper = styled.div`
  .header {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .bar-section {
    display: flex;
    margin: auto auto;
    text-align: center;
  }

  .indiv-bar {
  }

  .bar {
    width: 25%;
    height: 25%;
    min-width: 100px;
    min-height: 100px;
    margin: auto;
  }

  @media only screen and (min-width: 600px) {
    .bar {
      width: 40%;
      height: 40%;
    }
  }
`;

/**
 *
 * @param {String} goal - subgoal name
 * @param {Array} actions - array of action objects
 * @returns {JSX} - Progress bar for the goal
 */
const showBar = (goal, actions) => {
  let completed = 0;
  let total = 0;

  for (let i = 0; i < actions.length; i++) {
    completed += actions[i].current_iterations;
    total += actions[i].max_iterations;
  }

  const percentage = total ? (completed / total) * 100 : 0;

  return (
    <div className="indiv-bar" key={goal}>
      <br />
      <div className="bar">
        <CircularProgressbar
          value={percentage}
          text={`${Math.round(percentage)}%`}
          styles={buildStyles({
            pathColor: `var(--secondary)`,
            textColor: `var(--secondary)`,
          })}
        />
      </div>
      <p>
        Completed {completed}/{total}
      </p>
    </div>
  );
};

/**
 *
 * @param {Object} props - props passed in to the react component
 * @param {Array} props.task - object of subgoal and related actions
 * @returns {JSX} - JSX representing the progress section on the User page
 */
const Progress = ({ task }) => {
  return (
    <ProgressWrapper>
      <div className="bar-section">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            {showBar(task.subgoal, task.actions)}
          </Grid>
        </Grid>
      </div>
    </ProgressWrapper>
  );
};

Progress.propTypes = {
  tasks: PropTypes.object,
};

export default Progress;
