import { useEffect } from "react";
import {
  AddTask,
  AppContainer,
  AuthContainer,
  AuthForm,
  Header,
  Heading,
  Task,
} from "./components";
import { useTask } from "./context/Task/TaskContext";
import { useAuth } from "./context/Auth/AuthContext";
import { retrieveLocalStorage } from "./utils/utils";
import "./App.css";

function App() {
  const { currentUser, setCurrentUser } = useAuth();
  const { allTasks, setAllTasks } = useTask();

  useEffect(() => {
    setAllTasks(retrieveLocalStorage("tasks"));
    setCurrentUser(retrieveLocalStorage("user"));
  }, []);

  console.log("CUrrent USer: ", currentUser);

  return currentUser ? (
    <div className="main-container">
      <Header />
      <AppContainer>
        <Heading title="Today" date={new Date(Date.now()).toDateString()} />
        {allTasks &&
          allTasks
            .filter((filterT) => filterT.userId === currentUser.id)
            .map((task) => (
              <Task
                key={task.id}
                id={task.id}
                userId={currentUser.id}
                timestamp={task.timestamp}
                title={task.title}
                description={task.description}
                completed={task.completed}
              />
            ))}
        <AddTask />
      </AppContainer>
    </div>
  ) : (
    <AuthContainer>
      <AuthForm />
    </AuthContainer>
  );
}

export default App;
