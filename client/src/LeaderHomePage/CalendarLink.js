import React from "react";
import PropTypes from "prop-types";
import { Button } from "@mui/material";

/**
 *
 * @param {Object} props - props passed into react component
 * @param {String} props.coachName - name of matched coach
 * @returns {JSX} - JSX representing link to see scheduled meetings
 */
const CalendarLink = ({ coachName }) => {
  const date = new Date();
  const today =
    String(date.getFullYear()) +
    String(date.getMonth() + 1).padStart(2, "0") +
    String(date.getDate()).padStart(2, "0");
  const nextMonth =
    String(date.getFullYear()) +
    String(date.getMonth() + 2).padStart(2, "0") +
    String(date.getDate()).padStart(2, "0");
  const url =
    "https://calendar.google.com/calendar/u/0/r/search?q=" +
    coachName +
    "&start=" +
    today +
    "&end=" +
    nextMonth;

  return (
    <div className="buttons">
      <Button
        variant="contained"
        onClick={(event) => window.open(url, "_blank").focus()}
      >
        {" "}
        View Upcoming Sessions in Google Calendar{" "}
      </Button>
    </div>
  );
};

CalendarLink.propTypes = {
  coachName: PropTypes.string,
};

export default CalendarLink;
