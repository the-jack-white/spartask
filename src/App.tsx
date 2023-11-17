import { useEffect } from "react";

import { AddTask, AppContainer, Heading, Task } from "./components";
import { useTask } from "./context/Task/TaskContext";
import "./App.css";
import { retrieveLocalStorage } from "./utils/utils";

function App() {
  const { allTasks, setAllTasks } = useTask();

  useEffect(() => {
    setAllTasks(retrieveLocalStorage("tasks"));
  }, []);

  return (
    <AppContainer>
      <Heading title="Today" date={new Date(Date.now()).toDateString()} />
      {allTasks.map((task) => (
        <Task
          key={task.id}
          id={task.id}
          timestamp={task.timestamp}
          title={task.title}
          description={task.description}
          completed={task.completed}
        />
      ))}
      <AddTask />
    </AppContainer>
  );
}

export default App;
