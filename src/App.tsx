import { useEffect } from "react";
import { useCookies } from "react-cookie";

import {
  AddTask,
  AppContainer,
  AuthContainer,
  AuthForm,
  Header,
  Heading,
  Task,
} from "./components";
import { useAuth, useTask } from "./context";
import { retrieveLocalStorage } from "./utils";

import "./App.css";

function App() {
  const { currentUser, setCurrentUser } = useAuth();
  const { allTasks, setAllTasks } = useTask();

  const [cookies] = useCookies(["isAuthenticated"]);

  useEffect(() => {
    setAllTasks(retrieveLocalStorage("tasks", true));
    setCurrentUser(retrieveLocalStorage("user", false));
  }, []);

  return cookies.isAuthenticated && currentUser ? (
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
