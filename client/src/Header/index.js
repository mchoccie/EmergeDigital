import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import DropdownButton from "Header/DropdownButton";
import Hamburger from "Header/Hamburger";
import LoginButton from "Header/LoginButton";
import LeaderNav from "Header/LeaderNav";
import CoachNav from "Header/CoachNav";
import AdminNav from "Header/AdminNav";
import EmptyNav from "Header/EmptyNav";

// Styles for the header component
const HeaderWrapper = styled.header`
  width: 100%;
  height: var(--header-height);
  box-sizing: border-box;
  border-bottom: 1px solid var(--light-gray);

  .header-content {
    max-width: var(--max-width);
    box-sizing: border-box;
    padding: 0 var(--horizontal-padding) 0 var(--horizontal-padding);
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 auto;
    height: 100%;
  }

  .left-align {
    display: flex;
    align-items: center;
    margin: 0 0;

    .logo {
      width: auto;
      height: auto;
      display: flex;
      align-items: center;

      margin-right: 2vw;

      font-family: var(--title-font);

      // Override link styling
      a {
        text-decoration: none;
      }
      .active {
        pointer-events: none;
      }
    }

    .navigation {
      display: none;
      // Link styling
      a {
        text-decoration: underline solid transparent;
        text-underline-offset: 5px;
        transition: all 0.3s ease;
        margin: 0 0.5rem;
        color: black;
      }

      a:last-child {
        margin-right: 0;
      }

      a:hover {
        text-decoration: underline;
      }

      .active {
        pointer-events: none;
        text-decoration: underline;
      }
    }
  }

  .dropdown {
    display: none;
  }

  @media only screen and (min-width: 600px) {
    .dropdown {
      display: inline-block;
    }

    .hamburger {
      display: none;
    }

    .left-align .navigation {
      display: inline-block;
    }
  }
`;

/**
 *
 * @returns {JSX} - JSX representing global header
 */
const Header = () => {
  const data = useSelector((state) => state.user);

  const headerInfo = {
    leader: {
      path: "/leader",
      navigation: LeaderNav,
    },
    coach: {
      path: "/coach",
      navigation: CoachNav,
    },
    admin: {
      path: "/admin",
      navigation: AdminNav,
    },
    undefined: {
      path: "/login",
      navigation: EmptyNav,
    },
  };

  const HeaderNav = headerInfo[data.userType].navigation;

  return (
    <HeaderWrapper userType={data.userType}>
      <div className="header-content">
        <div className="left-align">
          <div className="logo">
            <NavLink
              exact
              to={headerInfo[data.userType].path}
              activeClassName="active"
            >
              <h1>EMERGE</h1>
            </NavLink>
          </div>
          <div className="navigation">
            <HeaderNav />
          </div>
        </div>
        {data.loggedIn ? (
          <>
            <div className="dropdown">
              <DropdownButton />
            </div>
            <div className="hamburger">
              <Hamburger />
            </div>
          </>
        ) : (
          <LoginButton />
        )}
      </div>
    </HeaderWrapper>
  );
};

export default Header;
