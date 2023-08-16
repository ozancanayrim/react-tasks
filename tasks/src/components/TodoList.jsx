import React from "react";
import { rocketIcon } from "./RocketIcon";

const TodoList = ({
  taskObject,
  deleteFunction,
  editFunction,
  doneFunction,
}) => {
  const handleDeleteClick = () => {
    deleteFunction(taskObject.id);
  };

  const handleEditClick = () => {
    editFunction(taskObject.id);
  };

  const handleDoneClick = () => {
    doneFunction(taskObject.id);
  };

  return (
    <li
      className={`${
        taskObject.isDone ? "bg-success bg-opacity-75" : "bg-light"
      } list-group-item m-2 d-flex justify-content-between align-items-center`}
    >
      <div className="content-group">
        {taskObject.priority ? rocketIcon : ""}
        <span className="text-break ms-2">{taskObject.task}</span>
      </div>

      <div className="btn-group ms-4">
        <button
          onClick={handleDoneClick}
          className={`btn btn-sm ms-2 text-white done-button ${
            taskObject.isDone ? "bg-dark" : "bg-success"
          }`}
        >
          Done
        </button>
        <button
          onClick={handleEditClick}
          className="btn btn-sm text-white bg-warning ms-2 edit-button"
        >
          Edit
        </button>
        <button
          onClick={handleDeleteClick}
          className="btn btn-sm text-white bg-danger ms-2 delete-button"
        >
          Delete
        </button>
      </div>
    </li>
  );
};

export default TodoList;
