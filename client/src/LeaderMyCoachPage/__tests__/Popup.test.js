import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Popup from "LeaderMyCoachPage/Popup";

test("renders content", () => {
    render(<Popup open={true} />)
    const content = screen.getByText("Feedback");
    expect(content).toBeInTheDocument();
});

test("close div calls function when clicked", () => {
    const mockFuntion = jest.fn();
    render(<Popup open={true} handleClose={mockFuntion}/>);
    userEvent.click(screen.getByText("Cancel"));
    expect(mockFuntion).toHaveBeenCalled();
});