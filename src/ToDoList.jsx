import React, { useState, useEffect } from "react";

function ToDoList() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [completedTasks, setCompletedTasks] = useState(() => {
    const savedCompleted = localStorage.getItem('completedTasks');
    return savedCompleted ? JSON.parse(savedCompleted) : [];
  });
  const [newTask, setNewTask] = useState("");

  // Save tasks and completed tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    localStorage.setItem('completedTasks', JSON.stringify(completedTasks));
  }, [tasks, completedTasks]);

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
    const taskToComplete = tasks[index];
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
    setCompletedTasks([...completedTasks, taskToComplete]);
  }

  function permanentlyDeleteTask(index) {
    const updatedCompletedTasks = completedTasks.filter((_, i) => i !== index);
    setCompletedTasks(updatedCompletedTasks);
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
                Complete
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

      <h2>Completed Tasks</h2>
      <ul style={{color: 'green'}}>
        {completedTasks.map(
          (
            task,
            index
          ) => (
            <li key={index}>
              <span>{task}</span>
              <button
                className="delete-button"
                onClick={() => permanentlyDeleteTask(index)}
              >
                Delete Permanently
              </button>
            </li>
          )
        )}
      </ul>
    </div>
  );
}
export default ToDoList;





