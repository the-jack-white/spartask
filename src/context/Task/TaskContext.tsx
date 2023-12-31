import { ReactNode, createContext, useContext, useState } from "react";
import { Task, TaskContextType } from "../ContextTypes";
import { saveToLocalStorage } from "../../utils/utils";

const taskContextDefaultValues: TaskContextType = {
  allTasks: [],
  setAllTasks: () => {},
  addTask: () => {},
  removeTask: () => {},
  editTask: () => {},
};

const TaskContext = createContext<TaskContextType>(taskContextDefaultValues);

export const useTask = () => {
  return useContext(TaskContext);
};

export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const [allTasks, setAllTasks] = useState<Task[]>([]);

  const addTask = (task: Task) => {
    setAllTasks((prev) => {
      const newTaskState = [...prev, task];
      saveToLocalStorage("tasks", newTaskState);

      return newTaskState;
    });
  };

  const removeTask = (id: string) => {
    const filtered = allTasks.filter((task) => task.id !== id);
    saveToLocalStorage("tasks", filtered);
    setAllTasks(filtered);
  };

  const editTask = (task: Task, id: string) => {
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

  const value = {
    allTasks,
    setAllTasks,
    addTask,
    removeTask,
    editTask,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};
