import { Task } from "../context/TaskTypes";

export const shortString = (string: string, length: number) => {
  return string.length > length ? string.slice(0, length - 1) + "..." : string;
};

export const saveToLocalStorage = (storageId: string, tasks: Task[]) => {
  localStorage.setItem(storageId, JSON.stringify(tasks));
};

export const retrieveLocalStorage = (storageId: string) => {
  const jsonString = localStorage.getItem(storageId);

  return jsonString ? JSON.parse(jsonString) : [];
};
