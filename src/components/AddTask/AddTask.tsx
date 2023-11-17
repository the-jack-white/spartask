import { useState } from "react";
import AddTaskButton from "./AddTaskButton/AddTaskButton";
import AddTaskWindow from "./AddTaskWindow/AddTaskWindow";

const AddTask = () => {
  const [taskWindowOpen, setTaskWindowOpen] = useState<boolean>(false);

  return !taskWindowOpen ? (
    <AddTaskButton callback={setTaskWindowOpen} title="Add Task" />
  ) : (
    <AddTaskWindow
      closeCallback={setTaskWindowOpen}
      closeTitle="Cancel"
      addTitle="Add Task"
    />
  );
};

export default AddTask;
