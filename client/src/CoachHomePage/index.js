import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import Sessions from "LeaderHomePage/Sessions"
// import Sessions from "CoachHomePage/Sessions";

const HomepageWrapper = styled.div`
  width: 100%;
  text-align: center;
`;

// Fake data to display until database fetching is implemented

// const fakeSessions = [
//   {
//     date: "17th September 3:00pm",
//     leader: "Jane",
//   },
//   {
//     date: "18th September 3:00pm",
//     leader: "Bob",
//   },
//   {
//     date: "19th September 3:00pm",
//     leader: "Jeff",
//   },
//   {
//     date: "19th September 4:00pm",
//     leader: "Sam",
//   },
//   {
//     date: "20th September 5:00pm",
//     leader: "Alice",
//   },
//   {
//     date: "25th September 1:00pm",
//     leader: "Michael",
//   },
// ];

const CoachHomePage = () => {
  // call Leaders() here

  const userData = useSelector((state) => state.user);

  return (
    <HomepageWrapper>
      <div>
        <h1>Welcome, {userData.firstName}</h1>
      </div>
      <Sessions coachName={"Emerge"} />
    </HomepageWrapper>
  );
};

export default CoachHomePage;
