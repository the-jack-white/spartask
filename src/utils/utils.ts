import { Task, User } from "../context/ContextTypes";

export const shortString = (string: string, length: number) => {
  return string.length > length ? string.slice(0, length - 1) + "..." : string;
};

export const saveToLocalStorage = (
  storageId: string,
  tasks: Task[] | User | null
) => {
  localStorage.setItem(storageId, JSON.stringify(tasks));
};

export const retrieveLocalStorage = (storageId: string, isArray: boolean) => {
  const jsonString = localStorage.getItem(storageId);

  return jsonString ? JSON.parse(jsonString) : isArray ? [] : null;
};
