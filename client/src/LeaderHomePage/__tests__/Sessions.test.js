import { render, screen } from "@testing-library/react";
import Sessions from "LeaderHomePage/Sessions";

test("renders headings", () => {
  render(<Sessions />);
  const yourSessions = screen.getByText("Your Sessions");
  expect(yourSessions).toBeInTheDocument();
});

// test("renders all defaults", () => {
//   render(<Sessions />);
//   const sessions = screen.getAllByText("No plans");
//   expect(sessions.length == 3);
// });

// test("renders next session", () => {
//   render(<Sessions next="30th August" />);
//   const nextSession = screen.getByText("30th August");
//   expect(nextSession).toBeInTheDocument();
// });

// test("renders this month single", () => {
//   render(<Sessions month={["30th August"]} />);
//   const thisMonth = screen.getByText("30th August");
//   expect(thisMonth).toBeInTheDocument();
// });

// test("renders this month triple", () => {
//   render(<Sessions month={["29th August", "30th August", "31st August"]} />);
//   const sessionOne = screen.getByText("29th August");
//   expect(sessionOne).toBeInTheDocument();
//   const sessionTwo = screen.getByText("30th August");
//   expect(sessionTwo).toBeInTheDocument();
//   const sessionThree = screen.getByText("31st August");
//   expect(sessionThree).toBeInTheDocument();
// });

// test("renders this month quadruple", () => {
//   render(
//     <Sessions
//       month={["28th August", "29th August", "30th August", "31st August"]}
//     />
//   );
//   const extras = screen.getByText("And 1 more");
//   expect(extras).toBeInTheDocument();
// });

// test("renders this month 7 sessions", () => {
//   render(
//     <Sessions
//       month={[
//         "25th August",
//         "26th August",
//         "27th August",
//         "28th August",
//         "29th August",
//         "30th August",
//         "31st August",
//       ]}
//     />
//   );
//   const extras = screen.getByText("And 4 more");
//   expect(extras).toBeInTheDocument();
// });

// test("renders later single", () => {
//   render(<Sessions later={["30th August"]} />);
//   const later = screen.getByText("30th August");
//   expect(later).toBeInTheDocument();
// });

// test("renders later triple", () => {
//   render(<Sessions later={["29th August", "30th August", "31st August"]} />);
//   const sessionOne = screen.getByText("29th August");
//   expect(sessionOne).toBeInTheDocument();
//   const sessionTwo = screen.getByText("30th August");
//   expect(sessionTwo).toBeInTheDocument();
//   const sessionThree = screen.getByText("31st August");
//   expect(sessionThree).toBeInTheDocument();
// });

// test("renders this later quadruple", () => {
//   render(
//     <Sessions
//       later={["28th August", "29th August", "30th August", "31st August"]}
//     />
//   );
//   const extras = screen.getByText("And 1 more");
//   expect(extras).toBeInTheDocument();
// });

// test("renders later 7 sessions", () => {
//   render(
//     <Sessions
//       later={[
//         "25th August",
//         "26th August",
//         "27th August",
//         "28th August",
//         "29th August",
//         "30th August",
//         "31st August",
//       ]}
//     />
//   );
//   const extras = screen.getByText("And 4 more");
//   expect(extras).toBeInTheDocument();
// });

// test("renders typical scenario", () => {
//   const nextSession = "10th August";
//   const thisMonth = ["17th August", "24th August"];
//   const later = [
//     "1st September",
//     "8th September",
//     "15th September",
//     "25th September",
//   ];

//   render(<Sessions next={nextSession} month={thisMonth} later={later} />);

//   const next = screen.getByText("10th August");
//   const thisMonthOne = screen.getByText("17th August");
//   const thisMonthTwo = screen.getByText("24th August");
//   const laterOne = screen.getByText("1st September");
//   const laterTwo = screen.getByText("8th September");
//   const laterThree = screen.getByText("15th September");
//   const extras = screen.getByText("And 1 more");

//   expect(next).toBeInTheDocument();
//   expect(thisMonthOne).toBeInTheDocument();
//   expect(thisMonthTwo).toBeInTheDocument();
//   expect(laterOne).toBeInTheDocument();
//   expect(laterTwo).toBeInTheDocument();
//   expect(laterThree).toBeInTheDocument();
//   expect(extras).toBeInTheDocument();
// });
