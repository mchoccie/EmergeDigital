import { render, screen } from "@testing-library/react";
import Progress from "LeaderHomePage/Progress";

test("renders none completed", () => {
  render(<Progress task={{
    subgoal: "subgoal",
    actions: [
      {
        name: "Go for a walk",
        max_iterations: 7,
        current_iterations: 0,
        completed: false,
      },
      {
        name: "Eat dinner",
        max_iterations: 1,
        current_iterations: 0,
        completed: false,
      }
    ],
  }}
  />);
  const perc = screen.getByText("0%");
  expect(perc).toBeInTheDocument();
  const completed = screen.getByText("Completed 0/8");
  expect(completed).toBeInTheDocument();
});

test("renders half completed", () => {
  render(<Progress task={{
    subgoal: "subgoal",
    actions: [
      {
        name: "Go for a walk",
        max_iterations: 1,
        current_iterations: 0,
        completed: false,
      },
      {
        name: "Eat dinner",
        max_iterations: 1,
        current_iterations: 1,
        completed: true,
      }
    ],
  }}
  />);
  const perc = screen.getByText("50%");
  expect(perc).toBeInTheDocument();
  const completed = screen.getByText("Completed 1/2");
  expect(completed).toBeInTheDocument();
});

test("renders all completed", () => {
  render(<Progress task={{
    subgoal: "subgoal",
    actions: [
      {
        name: "Go for a walk",
        max_iterations: 7,
        current_iterations: 7,
        completed: true,
      },
      {
        name: "Eat dinner",
        max_iterations: 1,
        current_iterations: 1,
        completed: true,
      }
    ],
  }}
  />);
  const perc = screen.getByText("100%");
  expect(perc).toBeInTheDocument();
  const completed = screen.getByText("Completed 8/8");
  expect(completed).toBeInTheDocument();
});
