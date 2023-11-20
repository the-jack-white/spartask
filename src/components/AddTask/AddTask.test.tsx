import { render, screen, fireEvent } from "@testing-library/react";
import AddTask from "./AddTask";

jest.mock("./AddTaskButton/AddTaskButton", () => ({
  __esModule: true,
  default: jest.fn(
    ({
      callback,
      title,
    }: {
      callback: (n: boolean) => void;
      title: string;
    }) => (
      <button onClick={() => callback(true)} data-testid="add-task-button">
        {title}
      </button>
    )
  ),
}));

jest.mock("./AddTaskWindow/AddTaskWindow", () => ({
  __esModule: true,
  default: jest.fn(
    ({
      closeCallback,
      closeTitle,
      addTitle,
    }: {
      closeCallback: (n: boolean) => void;
      closeTitle: string;
      addTitle: string;
    }) => (
      <div>
        <button
          onClick={() => closeCallback(false)}
          data-testid="add-task-window-close-button"
        >
          {closeTitle}
        </button>
        <button onClick={() => {}} data-testid="add-task-window-action-button">
          {addTitle}
        </button>
      </div>
    )
  ),
}));

describe("AddTask Component", () => {
  it("renders AddTaskButton initially and switches to AddTaskWindow when clicked", () => {
    render(<AddTask />);

    expect(screen.getByTestId("add-task-button")).toBeInTheDocument();
    expect(screen.queryByTestId("add-task-window-close-button")).toBeNull();

    fireEvent.click(screen.getByText("Add Task"));

    expect(
      screen.getByTestId("add-task-window-close-button")
    ).toBeInTheDocument();
    expect(screen.queryByTestId("add-task-button")).toBeNull();
  });

  it("calls the closeCallback with false when the close button is clicked in AddTaskWindow", () => {
    render(<AddTask />);

    fireEvent.click(screen.getByText("Add Task"));

    fireEvent.click(screen.getByTestId("add-task-window-close-button"));

    expect(screen.getByTestId("add-task-button")).toBeInTheDocument();
  });

  it("renders the AddTaskWindow with the correct title when in edit mode", () => {
    render(<AddTask />);

    fireEvent.click(screen.getByText("Add Task"));

    expect(
      screen.getByTestId("add-task-window-action-button")
    ).toHaveTextContent("Add Task");
  });
});
