import { render, screen } from "@testing-library/react";
import CoachMyLeadersPage from "CoachMyLeadersPage";

test("renders page", () => {
  render(<CoachMyLeadersPage />);
  const heading = screen.getByText("My Leaders");
  expect(heading).toBeInTheDocument();
});
