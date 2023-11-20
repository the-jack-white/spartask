export type Task = {
  id: string;
  userId: string;
  timestamp: number;
  editTimestamp?: number;
  title: string;
  description?: string;
  completed: boolean;
};

export type User = {
  id: string;
  createdAt: number;
  email: string;
  token: string;
};

export type TaskContextType = {
  allTasks: Task[];
  setAllTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  addTask: (task: Task) => void;
  removeTask: (id: string) => void;
  editTask: (task: Task, id: string) => void;
};

export type AuthContextType = {
  currentUser: User | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>;
  login: (email: string, password: string) => void;
  logout: () => void;
};

export type ValidateFakeRequest = {
  token: string;
  isAuthenticated: boolean;
};
