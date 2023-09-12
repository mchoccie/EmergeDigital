import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import placeholder from "LeaderMyCoachPage/placeholder.png";

const ProfileWrapper = styled.div`
  width: 90%;
  text-align: center;

  img {
    width: 150px;
    height: 150px;
    object-fit: cover;
    border-radius: 5px;
    box-shadow: 0 0 5px 1px var(--shadow);
  }

  h2 {
    margin: 0.5rem;
  }

  p {
    margin: 0.5rem;
  }

  @media only screen and (min-width: 450px) {
    display: flex;
    justify-content: center;
    text-align: left;

    box-shadow: 0 0px 5px 0 var(--shadow);
    border: 1px solid var(--shadow);
    border-left: 4px solid var(--secondary);
    border-radius: 4px;

    img {
      margin-right: 1.5em;
      border-radius: 0;
      box-shadow: none;
    }

    h2 {
      margin-top: 0.83em;
      margin-bottom: 0.83em;
      margin-left: 0;
      margin-right: 0;
    }

    p {
      margin-top: 1em;
      margin-bottom: 1em;
      margin-left: 0;
      margin-right: 0;
    }
  }

  @media only screen and (min-width: 600px) {
    width: 70%;

    img {
      width: 200px;
      height: 200px;
    }
  }

  @media only screen and (min-width: 768px) {
    justify-content: flex-start;
  }
`;

const CoachDetails = styled.div`
  width: 100%;
`;

/**
 *
 * @param {Object} props - props passed in to the react component
 * @param {String} props.name - name of coach
 * @param {int} props.numCoached - number of previous clients coached
 * @returns {JSX} - JSX representing pfp + coach details
 */
const Profile = ({ name, language, numCoached, location }) => {
  return (
    <ProfileWrapper>
      <img src={placeholder} alt="profile" />
      <CoachDetails>
        <h2>{name}</h2>
        <p>Leaders coaching: {numCoached}</p>
      </CoachDetails>
    </ProfileWrapper>
  );
};

Profile.propTypes = {
  name: PropTypes.string,
  numCoached: PropTypes.number,
};

export default Profile;
