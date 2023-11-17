import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useTask } from "../../../context/Task/TaskContext";
import { useAuth } from "../../../context/Auth/AuthContext";
import "./AddTaskWindow.css";

type AddTaskWindowProps = {
  closeCallback: (n: boolean) => void;
  closeTitle: string;
  addTitle: string;
};

const AddTaskWindow = ({
  closeCallback,
  closeTitle,
  addTitle,
}: AddTaskWindowProps) => {
  const { addTask } = useTask();
  const { currentUser } = useAuth();
  const [title, setTitle] = useState<string>("");
  const [desc, setDesc] = useState<string>("");

  const addTaskHandler = () => {
    console.log("ADD Task.....");
    if (currentUser) {
      const task = {
        id: uuidv4(),
        userId: currentUser.id,
        timestamp: Date.now(),
        title,
        description: desc,
        completed: false,
      };

      addTask(task);
      closeCallback(false);
    }
  };

  return (
    <div className="add-task-window">
      <input
        type="text"
        className="add-task-input text-lg"
        placeholder="Task Name"
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        className="add-task-input text-md"
        placeholder="Description"
        onChange={(e) => setDesc(e.target.value)}
      />
      <div className="add-task-button-container">
        <button
          className="add-task-action-btn"
          onClick={() => closeCallback(false)}
        >
          {closeTitle}
        </button>
        <button
          className="add-task-action-btn btn-selected"
          disabled={title.length <= 0}
          onClick={addTaskHandler}
        >
          {addTitle}
        </button>
      </div>
    </div>
  );
};

export default AddTaskWindow;
