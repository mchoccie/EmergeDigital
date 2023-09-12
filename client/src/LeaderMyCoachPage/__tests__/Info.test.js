import { render, screen } from "@testing-library/react";
import Info from "LeaderMyCoachPage/Info";

test("renders heading", () => {
    render(<Info heading="My Intro" details="" />);
    const header = screen.getByText("My Intro");
    expect(header).toBeInTheDocument();
});

test("renders details", () => {
    render(<Info heading="" details="I am a coach" />);
    const details = screen.getByText("I am a coach");
    expect(details).toBeInTheDocument();
});