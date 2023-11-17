import "./AddTaskButton.css";

type AddTaskButtonProps = {
  callback: (n: boolean) => void;
  title: string;
};

const AddTaskButton = ({ callback, title }: AddTaskButtonProps) => {
  return (
    <button className="add-task-button" onClick={() => callback(true)}>
      <span className="bi bi-plus add-task-icon" />
      {title}
    </button>
  );
};

export default AddTaskButton;
