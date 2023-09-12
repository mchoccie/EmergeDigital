import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import OutlinedInput from "@mui/material/OutlinedInput";
import Grid from "@mui/material/Grid";
import FormHelperText from "@mui/material/FormHelperText";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { makeStyles } from "@material-ui/core";
import { FormControl } from "@mui/material";
import validateDetails from "LeaderMyCoachPage/Validators";

const useStyles = makeStyles(() => ({
  root: {
    whiteSpace: "unset",
    wordBreak: "break-all",
  },
}));
const ITEM_HEIGHT = 36;
const MOBILE_ITEM_HEIGHT = 48;

const ITEM_PADDING_TOP = 8;
const MENU_ITEMS = 5;

/**
 * List of industries David has down
 */

const industryList = [
  "Agriculture, Forestry, Fishing",
  "Mining",
  "Manufacturing",
  "Electricity, Gas, Water, Waste Services",
  "Construction",
  "Wholesale Trade",
  "Retail Trade",
  "Accommodation and Food Services",
  "Transport, Postal and Warehousing",
  "Information Media and Telecommunications",
  "Financial and Insurance Services",
  "Rental, Hiring and Real Estate Services",
  "Professional, Scientific, Technical Services",
  "Administrative and Support Services",
  "Public Administration and Safety",
  "Education and Training",
  "Health Care and Social Assistance",
  "Arts and Recreation Services",
  "Other Services",
];

/**
 * List of goals David has down
 */
const goalList = [
  "Perfectionism and Procrastination",
  "Self care and building effective work habits",
  "Confidence or Presentation Anxiety",
  "Giving and Receiving Feedback",
  "Increase uncertainty tolerance and resilience",
  "Improve leadership and perspective taking capacity",
  "Building effective team relationships ",
  "Building an inclusive team",
  "Delating workload and manage your team",
  "Managing your inner critic or Imposter Syndrome",
];

/**
 * List of genders David has down
 */
const genders = [
  "Male",
  "Female",
  "Transgender",
  "Intersex",
  "Other",
  "Prefer not to say",
];

/**
 *
 * @param {*} param0
 * @returns Questionnaire for leader to enter details into, so they
 * can match with a coach
 */
