import { render, screen } from "@testing-library/react";
import Actions from "LeaderHomePage/Actions";

// const tasks = [
//   {
//     subgoal: "Meditate every day in the morning",
//     actions: [
//       {
//         name: "Update LinkedIn profile",
//         max_iterations: 1,
//         current_iterations: 0,
//         completed: false,
//       },
//       {
//         name: "Learn React",
//         max_iterations: 8,
//         current_iterations: 0,
//         completed: false,
//       },
//       {
//         name: "Complete professional development course",
//         max_iterations: 1,
//         current_iterations: 0,
//         completed: false,
//       },
//       {
//         name: "Write a script for a webinar",
//         max_iterations: 1,
//         current_iterations: 0,
//         completed: false,
//       },
//     ],
//   },
//   {
//     subgoal: "Have a good work-life balance",
//     actions: [
//       {
//         name: "Go for a walk",
//         max_iterations: 7,
//         current_iterations: 0,
//         completed: false,
//       },
//       {
//         name: "Bake a cake",
//         max_iterations: 4,
//         current_iterations: 0,
//         completed: false,
//       },
//       {
//         name: "Do a lot of very cool things that I can't think of",
//         max_iterations: 1,
//         current_iterations: 0,
//         completed: false,
//       },
//     ],
//   },
// ];

test("renders subgoal heading", () => {
  render(<Actions tasks={[
    {
      subgoal: "subgoal",
      actions: [],
    }
  ]} 
  />);
  const heading = screen.getByText("subgoal");
  expect(heading).toBeInTheDocument();
});

test("renders multiple subgoal headings", () => {
  render(<Actions tasks={[
    {
      subgoal: "subgoal1",
      actions: [],
    },
    {
      subgoal: "subgoal2",
      actions: [],
    },
    {
      subgoal: "subgoal3",
      actions: [],
    }
  ]} 
  />);
  const heading1 = screen.getByText("subgoal1");
  expect(heading1).toBeInTheDocument();
  const heading2 = screen.getByText("subgoal2");
  expect(heading2).toBeInTheDocument();
  const heading3 = screen.getByText("subgoal3");
  expect(heading3).toBeInTheDocument();
});

test("renders actions", () => {
  render(<Actions tasks={[
    {
      subgoal: "subgoal",
      actions: [
        {
          name: "Update LinkedIn profile",
          max_iterations: 1,
          current_iterations: 0,
          completed: false,
        }
      ],
    }
  ]} 
  />);
  const action = screen.getByText("Update LinkedIn profile");
  expect(action).toBeInTheDocument();
});