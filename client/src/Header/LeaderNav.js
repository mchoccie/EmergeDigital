import React from "react";
import { NavLink } from "react-router-dom";

/**
 *
 * @returns {JSX} - navigation header for leaders
 */
const LeaderNav = () => {
  return (
    <nav>
      <NavLink exact to="/leader/mycoach" activeClassName="active">
        My Coach
      </NavLink>
      <NavLink exact to="/leader/schedule-sessions" activeClassName="active">
        Schedule Sessions
      </NavLink>
      <NavLink exact to="/leader/methodology" activeClassName="active">
        Our Methodology
      </NavLink>
    </nav>
  );
};

export default LeaderNav;
