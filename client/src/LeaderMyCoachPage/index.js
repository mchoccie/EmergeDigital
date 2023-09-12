import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Button, CircularProgress } from "@mui/material";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import Profile from "LeaderMyCoachPage/Profile";
import Info from "LeaderMyCoachPage/Info";
import Popup from "LeaderMyCoachPage/Popup";
import Questionnaire from "LeaderMyCoachPage/Questionnaire";

const NoCoachWrapper = styled.div`
  .noCoachText {
    margin-top: 150px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 3em;
    && .MuiGrid-item {
      padding: 0;
    }
  }

  .button {
    display: flex;
    margin-top: 30px;
    justify-content: center;
    align-items: center;
  }
`;

const NoCoachFormSubmit = styled.div`
  .formSubmitted {
    margin-top: 150px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 3em;
    && .MuiGrid-item {
      padding: 0;
    }
  }
`;

const CoachWrapper = styled.div`
  .card-buttons {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }

  .buttons {
    display: flex;
    margin-top: 1vh;

    .MuiButton-root {
      margin: 2px;
      width: 100%;
    }
  }

  @media only screen and (min-width: 768px) {
    .card-buttons {
      flex-direction: row;
      align-items: flex-start;
    }

    .buttons {
      display: block;
      margin-top: 0;
      width: 20%;
    }
  }
`;

const language = "English";
const location = "Australia";

async function addFeedback(feedbackAnswers, comment) {
  const body = {
    1: feedbackAnswers[1],
    2: feedbackAnswers[2],
    3: feedbackAnswers[3],
    4: feedbackAnswers[4],
    5: feedbackAnswers[5],
    6: feedbackAnswers[6],
    7: feedbackAnswers[7],
    8: feedbackAnswers[8],
    9: feedbackAnswers[9],
    10: feedbackAnswers[10],
    11: feedbackAnswers[11],
    12: feedbackAnswers[12],
    comment: comment,
  };

  await fetch(process.env.REACT_APP_BACKEND_URL + "/api/feedback", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
}

/**
 *
 * @returns {JSX} - JSX representing Coach page
 */
const MyCoach = () => {
  /**
   * The following is for the questionnaire page to find a coach
   */
  const [questionnaireOpen, setQuestionnaireOpen] = useState(false);
  const [questionnaireSubmitted, setQuestionnaireSubmitted] = useState(false);

  /**
   * The following is for gathering coach details to render on the page
   */
  const [coachExists, isCoach] = useState();
  const [coachFirstName, setCoachName] = useState();
  const [numCoached, setNumCoached] = useState();
  const [coachIntro, setCoachIntro] = useState();
  const [coachEducation, setCoachEducation] = useState();
  const [coachPhilosophy, setCoachPhilosophy] = useState();
  const [coachApproaches, setCoachApproaches] = useState();

  const [isLoading, setLoading] = useState(true);

  const data = useSelector((data) => data.user);

  const toggleQuestionnaire = () => {
    setQuestionnaireOpen(!questionnaireOpen);
  };

  /**
   * UseEffect helps to make sure API call isn't continuously repeated
   */

  useEffect(() => {
    const coach = async () => {
      const coach = data.pairedCoach;
      if (!coach) {
        isCoach(false);
      } else {
        isCoach(true);
        setCoachName(coach.firstName);
        setNumCoached(coach.coach.leaders.length);
        setCoachIntro(coach.coach.about);
        setCoachEducation(coach.coach.experience);
        setCoachPhilosophy(coach.coach.philosophy);
        setCoachApproaches(coach.coach.approaches);
      }
      setLoading(false);
    };
    coach();
  }, [data.pairedCoach]);

  /**
   * Submits the questionnaire if a field is incomplete it returns
   * @param {*} e
   * @returns
   */

  const questionnaireFormSubmit = async (e) => {
    e.preventDefault();
    toggleQuestionnaire();
    setQuestionnaireSubmitted(true);
  };

  /**
   * The following functions are for rating the coach
   */
  const [isOpen, setIsOpen] = useState(false);
  const [feedbackAnswers, setFeedbackAnswers] = useState();
  const [comment, setComment] = useState();

  const togglePopup = () => {
    setIsOpen(!isOpen);
    setFeedbackAnswers(undefined);
    setComment(undefined);
  };

  const formSubmit = (e) => {
    e.preventDefault();
    const _addFeedback = async (feedbackAnswers, comment) => {
      await addFeedback(feedbackAnswers, comment);
    };
    _addFeedback(feedbackAnswers, comment);
    console.log(feedbackAnswers);
    console.log(comment);
    togglePopup();
  };

  /**
   * Send this data wherever it needs to go to carry out matchmaking
   */

  /**
   * If no coach exists this page should remain empty
   */
  if (isLoading) {
    return (
      <div style={{ width: "100%", textAlign: "center" }}>
        <CircularProgress color="secondary" sx={{ margin: "auto" }} />
      </div>
    );
  }

  if (!coachExists && !questionnaireSubmitted) {
    return (
      <NoCoachWrapper>
        <div className="noCoachText">Find a coach!</div>
        <div className="button">
          <Button
            className="findCoachButton"
            variant="outlined"
            onClick={toggleQuestionnaire}
          >
            Find a coach
          </Button>
        </div>

        {questionnaireOpen && (
          <Questionnaire
            open={questionnaireOpen}
            handleClose={toggleQuestionnaire}
            questionnaireFormSubmit={questionnaireFormSubmit}
          />
        )}
      </NoCoachWrapper>
    );
  } else if (!coachExists && questionnaireSubmitted) {
    return (
      <NoCoachFormSubmit>
        <div className="formSubmitted">Thank you for submitting this form!</div>
      </NoCoachFormSubmit>
    );
  } else {
    /**
     * Else render the coach's profile
     */

    return (
      <CoachWrapper>
        <div className="card-buttons">
          <Profile
            name={coachFirstName}
            language={language}
            numCoached={numCoached}
            location={location}
          />

          <div className="buttons">
            <Button
              variant="outlined"
              component={NavLink}
              to="/leader/schedule-sessions"
            >
              Book session
            </Button>
            <Button variant="outlined" onClick={togglePopup}>
              Leave feedback
            </Button>
          </div>
        </div>
        <div className="details">
          <Info heading="My Intro" details={coachIntro}></Info>
          <Info heading="Education" details={coachEducation}></Info>
          <Info heading="Coaching Philosophy" details={coachPhilosophy}></Info>
          <Info heading="My Approaches" details={coachApproaches}></Info>
        </div>
        {isOpen && (
          <Popup
            open={isOpen}
            handleClose={togglePopup}
            setFeedbackAnswers={setFeedbackAnswers}
            setComment={setComment}
            formSubmit={formSubmit}
          />
        )}
      </CoachWrapper>
    );
  }
};

export default MyCoach;
