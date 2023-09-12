import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import CalendarLink from "./CalendarLink";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const SessionsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2vh;
  position: relative;
`;

/**
 *
 * @param {Object} props - props passed into react component
 * @param {String} props.coachName - name of matched coach
 * @returns {JSX} - JSX representing sessions section on Leader page
 */
export default function Sessions({ coachName }) {
  const theme = createTheme({
    breakpoints: {
      values: {
        xs: 0,
        sm: 450,
        md: 900,
        lg: 1200,
        xl: 1536,
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <SessionsWrapper>
        <div>
          <h2>Your Sessions</h2>
        </div>
        <CalendarLink coachName={coachName} />
      </SessionsWrapper>
    </ThemeProvider>
  );
}

Sessions.propTypes = {
  coachName: PropTypes.string,
};
