import { render, screen, fireEvent } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import AddTaskWindow from "./AddTaskWindow";
import { useAuth, useTask } from "../../../context";

jest.mock("../../../context", () => ({
  useAuth: jest.fn(),
  useTask: jest.fn(),
}));

jest.mock("uuid", () => ({
  v4: jest.fn(() => "mocked-uuid"),
}));

describe("AddTaskWindow Component", () => {
  const mockAddTask = jest.fn();
  const mockEditTask = jest.fn();

  const mockCurrentUser = {
    id: "user123",
  };

  const defaultProps = {
    closeCallback: jest.fn(),
    closeTitle: "Close",
    addTitle: "Add Task",
  };

  beforeEach(() => {
    jest.clearAllMocks();

    (useAuth as jest.Mock).mockReturnValue({ currentUser: mockCurrentUser });
    (useTask as jest.Mock).mockReturnValue({
      addTask: mockAddTask,
      editTask: mockEditTask,
    });
  });

  it("renders with the correct input fields and buttons", () => {
    render(<AddTaskWindow {...defaultProps} />);

    expect(screen.getByTestId("add-task-window")).toBeInTheDocument();
    expect(screen.getByTestId("add-task-window-name")).toBeInTheDocument();
    expect(screen.getByTestId("add-task-window-desc")).toBeInTheDocument();
    expect(
      screen.getByTestId("add-task-window-button-container")
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("add-task-window-close-button")
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("add-task-window-action-button")
    ).toBeInTheDocument();
  });

  it("calls the closeCallback with false when the close button is clicked", () => {
    render(<AddTaskWindow {...defaultProps} />);

    fireEvent.click(screen.getByTestId("add-task-window-close-button"));

    expect(defaultProps.closeCallback).toHaveBeenCalledWith(false);
  });

  it("calls addTaskHandler with the correct task data when adding a new task", async () => {
    render(<AddTaskWindow {...defaultProps} />);

    act(() => {
      fireEvent.change(screen.getByTestId("add-task-window-name"), {
        target: { value: "New Task" },
      });
      fireEvent.change(screen.getByTestId("add-task-window-desc"), {
        target: { value: "Task Description" },
      });
    });

    fireEvent.click(screen.getByTestId("add-task-window-action-button"));

    expect(mockAddTask).toHaveBeenCalledWith({
      id: "mocked-uuid",
      userId: "user123",
      timestamp: expect.any(Number),
      title: "New Task",
      description: "Task Description",
      completed: false,
    });

    expect(defaultProps.closeCallback).toHaveBeenCalledWith(false);
  });

  it("calls editTaskHandler with the correct task data when editing an existing task", async () => {
    const editOptions = {
      id: "existingTaskId",
      userId: "user123",
      timestamp: expect.any(Number),
      title: "Existing Task",
      description: "Existing Task Description",
      completed: false,
    };

    render(<AddTaskWindow {...defaultProps} editOptions={editOptions} />);

    act(() => {
      fireEvent.change(screen.getByTestId("add-task-window-name"), {
        target: { value: "Updated Task" },
      });
      fireEvent.change(screen.getByTestId("add-task-window-desc"), {
        target: { value: "Updated Task Description" },
      });
    });

    fireEvent.click(screen.getByTestId("add-task-window-action-button"));

    expect(mockEditTask).toHaveBeenCalledWith(
      {
        ...editOptions,
        editTimestamp: expect.any(Number),
        title: "Updated Task",
        description: "Updated Task Description",
      },
      "existingTaskId"
    );

    expect(defaultProps.closeCallback).toHaveBeenCalledWith(false);
  });
});
