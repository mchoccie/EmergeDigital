import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import Button from "@mui/material/Button";

const LoginButtonWrapper = styled.div`
  display: flex;
  justify-content: center;

  .MuiButton-root {
    margin-left: 0.5em;
  }
`;

/**
 *
 * @returns {JSX} - JSX represnting header login/signup buttons
 */
const LoginButton = () => {
  return (
    <LoginButtonWrapper>
      <Button component={NavLink} to="/login" variant="outlined">
        Login
      </Button>
      <Button component={NavLink} to="/signup" variant="contained">
        Sign Up
      </Button>
    </LoginButtonWrapper>
  );
};

export default LoginButton;
