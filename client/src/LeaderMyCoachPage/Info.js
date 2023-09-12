import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const InfoWrapper = styled.div`
  .body-content {
  }
`;

/**
 *
 * @param {Object} props - the props passed into the component
 * @param {String} props.heading - heading of coach page
 * @param {String} props.details - details of coach page
 * @returns {JSX} - JSX defining content of coach page
 */
const Info = ({ heading, details }) => {
  return (
    <InfoWrapper>
      <div className="heading">
        <h3>{heading}</h3>
      </div>
      <div className="body-content">
        <p>{details}</p>
      </div>
    </InfoWrapper>
  );
};

Info.propTypes = {
  heading: PropTypes.string,
  details: PropTypes.string,
};

export default Info;
