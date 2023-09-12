import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Rating,
  Box,
  TextField,
  Button,
  Grid,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider, 
  FormControl,
  FormHelperText,
  Alert,
} from "@mui/material";
import MoodBadIcon from "@mui/icons-material/MoodBad";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import SentimentNeutralIcon from "@mui/icons-material/SentimentNeutral";
import SentimentSatisfiedIcon from "@mui/icons-material/SentimentSatisfied";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAltOutlined";
import SentimentVerySatisfiedIcon from "@mui/icons-material/SentimentVerySatisfied";

const customIcons = {
  1: {
    icon: <MoodBadIcon fontSize="inherit" />,
    label: "Very strongly disagree",
  },
  2: {
    icon: <SentimentVeryDissatisfiedIcon fontSize="inherit" />,
    label: "Strongly disagree",
  },
  3: {
    icon: <SentimentDissatisfiedIcon fontSize="inherit" />,
    label: "Disagree",
  },
  4: {
    icon: <SentimentNeutralIcon fontSize="inherit" />,
    label: "Neutral",
  },
  5: {
    icon: <SentimentSatisfiedIcon fontSize="inherit" />,
    label: "Agree",
  },
  6: {
    icon: <SentimentSatisfiedAltIcon fontSize="inherit" />,
    label: "Strongly agree",
  },
  7: {
    icon: <SentimentVerySatisfiedIcon fontSize="inherit" />,
    label: "Very strongly agree",
  },
};

function IconContainer(props) {
  const { value, ...other } = props;
  return <span {...other}>{customIcons[value].icon}</span>;
}

const feedbackQuestions = [
  "1. The coaching was effective in helping me reach my goals.",
  "2. I valued the time we spent having a coaching conversation.",
  "3. In the coaching session, I felt able to present my own ideas.",
  "4. The coach showed that they understood my feelings.",
  "5. By the end of the coaching session, I had greater clarity about the issues I face.",
  "6. The goals we set when coaching were stretching but attainable.",
  "7. The goals we set during coaching were very important to me.",
  "8. The goals we set during coaching were somewhat vague.",
  "9. The coach was very good at helping me develop clear, simple and achievable actions plans.",
  "10. When coaching, the coach spent more time analysing the problem rather than developing solutions.",
  "11. My coach asked me about my progress towards my goals.",
  "12. We discussed any performance shortfalls or failure to complete actions steps."
];

/**
 *
 * @param {Object} props - the props passed into the component
 * @param {Boolean} props.open - whether the popup is open or not
 * @param {Function} props.handleClose - function to handle the closing of the popup
 * @param {Function} props.setFeedbackAnswers - function to set the leader's
 * answers to the feedback questions
 * @param {Function} props.setComment - function to set the leader's comment
 * @param {Function} props.formSubmit - function to handle the form submission
 * @returns {JSX} - JSX representing a popup box
 */
const Popup = ({ open, handleClose, setFeedbackAnswers, setComment, formSubmit }) => {
  const [missingFields, setMissingFields] = useState(false);
  const [values, setValues] = useState({
    1: null,
    2: null,
    3: null,
    4: null,
    5: null,
    6: null,
    7: null,
    8: null,
    9: null,
    10: null,
    11: null,
    12: null,
  });
  const [errors, setErrors] = useState({
    1: "",
    2: "",
    3: "",
    4: "",
    5: "",
    6: "",
    7: "",
    8: "",
    9: "",
    10: "",
    11: "",
    12: "",
  });

  const checkFields = () => {
    const errors = {
      1: "",
      2: "",
      3: "",
      4: "",
      5: "",
      6: "",
      7: "",
      8: "",
      9: "",
      10: "",
      11: "",
      12: "",
    };

    for (const [key, value] of Object.entries(values)) {
      if (value === null) {
        errors[key] = "This field is required"
      }
    }

    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const curErrors = checkFields();
    for (const [key] of Object.entries(curErrors)) {
      if (curErrors[key] !== "") {
        setMissingFields(true);
        return setErrors(curErrors);
      }
    }

    formSubmit(e);
  };
  
  const renderQuestions = feedbackQuestions.map((q, index) => {
    return (
      <React.Fragment key={index}>
        <Grid item xs={12}>
          <DialogContentText color={errors[index+1] !== "" && "#d32f2f"} sx={{ textAlign: "center", fontWeight: "bold", paddingBottom: 2 }}>
            {q}
          </DialogContentText>
          <Grid container spacing={0}>
            <Grid item xs={6} sm={3} order={{ xs: 2, sm: 1 }}>
              <DialogContentText sx={{ textAlign: "left" }}>
                Very strongly disagree
              </DialogContentText>
            </Grid>
            <Grid item xs={12} sm={6} order={{ xs: 1, sm: 2 }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <FormControl error>
                  <Rating
                    name="highlight-selected-only"
                    value={values[index+1]}
                    max={7}
                    size="large"
                    IconContainerComponent={IconContainer}
                    highlightSelectedOnly
                    onChange={(e) => {
                      setValues({ ...values, [index+1]: Number(e.target.value) });
                      setFeedbackAnswers({ ...values, [index+1]: Number(e.target.value) });
                    }}
                  />
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {errors[index+1] !== "" && (
                      <FormHelperText>{errors[index+1]}</FormHelperText>
                    )}
                  </Box>
                </FormControl>
              </Box>
            </Grid>
            <Grid item xs={6} sm={3} order={{ xs: 3, sm: 3 }}>
              <DialogContentText sx={{ textAlign: "right" }}>
                Very strongly agree
              </DialogContentText>
            </Grid>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  });

  return (
    <Dialog fullWidth={true} maxWidth="md" open={open} onClose={handleClose}>
      <DialogTitle>Feedback</DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ textAlign: "center" }}>
          Please be frank and open in your response, as this will form the basis for accurate feedback on your coach's coaching skills.
        </DialogContentText>
        <DialogContentText sx={{ textAlign: "center", paddingTop: 1 }}>
          Please indicate the extent to which you agree or disagree with the following statements. Do not spend too much time on any question.
        </DialogContentText>
        <DialogContentText sx={{ textAlign: "center", paddingTop: 2, paddingBottom: 2 }}>
          Think about the coaching session you just had with your coach as you answer these questions.
        </DialogContentText>
        <Divider variant="middle" />
        <DialogContentText sx={{ paddingTop: 2 }}></DialogContentText>

        <Grid container spacing={3}>
          {renderQuestions}

          <Grid item xs={12}>
            <Divider variant="middle" />
            <DialogContentText sx={{ textAlign: "center", paddingTop: 2 }}>
              Any other comments? Leave them below!
            </DialogContentText>
          </Grid>
  
          <Grid item xs={12}>
            <TextField
              id="outlined-multiline-static"
              label="Comment"
              multiline
              rows={4}
              fullWidth
              onChange={(e) => setComment(e.target.value)}
            />
          </Grid>

          <Grid item xs={12}>
            {missingFields && (
              <Alert severity="error">Some questions have not been answered.</Alert>
            )}
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

Popup.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  setFeedbackAnswers: PropTypes.func,
  setComment: PropTypes.func,
  formSubmit: PropTypes.func,
};

export default Popup;
