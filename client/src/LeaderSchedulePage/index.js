import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Button } from "@mui/material";
import { NavLink } from "react-router-dom";
import { InlineWidget } from "react-calendly";
import { useSelector } from "react-redux";
import { getUserInfo } from "LeaderSchedulePage/Fetch";

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

/**
 *
 * @returns {JSX} - JSX representing scheduling page
 */
const LeaderSchedulePage = () => {
  const [coach, setCoach] = useState("");
  const [user, setUser] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const data = useSelector((data) => data.user);

  useEffect(() => {
    const _getCoachAndUser = async () => {
      const coachLink = data.pairedCoach?.coach.calendlyLink;
      const user = await getUserInfo();
      setCoach({ link: coachLink });
      setUser(user);
      setIsLoading(false);
    };
    _getCoachAndUser();
  }, [data.pairedCoach?.coach.calendlyLink]);

  // Featuring spaghet ternary chaining
  return (
    <div>
      {isLoading ? (
        ""
      ) : coach !== null ? (
        coach.link !== undefined ? (
          <InlineWidget
            url={coach.link}
            prefill={{
              email: user.email,
              name: user.firstName + " " + user.lastName,
            }}
          />
        ) : (
          <p>
            Your coach has not set up their calendar link, please let them know!
          </p>
        )
      ) : (
        <NoCoachWrapper>
          <div className="noCoachText">You do not have a coach!</div>
          <div className="button">
            <Button
              className="findCoachButton"
              variant="outlined"
              component={NavLink}
              to="/leader/mycoach"
            >
              Go to coach page
            </Button>
          </div>
        </NoCoachWrapper>
      )}
    </div>
  );
};

export default LeaderSchedulePage;
