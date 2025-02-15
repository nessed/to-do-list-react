import React, { useState, useEffect } from "react";

function ToDoList() {
  const [tasks, setTasks] = useState(() => {
    // Initialize tasks from localStorage or empty array if nothing stored
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [newTask, setNewTask] = useState("");

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  function handleInputChange(event) {
    setNewTask(event.target.value);
    console.log(event.target.value);
  }

  function addTask() {
    console.log(tasks);

    if (newTask.trim() !== "") {
      setTasks((t) => [...tasks, newTask]);
    }
    setNewTask("");
    console.log(tasks);
  }

  function deleteTask(index) {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  }

  function moveTaskUp(index) {
    if (index > 0) {
      const updatedTasks = [...tasks];
      [updatedTasks[index], updatedTasks[index - 1]] = [updatedTasks[index - 1], updatedTasks[index]];
      setTasks(updatedTasks);
    }
  }

  function moveTaskDown(index) {
    if (index < tasks.length - 1) {
      const updatedTasks = [...tasks];
      [updatedTasks[index], updatedTasks[index + 1]] = [updatedTasks[index + 1], updatedTasks[index]];
      setTasks(updatedTasks);
    }
  }
  

  return (
    <div className="to-do-list">
      <h1>To-Do List</h1>

      <div>
        <input
          type="text"
          placeholder="Enter a task..."
          value={newTask}
          onChange={handleInputChange}
        />
        <button
          className="add-button"
          onClick={addTask}
        >
          Add
        </button>
      </div>
      <ol>
        {tasks.map(
          (
            task,
            index
          ) => (
            <li key={index}>
              <span>{task}</span>
              <button
                className="delete-button"
                onClick={() => deleteTask(index)}
              >
                Delete
              </button>
              <button
                className="move-button"
                onClick={() => moveTaskUp(index)}
              >
                👆
              </button>
              <button
                className="move-button"
                onClick={() => moveTaskDown(index)}
              >
                👇
              </button>
            </li>
          )
        )}
      </ol>
    </div>
  );
}
export default ToDoList;
