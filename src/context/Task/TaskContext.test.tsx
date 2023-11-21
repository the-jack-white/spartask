import { render, screen, fireEvent } from "@testing-library/react";
import { TaskProvider } from "./TaskContext";
import { useTask } from "../index";

jest.mock("../../utils/utils", () => ({
  saveToLocalStorage: jest.fn(),
}));

describe("TaskProvider Component", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("renders children and provides the correct context values", () => {
    render(
      <TaskProvider>
        <TestComponent />
      </TaskProvider>
    );

    expect(screen.getByTestId("task-count")).toHaveTextContent("0");

    fireEvent.click(screen.getByText("Add Task"));
    expect(screen.getByTestId("task-count")).toHaveTextContent("1");

    expect(
      require("../../utils/utils").saveToLocalStorage
    ).toHaveBeenCalledWith("tasks", [
      {
        id: "1",
        userId: "123",
        title: "Test Task",
        completed: false,
        timestamp: expect.any(Number),
      },
    ]);
  });

  it("removes a task and updates the context and localStorage", () => {
    const TestComponent = () => {
      const { allTasks, addTask, removeTask } = useTask();

      const addTaskHandler = () => {
        addTask({
          id: "1",
          userId: "123",
          timestamp: Date.now(),
          title: "Test Task",
          completed: false,
        });
      };

      const removeTaskHandler = () => {
        removeTask("1");
      };

      return (
        <div>
          <span data-testid="task-count">{allTasks.length}</span>
          <button onClick={addTaskHandler}>Add Task</button>
          <button onClick={removeTaskHandler}>Remove Task</button>
        </div>
      );
    };

    render(
      <TaskProvider>
        <TestComponent />
      </TaskProvider>
    );

    fireEvent.click(screen.getByText("Add Task"));

    expect(screen.getByTestId("task-count")).toHaveTextContent("1");

    fireEvent.click(screen.getByText("Remove Task"));

    expect(screen.getByTestId("task-count")).toHaveTextContent("0");

    expect(
      require("../../utils/utils").saveToLocalStorage
    ).toHaveBeenCalledWith("tasks", []);
  });

  it("edits a task and updates the context and localStorage", () => {
    const TestComponent = () => {
      const { allTasks, addTask, editTask } = useTask();

      const addTaskHandler = () => {
        addTask({
          id: "1",
          userId: "123",
          timestamp: 123456,
          title: "Test Task",
          completed: false,
        });
      };

      const editTaskHandler = () => {
        editTask(
          {
            id: "1",
            userId: "123",
            timestamp: 123456,
            title: "Updated Task",
            completed: true,
          },
          "1"
        );
      };

      return (
        <div>
          <span data-testid="task-count">{allTasks.length}</span>
          <button onClick={addTaskHandler}>Add Task</button>
          <button onClick={editTaskHandler}>Edit Task</button>
        </div>
      );
    };

    render(
      <TaskProvider>
        <TestComponent />
      </TaskProvider>
    );

    fireEvent.click(screen.getByText("Add Task"));

    expect(screen.getByTestId("task-count")).toHaveTextContent("1");

    fireEvent.click(screen.getByText("Edit Task"));

    expect(screen.getByTestId("task-count")).toHaveTextContent("1");

    expect(
      require("../../utils/utils").saveToLocalStorage
    ).toHaveBeenCalledWith("tasks", [
      {
        id: "1",
        userId: "123",
        title: "Updated Task",
        timestamp: 123456,
        completed: true,
      },
    ]);
  });

  it("skip edit if the task id is incorrect", () => {
    const TestComponent = () => {
      const { allTasks, addTask, editTask } = useTask();

      const addTaskHandler = () => {
        addTask({
          id: "1",
          userId: "123",
          timestamp: 123456,
          title: "Test Task",
          completed: false,
        });
      };

      const editTaskHandler = () => {
        editTask(
          {
            id: "1",
            userId: "123",
            timestamp: 123456,
            title: "Updated Task",
            completed: true,
          },
          "2"
        );
      };

      return (
        <div>
          <span data-testid="task-count">{allTasks.length}</span>
          <button onClick={addTaskHandler}>Add Task</button>
          <button onClick={editTaskHandler}>Edit Task</button>
        </div>
      );
    };

    render(
      <TaskProvider>
        <TestComponent />
      </TaskProvider>
    );

    fireEvent.click(screen.getByText("Add Task"));

    expect(screen.getByTestId("task-count")).toHaveTextContent("1");

    fireEvent.click(screen.getByText("Edit Task"));

    expect(screen.getByTestId("task-count")).toHaveTextContent("1");

    expect(
      require("../../utils/utils").saveToLocalStorage
    ).toHaveBeenCalledWith("tasks", [
      {
        id: "1",
        userId: "123",
        timestamp: 123456,
        title: "Test Task",
        completed: false,
      },
    ]);
  });
});

const TestComponent = () => {
  const { allTasks, addTask } = useTask();
  return (
    <div>
      <span data-testid="task-count">{allTasks.length}</span>
      <button
        onClick={() =>
          addTask({
            id: "1",
            userId: "123",
            timestamp: Date.now(),
            title: "Test Task",
            completed: false,
          })
        }
      >
        Add Task
      </button>
    </div>
  );
};
