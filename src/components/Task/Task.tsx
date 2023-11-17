import { useState } from "react";
import { Description, Radio } from "..";
import { useTask } from "../../context/Task/TaskContext";
import { Task as TaskTypes } from "../../context/ContextTypes";
import "./Task.css";
import AddTaskWindow from "../AddTask/AddTaskWindow/AddTaskWindow";

const Task = ({
  id,
  userId,
  timestamp,
  title,
  description,
  completed,
}: TaskTypes) => {
  const { removeTask, editTask } = useTask();
  const [openEdit, setOpenEdit] = useState<boolean>(false);

  const radioHandler = () => {
    editTask(
      {
        id,
        userId,
        timestamp,
        title,
        description,
        completed: !completed,
      },
      id
    );
  };

  return !openEdit ? (
    <div className="task-container bottom-border">
      <Radio callback={radioHandler} selected={completed} />
      <Description
        title={title}
        description={description}
        selected={completed}
        shortLength={80}
      />
      {!completed && (
        <div className="task-icon-container">
          <span
            className="bi bi-pencil-square icon task-icon edit-icon"
            onClick={() => setOpenEdit(true)}
          />
          <span
            className="bi bi-trash icon task-icon remove-icon"
            onClick={() => removeTask(id)}
          />
        </div>
      )}
    </div>
  ) : (
    <AddTaskWindow
      closeCallback={setOpenEdit}
      closeTitle="Cancel"
      addTitle="Edit Task"
      editOptions={{
        id,
        userId,
        timestamp,
        title,
        description,
        completed,
      }}
    />
  );
};

export default Task;
