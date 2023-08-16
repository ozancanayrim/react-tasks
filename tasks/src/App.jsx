import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { v4 as uuidv4 } from "uuid";
import TodoList from "./components/TodoList";
import FilterButton from "./components/FilterButton";
import "./App.css";

function App() {
  const [form, setForm] = useState({ id: "", task: "", priority: false });
  const [tasks, setTasks] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [editedTaskIndex, setEditedTaskIndex] = useState(null);
  const [editTaskId, setEditTaskId] = useState("");
  const [checkPriority, setCheckPriority] = useState(false);
  const [filteredTasks, setFilteredTasks] = useState([]);

  // Input change
  const inputChange = (e) => {
    const { name, value, checked, type } = e.target;

    // Set form
    setForm({
      ...form,
      id: isEdit ? editTaskId : uuidv4(),
      isDone: false,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  //Form submit
  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (isEdit) {
      const editedNewTasks = tasks;

      editedNewTasks[editedTaskIndex] = form;
      setIsEdit(false);
    } else {
      setTasks([...tasks, form]);
    }

    setForm({ task: "", isDone: false, priority: false });
  };

  // Delete tasks
  const handleDeleteTasks = (id) => {
    const afterDeleteTasks = tasks.filter((task) => id !== task.id);
    setTasks(afterDeleteTasks);
  };

  // Edit tasks
  const handleEditTasks = (id) => {
    setIsEdit(true);
    const editedTask = tasks.findIndex((task) => task.id === id);
    const findTask = tasks.find((task) => task.id === id);
    setEditTaskId(id);
    setEditedTaskIndex(editedTask);
    setForm(findTask);
  };

  // Done tasks
  const doneTasks = (id) => {
    const newDoneTasks = [...tasks];
    const doneTaskIndex = newDoneTasks.findIndex((task) => task.id === id);
    newDoneTasks[doneTaskIndex].isDone = !newDoneTasks[doneTaskIndex].isDone;

    setTasks(newDoneTasks);
  };

  // Filter Priority Check Tasks
  const handleFilterTasksCheck = () => {
    setCheckPriority(!checkPriority);
  };

  // Filtered Tasks - Useeffect
  useEffect(() => {
    if (checkPriority) {
      const filteredPriorityTasks = tasks.filter((task) => task.priority);
      setFilteredTasks(filteredPriorityTasks);
    } else {
      setFilteredTasks(tasks);
    }
  }, [checkPriority, tasks]);

  // Get tasks from localstorage
  useEffect(() => {
    const getLocalStorageTasks = JSON.parse(localStorage.getItem("tasks"));

    if (getLocalStorageTasks) {
      setTasks(getLocalStorageTasks);
    }
  }, []);

  // Set tasks to localstorage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify([...tasks]));
  }, [tasks, handleFormSubmit, handleDeleteTasks, handleEditTasks, doneTasks]);

  return (
    <div className="container">
      <h1 className="d-flex justify-content-center text-success">
        Focus on Your Tasks
      </h1>
      <div className="row d-flex justify-content-center">
        <div className="col-sm-6 mt-5">
          <div className="d-flex justify-content-end">
            {tasks.length > 0 ? (
              <FilterButton handleFilterTasksCheck={handleFilterTasksCheck} />
            ) : (
              ""
            )}
          </div>
          {filteredTasks.map((task) => {
            return (
              <ul key={uuidv4()} className="list-group">
                <TodoList
                  taskObject={task}
                  deleteFunction={handleDeleteTasks}
                  editFunction={handleEditTasks}
                  doneFunction={doneTasks}
                />
              </ul>
            );
          })}
        </div>
      </div>
      <div className="row d-flex justify-content-center">
        <div className="col-sm-5 mt-5">
          <form
            onSubmit={handleFormSubmit}
            className="d-flex justify-content-center flex-column"
          >
            <label className="fw-medium fst-italic" htmlFor="taskName">
              Task
            </label>
            <input
              onChange={inputChange}
              name="task"
              type="text"
              value={form.task}
              className="form-control mt-3 bg-light"
              id="taskName"
              placeholder="Enter a task"
            />
            <div className="mt-4 mb-3">
              <input
                onChange={inputChange}
                name="priority"
                type="checkbox"
                checked={form.priority}
                id="priority"
              />
              <label className="ms-2 fw-medium fst-italic" htmlFor="priority">
                Priority
              </label>
            </div>

            <button
              style={{ width: "70px" }}
              className="btn btn-sm btn-primary mb-3 mt-3"
              type="submit"
              onClick={handleFormSubmit}
            >
              Add
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
