import { render, screen } from "@testing-library/react";
import Footer from "Footer";

test("renders year section", () => {
  render(<Footer />);
  const expected = "© " + new Date().getFullYear() + " - Emerge Digital";
  const year = screen.getByText(expected);
  expect(year).toBeInTheDocument();
});

test("renders built by section", () => {
  render(<Footer />);
  const builtBy = screen.getByText(
    "Built with ❤️ by D.T. I.F. K.C. L.K. M.C. S.C."
  );
  expect(builtBy).toBeInTheDocument();
});
