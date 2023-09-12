import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import {
  TextField,
  Button,
  Grid,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { addSubgoal } from "Common/Fetch";

const GoalsWrapper = styled.div`
  max-width: 80%;
  margin: auto;
  .header {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .overarching {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .add-goal {
    margin: auto;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

/**
 *
 * @param {Object} props - props passed into react component
 * @param {Array} props.tasks - array of subgoals
 * @param {Function} props.setTasks - function to add new subgoal
 * @returns
 */
const SubgoalButton = ({ tasks, setTasks }) => {
  const [item, setItem] = useState("");
  const [open, setOpen] = useState(false);

  const toggleOpen = () => {
    setItem("");
    setOpen(!open);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (item.length === 0) {
      return;
    }
    if (tasks.length > 2) {
      alert("Can only have a maximum of 3 subgoals!");
    } else {
      const newGoal = {
        subgoal: item,
        actions: [],
      };

      // Call API Stuff
      const _addSubgoal = async (name) => {
        await addSubgoal(name);
      };
      _addSubgoal(item);
      setTasks([...tasks, newGoal]);
    }
    setItem("");
    setOpen(!open);
  };

  return (
    <GoalsWrapper>
      <div className="add-goal">
        <Button variant="outlined" onClick={toggleOpen}>
          + Add new subgoal
        </Button>
        <Dialog fullWidth={true} maxWidth="md" open={open} onClose={toggleOpen}>
          <DialogTitle>Add a new subgoal</DialogTitle>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <DialogContentText>
                  Add a new subgoal (max. 3).
                </DialogContentText>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="add-goal"
                  label="New subgoal"
                  fullWidth
                  required
                  autoFocus
                  onChange={(e) => setItem(e.target.value)}
                  onKeyPress={(e) => (e.key === "Enter" ? handleSubmit(e) : "")}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={toggleOpen}>Cancel</Button>
            <Button onClick={handleSubmit}>Add</Button>
          </DialogActions>
        </Dialog>
      </div>
    </GoalsWrapper>
  );
};

SubgoalButton.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.object),
  setSubgoals: PropTypes.func,
};

export default SubgoalButton;
