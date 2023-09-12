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
  InputLabel,
  MenuItem,
  FormHelperText,
  FormControl,
  Select,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  IconButton,
  Snackbar,
  Alert as MuiAlert,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Progress from "LeaderHomePage/Progress";

import { addAction, incrementAction } from "Common/Fetch";

const ActionsWrapper = styled.div`
  .header {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  && .MuiGrid-root {
    margin-left: 0;
  }

  .tasks {
    text-align: center;

    button {
      transition-duration: 0.3s;

      &:hover {
        background-color: var(--teal);
        text-decoration: line-through;
      }
    }
  }

  .add-tasks {
    text-align: center;
    padding: 10px;
  }

  .actions {
    padding: 0;
    list-style-type: none;
  }
`;

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

/**
 * @param {Object} props - props passed into react component
 * @param {Array} props.actions - array of objects representing subgoals and
 * associated actions
 * @param {Integer} props.subgoalIndex - integer representing the index of the subgoal
 * @param {Function} props.increment - function to increment action iteration
 * @returns {JSX} - React fragment with incomplete actions in a list with
 * increment buttons
 */
const showActions = (actions, subgoalIndex, increment) => {
  const incompleteAction = actions.filter((a) => a.completed === false);
  return incompleteAction.length > 0 ? (
    <>
      <List>
        {incompleteAction.map((action) => (
          <ListItem
            key={actions.indexOf(action)}
            secondaryAction={
              <IconButton
                edge="end"
                aria-label="add"
                onClick={() => increment(subgoalIndex, actions.indexOf(action))}
              >
                <AddIcon />
              </IconButton>
            }
            disablePadding
          >
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
    <li key="-1">No actions. Add some new ones!</li>
  );
};

/**
 *
 * @param {Object} props - props passed in to the react component
 * @param {Array} props.tasks - array of objects of subgoals to be displayed
 * @param {Function} props.setTasks - function to modify tasks array
 * @returns {JSX} - JSX representing the actions section on the User page
 */
export default function Actions({ tasks, setTasks }) {
  const [item, setItem] = useState("");
  const [iteration, setIteration] = useState(0);
  const [goal, setGoal] = useState("");
  const [open, setOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  const [errors, setErrors] = useState({
    item: "",
    iteration: "",
    goal: "",
  });

  const toggleOpen = () => {
    setItem("");
    setGoal("");
    setIteration(0);
    setOpen(!open);
    setErrors({
      item: "",
      iteration: "",
      goal: "",
    });
  };

  const checkFields = () => {
    const errors = {
      item: "",
      iteration: "",
      goal: "",
    };
    if (item.length === 0) {
      errors.item = "Action is required";
    }
    if (iteration <= 0) {
      errors.iteration = "Iteration must be greater than 0";
    }
    if (!Number.isInteger(Number.parseFloat(iteration))) {
      errors.iteration = "Iteration must be an integer";
    }
    if (goal.length === 0) {
      errors.goal = "Subgoal is required";
    }

    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const curErrors = checkFields();
    if (
      curErrors.item !== "" ||
      curErrors.iteration !== "" ||
      curErrors.goal !== ""
    ) {
      return setErrors(curErrors);
    }

    const newAction = {
      name: item,
      max_iterations: parseInt(iteration),
      current_iterations: 0,
      completed: false,
    };

    // Call API stuff
    const _addAction = async (subgoal, action, iterations) => {
      await addAction(subgoal, action, iterations);
    };
    _addAction(goal, item, iteration);

    const index = tasks.findIndex((t) => t.subgoal === goal);
    let updatedTasks = [...tasks];
    let updatedItem = { ...tasks[index] };
    updatedItem.actions = [...tasks[index].actions, newAction];
    updatedTasks[index] = updatedItem;

    setTasks(updatedTasks);
    setItem("");
    setOpen(!open);
  };

  const increment = (subgoalIndex, actionIndex) => {
    let updatedTasks = [...tasks];
    let updatedSubgoal = { ...tasks[subgoalIndex] };
    let actions = [...tasks[subgoalIndex].actions];
    let updatedAction = { ...tasks[subgoalIndex].actions[actionIndex] };
    updatedAction.current_iterations += 1;
    // Call API stuff
    const _incrementAction = async (subgoal, action) => {
      await incrementAction(subgoal, action);
    };
    _incrementAction(updatedSubgoal.subgoal, updatedAction.name);
    if (updatedAction.current_iterations === updatedAction.max_iterations) {
      updatedAction.completed = true;
      setSnackbarOpen(true);
    }
    actions[actionIndex] = updatedAction;
    updatedSubgoal.actions = actions;
    updatedTasks[subgoalIndex] = updatedSubgoal;
    setTasks(updatedTasks);
  };

  return (
    <ActionsWrapper>
      <div className="add-tasks">
        <Button variant="outlined" onClick={toggleOpen}>
          + Add new action
        </Button>
        <Dialog fullWidth={true} maxWidth="md" open={open} onClose={toggleOpen}>
          <DialogTitle>Add a new action</DialogTitle>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <DialogContentText>
                  Add a new action, set the number of iterations and select a
                  subgoal for it.
                </DialogContentText>
              </Grid>
              <Grid item xs={12} sm={9}>
                <TextField
                  id="add-action"
                  label="New action"
                  fullWidth
                  required
                  onChange={(e) => setItem(e.target.value)}
                  error={errors.item !== ""}
                  helperText={errors.item}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  id="outlined-number"
                  label="Iterations"
                  type="number"
                  fullWidth
                  InputProps={{
                    inputProps: { min: 1 },
                  }}
                  onChange={(e) => setIteration(e.target.value)}
                  error={errors.iteration !== ""}
                  helperText={errors.iteration}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl required fullWidth error={errors.goal !== ""}>
                  <InputLabel id="subgoal">Select subgoal</InputLabel>
                  <Select
                    labelId="select-subgoal-label"
                    id="select-subgoal"
                    value={goal}
                    label="Select subgoal *"
                    onChange={(e) => setGoal(e.target.value)}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {tasks.map((task) => (
                      <MenuItem value={task.subgoal} key={task.subgoal}>
                        {task.subgoal}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.goal !== "" && (
                    <FormHelperText>{errors.goal}</FormHelperText>
                  )}
                </FormControl>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={toggleOpen}>Cancel</Button>
            <Button onClick={handleSubmit}>Add</Button>
          </DialogActions>
        </Dialog>
      </div>
      <div className="snackbar">
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
        >
          <Alert
            onClose={handleSnackbarClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            Completed an action!
          </Alert>
        </Snackbar>
      </div>
      <Grid container spacing={0}>
        {tasks.map((task, index) => (
          <Grid item xs={12} sm={4} key={task.subgoal}>
            <div className="tasks">
              <h3>{task.subgoal}</h3>
              <ul className="actions">
                {showActions(task.actions, index, increment)}
              </ul>
            </div>
            <div className="progress">
              <Progress task={task} />
            </div>
          </Grid>
        ))}
      </Grid>
    </ActionsWrapper>
  );
}

Actions.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.object),
  setTasks: PropTypes.func,
};
