import { render, screen, fireEvent } from "@testing-library/react";
import AddTaskButton from "./AddTaskButton";

describe("AddTaskButton Component", () => {
  const mockCallback = jest.fn();

  const defaultProps = {
    callback: mockCallback,
    title: "Add Task",
  };

  it("renders with the correct title and icon", () => {
    render(<AddTaskButton {...defaultProps} />);

    const addButton = screen.getByTestId("add-task-button");

    expect(addButton).toHaveTextContent("Add Task");

    const icon = screen.getByTestId("add-task-button-icon");
    expect(icon).toHaveClass("bi-plus");
    expect(icon).toHaveClass("add-task-icon");
  });

  it("calls the callback function with the correct argument when clicked", () => {
    render(<AddTaskButton {...defaultProps} />);

    const addButton = screen.getByTestId("add-task-button");

    fireEvent.click(addButton);

    expect(mockCallback).toHaveBeenCalledWith(true);
  });
});
