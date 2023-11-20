import { render, screen, fireEvent } from "@testing-library/react";
import Task from "./Task";
import { useTask, useAuth } from "../../context";

jest.mock("../../context", () => ({
  useAuth: jest.fn(),
  useTask: jest.fn(),
}));

describe("Task Component", () => {
  const mockRemoveTask = jest.fn();
  const mockEditTask = jest.fn();

  const mockCurrentUser = {
    id: "user123",
  };

  const defaultProps = {
    id: "task123",
    userId: "user123",
    timestamp: 123,
    title: "Test Task",
    description: "Task Description",
    completed: false,
  };

  beforeEach(() => {
    jest.clearAllMocks();

    (useAuth as jest.Mock).mockReturnValue({ currentUser: mockCurrentUser });
    (useTask as jest.Mock).mockReturnValue({
      removeTask: mockRemoveTask,
      editTask: mockEditTask,
    });
  });

  it("renders the Task component with the correct elements when not in edit mode", () => {
    render(<Task {...defaultProps} />);

    expect(screen.getByTestId("task-container")).toBeInTheDocument();
    expect(screen.getByTestId("task-icon-container")).toBeInTheDocument();
    expect(screen.getByTestId("task-icon-edit")).toBeInTheDocument();
    expect(screen.getByTestId("task-icon-remove")).toBeInTheDocument();
  });

  it("calls the editTask function when the edit icon is clicked", () => {
    render(<Task {...defaultProps} />);

    fireEvent.click(screen.getByTestId("task-icon-edit"));

    expect(screen.getByTestId("add-task-window")).toBeInTheDocument();
  });

  it("calls the removeTask function when the remove icon is clicked", () => {
    render(<Task {...defaultProps} />);

    fireEvent.click(screen.getByTestId("task-icon-remove"));

    expect(mockRemoveTask).toHaveBeenCalledWith(defaultProps.id);
  });

  it("opens the AddTaskWindow when in edit mode", () => {
    render(<Task {...defaultProps} />);

    fireEvent.click(screen.getByTestId("task-icon-edit"));

    expect(screen.getByTestId("add-task-window")).toBeInTheDocument();
  });

  it("calls the editTask function with the correct arguments when in edit mode", () => {
    render(<Task {...defaultProps} />);

    fireEvent.click(screen.getByTestId("task-icon-edit"));

    const editTitle = "Updated Task";
    fireEvent.change(screen.getByTestId("add-task-window-name"), {
      target: { value: editTitle },
    });

    fireEvent.click(screen.getByTestId("add-task-window-action-button"));

    expect(mockEditTask).toHaveBeenCalledWith(
      {
        ...defaultProps,
        title: editTitle,
        editTimestamp: expect.any(Number),
      },
      defaultProps.id
    );
  });

  it("marks a task as complete when Radio is clicked", () => {
    render(<Task {...defaultProps} />);

    fireEvent.click(screen.getByTestId("radio-button"));

    expect(mockEditTask).toHaveBeenCalledWith(
      {
        ...defaultProps,
        completed: true,
      },
      defaultProps.id
    );
  });
});
