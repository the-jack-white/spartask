export type Task = {
  id: string;
  timestamp: number;
  title: string;
  description?: string;
  completed: boolean;
};

export type TaskContextType = {
  allTasks: Task[];
  setAllTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  addTask: (task: Task) => void;
  removeTask: (id: string) => void;
  editTask: (task: Task, id: string) => void;
};
