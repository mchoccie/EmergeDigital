import React from "react";
import styled from "styled-components";

const GoalBanner = styled.div`
  text-align: center;

  .header {
    color: white;
    font-size: 1.5rem;
  }

  .overarching {
    color: white;
  }
  width: 100%;
  padding: 1rem;
  background: linear-gradient(135deg, #5e3ad4 0%, #137b68 100%);
  border-radius: 5px;
  -webkit-box-shadow: 0px 0px 25px 5px var(--shadow);
  box-shadow: 0px 0px 25px 5px var(--shadow);

  @media only screen and (min-width: 600px) {
    .header {
      font-size: 2rem;
    }
  }

  @media only screen and (min-width: 768px) {
    .header {
      font-size: 2.25rem;
    }
  }
`;

/**
 *
 * @returns {JSX} - JSX representing main goal banner
 */
const Goal = () => {
  return (
    <GoalBanner>
      <h2 className="header">Overarching Goal:</h2>
      <h3 className="overarching">
        Self-care & building effective work habits
      </h3>
    </GoalBanner>
  );
};

export default Goal;
