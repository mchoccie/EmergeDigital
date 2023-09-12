import React, { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CircularProgress } from "@mui/material";
import styled from "styled-components";
import Routes from "Routes";
import Header from "Header";
import Footer from "Footer";
import Messaging from "Messaging";
import GlobalStyles from "Common/GlobalStyles";
import validate from "Common/Auth";
import { getCoach } from "Common/Fetch";
import {
  login,
  logout,
  setFirstName,
  setLastName,
  setUserCoach,
  setUserLeader,
  setUserAdmin,
  setUserId,
  setPairedCoach,
} from "Reducers/UserSlice";
import { setIsLoading } from "Reducers/SiteSlice";

const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90vh;
`;

const ContentWrapper = styled.div`
  // Force footer to bottom of page
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const PageWrapper = styled.div`
  // Width of content on page
  max-width: var(--max-width);
  width: 100vw;
  box-sizing: border-box;

  // Centering content on page
  margin: 0 auto;
  // Side padding
  padding: 4vh var(--horizontal-padding) 0 var(--horizontal-padding);
`;

// global MUI theme
const theme = createTheme({
  palette: {
    type: "light",
    primary: {
      main: "#050715",
    },
    secondary: {
      main: "#5E3AD4",
    },
    ternary: {
      main: "#CACACA",
    },
  },
  components: {
    MuiButton: {
      defaultProps: {
        color: "secondary",
      },
    },
  },
  typography: {
    fontFamily: ["Lato", "sans-serif"].join(","),
    h1: {
      fontFamily: "Prata, sans-serif",
    },
    button: {
      fontSize: "0.65625rem",
      "@media (min-width: 600px)": {
        fontSize: "0.765625rem",
      },
      "@media (min-width: 768px)": {
        fontSize: "0.875rem",
      },
    },
  },
});

/**
 * Top level component rendered onto DOM, performs preprocessing before website
 * is displayed
 * @returns {JSX} - JSX representing web app
 */
const App = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user);
  const siteData = useSelector((state) => state.site);

  // validate login state and set redux states accordingly
  useEffect(() => {
    const updateLoginState = async () => {
      const { _id, firstName, lastName, userType } = await validate();
      if (!userType) {
        dispatch(logout());
      } else {
        dispatch(login());
        dispatch(setUserId(_id.toString()));
        dispatch(setFirstName(firstName));
        dispatch(setLastName(lastName));
        if (userType === "leader") {
          dispatch(setUserLeader());
          const coach = await getCoach();
          if (typeof coach !== "string") dispatch(setPairedCoach(coach));
        } else if (userType === "coach") dispatch(setUserCoach());
        else if (userType === "admin") dispatch(setUserAdmin());
        else throw Error("updateLoginState could not identify user type!");
      }
      dispatch(setIsLoading());
    };
    updateLoginState();
  }, [dispatch]);

  return (
    <ThemeProvider theme={theme}>
      {siteData.isLoading ? (
        <LoadingWrapper>
          <CircularProgress color="secondary" />
        </LoadingWrapper>
      ) : (
        <Router>
          <GlobalStyles />
          <ContentWrapper>
            <Header />
            <PageWrapper>
              <Routes />
            </PageWrapper>
            <Footer />
            {userData.userType === "leader" ? <Messaging /> : ""}
          </ContentWrapper>
        </Router>
      )}
    </ThemeProvider>
  );
};

export default App;
