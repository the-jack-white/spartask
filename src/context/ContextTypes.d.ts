export type Task = {
  id: string;
  userId: string;
  timestamp: number;
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
  doneTasks: Task[];
  setAllTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  setDoneTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  addTask: (task: Task) => void;
  removeTask: (id: string) => void;
  editTask: (task: Task, id: string) => void;
  markAsDone: (status: boolean, id: string) => void;
};

export type AuthContextType = {
  currentUser: User | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>;
  login: (email: string, password: string) => void;
  logout: () => void;
};
