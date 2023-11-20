import { render, screen, fireEvent } from "@testing-library/react";
import Radio from "./Radio";

describe("Radio Component", () => {
  const mockCallback = jest.fn();

  const defaultProps = {
    callback: mockCallback,
    selected: false,
  };

  it("renders with the correct styles when not selected", () => {
    render(<Radio {...defaultProps} />);

    const radio = screen.getByTestId("radio-button");

    expect(radio).toHaveClass("bi-circle");
  });

  it("renders with the correct styles when selected", () => {
    render(<Radio {...defaultProps} selected={true} />);

    const radio = screen.getByTestId("radio-button");

    expect(radio).toHaveClass("bi-check-circle");
  });

  it("calls the callback function when clicked", () => {
    render(<Radio {...defaultProps} />);

    const radio = screen.getByTestId("radio-button");

    fireEvent.click(radio);

    expect(mockCallback).toHaveBeenCalled();
  });
});
