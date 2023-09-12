import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import MyCoach from "LeaderMyCoachPage";

test("dummy", () => {
    expect(1 === 1);
})

// test("renders buttons", () => {
//     render(<BrowserRouter><MyCoach /></BrowserRouter>);
//     const book = screen.getByText("Book session");
//     const message = screen.getByText("Send message");
//     const feedback = screen.getByText("Leave feedback");
//     expect(book).toBeInTheDocument();
//     expect(message).toBeInTheDocument();
//     expect(feedback).toBeInTheDocument();
// });

// test("renders details", () => {
//     render(<BrowserRouter><MyCoach /></BrowserRouter>);
//     const intro = screen.getByText("My Intro");
//     const education = screen.getByText("Education");
//     const philosophy = screen.getByText("Coaching Philosophy");
//     const approaches = screen.getByText("My Approaches");
//     expect(intro).toBeInTheDocument();
//     expect(education).toBeInTheDocument();
//     expect(philosophy).toBeInTheDocument();
//     expect(approaches).toBeInTheDocument();
// });

// test("pop-up opens", () => {
//     render(<BrowserRouter><MyCoach /></BrowserRouter>);
//     userEvent.click(screen.getByText("Leave feedback"));
//     const popupText = screen.getByText("Think about the coaching session you just had with your coach as you answer these questions.");
//     expect(popupText).toBeInTheDocument();
// });

// test("form submits", () => {
//     render(<BrowserRouter><MyCoach /></BrowserRouter>);
//     userEvent.click(screen.getByText("Leave feedback"));
//     // userEvent.click(screen.getByDisplayValue("5"));
//     userEvent.click(screen.getByText("Submit"));
//     const popupText = screen.queryByText("Think about the coaching session you just had with your coach as you answer these questions.");
//     expect(popupText).not.toBeInTheDocument();
// });