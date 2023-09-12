import React from "react";
import PropTypes from "prop-types";
import {
  Rating,
  Box,
  TextField,
  Grid,
  Divider,
  Typography,
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
  "12. We discussed any performance shortfalls or failure to complete actions steps.",
];

const FeedbackForm = ({ name, feedbackAnswers }) => {
  const renderQuestions = feedbackQuestions.map((q, index) => {
    return (
      <React.Fragment key={index}>
        <Grid item xs={12}>
          <Typography
            sx={{ textAlign: "center", fontWeight: "bold", paddingBottom: 2 }}
          >
            {q}
          </Typography>
          <Grid container spacing={0}>
            <Grid item xs={6} sm={3} order={{ xs: 2, sm: 1 }}>
              <Typography sx={{ textAlign: "left" }}>
                Very strongly disagree
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} order={{ xs: 1, sm: 2 }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Rating
                  name="read-only-rating"
                  value={feedbackAnswers[index + 1]}
                  max={7}
                  size="large"
                  IconContainerComponent={IconContainer}
                  highlightSelectedOnly
                  readOnly
                />
              </Box>
            </Grid>
            <Grid item xs={6} sm={3} order={{ xs: 3, sm: 3 }}>
              <Typography sx={{ textAlign: "right" }}>
                Very strongly agree
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  });

  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <h3>{name}'s feedback</h3>
          <h4>
            Submitted at:{" "}
            {new Date(feedbackAnswers["timestamp"]).toLocaleString()}
          </h4>
        </Grid>

        {renderQuestions}

        <Grid item xs={12}>
          <Divider variant="middle" />
        </Grid>

        <Grid item xs={12}>
          <TextField
            id="multiline-read-only"
            label="Comment"
            multiline
            rows={4}
            fullWidth
            value={feedbackAnswers["comment"]}
            InputProps={{
              readOnly: true,
            }}
          />
        </Grid>
      </Grid>
    </div>
  );
};

FeedbackForm.propTypes = {
  name: PropTypes.string,
  feedbackAnswers: PropTypes.object,
};

export default FeedbackForm;
