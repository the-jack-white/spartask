import { ReactNode, createContext, useContext, useState } from "react";
import { Task, TaskContextType } from "../ContextTypes";
import { saveToLocalStorage } from "../../utils/utils";

const taskContextDefaultValues: TaskContextType = {
  allTasks: [],
  doneTasks: [],
  setAllTasks: () => {},
  setDoneTasks: () => {},
  addTask: () => {},
  removeTask: () => {},
  editTask: () => {},
  markAsDone: () => {},
};

const TaskContext = createContext<TaskContextType>(taskContextDefaultValues);

export const useTask = () => {
  return useContext(TaskContext);
};

export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const [allTasks, setAllTasks] = useState<Task[]>([]);
  const [doneTasks, setDoneTasks] = useState<Task[]>([]);

  const addTask = (task: Task) => {
    console.log("[INFO] - Add Task: ", task);
    setAllTasks((prev) => {
      const newTaskState = [...prev, task];
      saveToLocalStorage("tasks", newTaskState);

      return newTaskState;
    });
  };

  const removeTask = (id: string) => {
    console.log("[INFO] - Remove Task ID: ", id);
    const filtered = allTasks.filter((task) => task.id !== id);
    saveToLocalStorage("tasks", filtered);
    setAllTasks(filtered);
  };

  const editTask = (task: Task, id: string) => {
    console.log("[INFO] - Edit Task: ", { task, id });

    const mappedTasks = allTasks.map((obj) => {
      if (obj.id === id) {
        return task;
      } else {
        return obj;
      }
    });

    saveToLocalStorage("tasks", mappedTasks);
    setAllTasks(mappedTasks);
    console.log("Mapped: ", mappedTasks);
  };

  const markAsDone = (status: boolean, id: string) => {
    console.log("[INFO] - Mark ID as Done: ", id);
    const filtered = allTasks
      .filter((task) => task.id === id)
      .map((filteredTask) => {
        return {
          ...filteredTask,
          completed: status,
        };
      });
    saveToLocalStorage("done_tasks", filtered);
    setDoneTasks(filtered);
  };

  const value = {
    allTasks,
    doneTasks,
    setAllTasks,
    setDoneTasks,
    addTask,
    removeTask,
    editTask,
    markAsDone,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};
