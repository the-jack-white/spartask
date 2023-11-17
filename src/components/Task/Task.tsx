import { Description, Radio } from "..";
import { useTask } from "../../context/Task/TaskContext";
import { Task as TaskTypes } from "../../context/TaskTypes";
import "./Task.css";

const Task = ({ id, timestamp, title, description, completed }: TaskTypes) => {
  const { removeTask, editTask } = useTask();
  const radioHandler = () => {
    editTask(
      {
        id,
        timestamp,
        title,
        description,
        completed: !completed,
      },
      id
    );
  };

  return (
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
            className="bi bi-trash icon task-icon"
            onClick={() => removeTask(id)}
          />
        </div>
      )}
    </div>
  );
};

export default Task;
