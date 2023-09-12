import { render, screen } from "@testing-library/react";
import Profile from "LeaderMyCoachPage/Profile";

// This should hopefully fail when photo is eventually loaded from DB
// test("renders photo", () => {
//     render(<Profile />);
//     const image = screen.getByAltText("coach");
//     expect(image).toBeInTheDocument();
// });

test("renders name", () => {
    render(<Profile name="Jeff"/>);
    const name = screen.getByText("Jeff");
    expect(name).toBeInTheDocument();
});

test("renders number coached", () => {
    render(<Profile numCoached={10}/>);
    const coached = screen.getByText("Leaders coaching: 10");
    expect(coached).toBeInTheDocument();
});