import { render, screen } from "@testing-library/react";
import Goal from "LeaderHomePage/Goal";

test("renders component", () => {
  render(<Goal />);
  const heading = screen.getByText("Overarching Goal:");
  expect(heading).toBeInTheDocument();
});
