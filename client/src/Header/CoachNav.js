import React from "react";
import { NavLink } from "react-router-dom";

/**
 *
 * @returns {JSX} - JSX representing coach navigation header
 */
const CoachNav = () => {
  return (
    <nav>
      <NavLink exact to="/coach/myleaders" activeClassName="active">
        My Leaders
      </NavLink>
      <NavLink exact to="/coach/feedback" activeClassName="active">
        Feedback
      </NavLink>
      <NavLink exact to="/coach/resources" activeClassName="active">
        Resources
      </NavLink>
      <NavLink exact to="/coach/community" activeClassName="active">
        Community
      </NavLink>
    </nav>
  );
};

export default CoachNav;