const Questionnaire = ({ open, handleClose, questionnaireFormSubmit }) => {
  /**
   * Storage of user details
   */
  const [details, setDetails] = useState({
    age: "",
    gender: "",
    primaryGoal: "",
    experience: "",
    secondaryGoal: "",
    industry: "",
    occupation: "",
  });

  /**
   * Error states for leader
   */

  const [errors, setErrors] = useState({
    occupation: "",
    gender: "",
    age: "",
    industry: "",
    primaryGoal: "",
    secondaryGoal: "",
    experience: "",
  });

  /**
   * Function to handle submitting questionnaire form
   * @param {*} e
   * @returns
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const currErrors = validateDetails(details);
    console.log(errors.occupation);
    if (
      currErrors.primaryGoal !== "" ||
      currErrors.secondaryGoal !== "" ||
      currErrors.age !== "" ||
      currErrors.gender !== "" ||
      currErrors.industry !== "" ||
      currErrors.occupation !== "" ||
      currErrors.experience !== ""
    ) {
      setErrors(currErrors);
      return;
    }

    const submitAPI = async (body) => {
      const res = await fetch(process.env.REACT_APP_BACKEND_URL + "/api/ai", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }).then((r) =>
        r.json().then((data) => ({ status: r.status, body: data }))
      );

      console.log(res.body);
    };
    const body = {
      primaryGoal: details.primaryGoal,
      secondaryGoal: details.secondaryGoal,
      industry: details.industry,
      gender: details.gender,
      age: details.age,
    };

    console.log(body);

    await submitAPI(body);

    questionnaireFormSubmit(e);
  };

  /**
   * Handle changes in the questionnaire popup
   * @param {} event
   */
  const handleOccupationChange = (event) => {
    setDetails({ ...details, occupation: event.target.value });
  };
  const handleExperienceChange = (event) => {
    setDetails({ ...details, experience: event.target.value });
  };
  const handleGenderChange = (event) => {
    setDetails({ ...details, gender: event.target.value });
  };
  const handleAgeChange = (event) => {
    setDetails({ ...details, age: event.target.value });
  };
  const handleIndustryChange = (event) => {
    setDetails({ ...details, industry: event.target.value });
  };
  const handlePrimaryGoalChange = (event) => {
    setDetails({ ...details, primaryGoal: event.target.value });
  };
  const handleSecondaryGoalChange = (event) => {
    setDetails({ ...details, secondaryGoal: event.target.value });
  };

  /**
   * Styles for dealing with horizontal ordering of dropdowns
   */
  const classes = useStyles();

  /**
   * Rendering the questionnaire
   */
  return (
    <Dialog fullWidth={true} maxWidth="sm" open={open} onClose={handleClose}>
      <DialogTitle>Enter your details to find a Coach!</DialogTitle>

      <DialogContent>
        <DialogContentText>
          The purpose of this form is to enter some of your personal details to
          help match you up with a coach that has a similar background to you!
          We collect your occupation, age, industry, experience, goals you want
          to accomplish with this program and gender to find the perfect fit.
        </DialogContentText>
        <br></br>

        <DialogContentText>Occupation</DialogContentText>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <FormControl fullWidth={true}>
              <TextField
                id="outlined-multiline-static"
                multiline
                fullWidth
                placeholder="e.g. Software Engineer"
                onChange={handleOccupationChange}
                error={errors.occupation !== ""}
                helperText={details.occupation === "" ? errors.occupation : ""}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <DialogContentText>Age</DialogContentText>

            <FormControl fullWidth={true}>
              <TextField
                id="outlined-multiline-static"
                multiline
                rows={1}
                placeholder="e.g. 28"
                onChange={handleAgeChange}
                error={errors.age !== ""}
                helperText={details.age === "" ? errors.age : ""}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <DialogContentText>Experience (Years)</DialogContentText>

            <FormControl fullWidth={true}>
              <TextField
                id="outlined-multiline-static"
                multiline
                fullWidth
                rows={1}
                placeholder="e.g. 5"
                onChange={handleExperienceChange}
                error={errors.experience !== ""}
                helperText={details.experience === "" ? errors.experience : ""}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <DialogContentText>Industry</DialogContentText>
            <FormControl fullWidth={true}>
              <Select
                MenuProps={{
                  PaperProps: {
                    sx: {
                      maxHeight: {
                        xs: MOBILE_ITEM_HEIGHT * MENU_ITEMS + ITEM_PADDING_TOP,
                        sm: ITEM_HEIGHT * MENU_ITEMS + ITEM_PADDING_TOP,
                      },
                      width: 400,
                    },
                  },
                }}
                label="Industry"
                rows={2}
                value={details.industry}
                onChange={handleIndustryChange}
                input={<OutlinedInput />}
                error={errors.industry !== ""}
              >
                {industryList.map((industry) => (
                  <MenuItem
                    key={industry}
                    value={industry}
                    classes={{ root: classes.root }}
                  >
                    {industry}
                  </MenuItem>
                ))}
              </Select>
              {errors.industry !== "" && (
                <FormHelperText error>{errors.industry}</FormHelperText>
              )}
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <DialogContentText>
              What is the primary goal you wish to work on?
            </DialogContentText>
            <FormControl fullWidth={true}>
              <Select
                MenuProps={{
                  PaperProps: {
                    sx: {
                      maxHeight: {
                        xs: MOBILE_ITEM_HEIGHT * MENU_ITEMS + ITEM_PADDING_TOP,
                        sm: ITEM_HEIGHT * MENU_ITEMS + ITEM_PADDING_TOP,
                      },
                      width: 400,
                    },
                  },
                }}
                label="Primary Goal"
                value={details.primaryGoal}
                placeholder="e.g. Perfectionism and Procrastination"
                onChange={handlePrimaryGoalChange}
                input={<OutlinedInput />}
                error={errors.primaryGoal !== ""}
              >
                {goalList.map((goal) => (
                  <MenuItem
                    key={goal}
                    value={goal}
                    classes={{ root: classes.root }}
                  >
                    {goal}
                  </MenuItem>
                ))}
              </Select>
              {errors.primaryGoal !== "" && (
                <FormHelperText error>{errors.primaryGoal}</FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <DialogContentText>
              What is the secondary goal you wish to work on?
            </DialogContentText>
            <FormControl fullWidth={true}>
              <Select
                MenuProps={{
                  PaperProps: {
                    sx: {
                      maxHeight: {
                        xs: MOBILE_ITEM_HEIGHT * MENU_ITEMS + ITEM_PADDING_TOP,
                        sm: ITEM_HEIGHT * MENU_ITEMS + ITEM_PADDING_TOP,
                      },
                      width: 400,
                    },
                  },
                }}
                label="Secondary Goal"
                value={details.secondaryGoal}
                onChange={handleSecondaryGoalChange}
                placeholder="e.g. Giving and recieving feedback"
                input={<OutlinedInput />}
                error={errors.secondaryGoal !== ""}
              >
                {goalList.map((goal) => (
                  <MenuItem
                    key={goal}
                    value={goal}
                    classes={{ root: classes.root }}
                  >
                    {goal}
                  </MenuItem>
                ))}
              </Select>
              {errors.secondaryGoal !== "" && (
                <FormHelperText error>{errors.secondaryGoal}</FormHelperText>
              )}
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <DialogContentText>Gender</DialogContentText>
            <FormControl fullWidth={true}>
              <Select
                MenuProps={{
                  PaperProps: {
                    sx: {
                      maxHeight: {
                        xs: MOBILE_ITEM_HEIGHT * MENU_ITEMS + ITEM_PADDING_TOP,
                        sm: ITEM_HEIGHT * MENU_ITEMS + ITEM_PADDING_TOP,
                      },
                      width: 250,
                    },
                  },
                }}
                label="Gender"
                value={details.gender}
                onChange={handleGenderChange}
                input={<OutlinedInput />}
                error={errors.gender !== ""}
              >
                {genders.map((gender) => (
                  <MenuItem key={gender} value={gender}>
                    {gender}
                  </MenuItem>
                ))}
              </Select>
              {errors.gender !== "" && (
                <FormHelperText error>
                  Please specify your gender!
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Submit</Button>
      </DialogActions>
    </Dialog>
  );
};

export default Questionnaire;
