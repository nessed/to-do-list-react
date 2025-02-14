import React, { useState } from "react";

function ToDoList() {
  const [tasks, setTasks] = useState([]); //initial values of the array
  const [newTask, setNewTask] = useState("");

  function handleInputChange(event) {
    setNewTask(event.target.value); //it's job is to update the task array by taking in the events and setting it as such when the button is pressed final value is set
    console.log(event.target.value);
  }

  function addTask() {
    console.log(tasks);

    if (newTask.trim() !== "")
      //it goes thru the newTask if theres any white space it will remove them for example " Get milk ", if  after trimming the value of newtask is not blank then it will process
      setTasks((t) => [...tasks, newTask]); //this creates a new array in tasks reintialized here because otherwise react
    //wont understand it unless everything is re rendered, t refers to last value of tasks, ...tasks is the spread operator which takes all the values of tasks and adds it to the new array, newTask is the new value that is added to the array
    setNewTask(""); //makes it so that it is cleared everytime the button is pressed
    console.log(tasks);
  }

  function deleteTask(index) {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  }

  function moveTaskUp(index) {
    if (index > 0) {
      const updatedTasks = [...tasks]; // Create a copy of tasks
      [updatedTasks[index], updatedTasks[index - 1]] = [updatedTasks[index - 1], updatedTasks[index]]; // Swap values
      setTasks(updatedTasks); // Update state
    }
  }

  function moveTaskDown(index) {
    if (index < tasks.length - 1) {
      const updatedTasks = [...tasks]; // Copy the array
      [updatedTasks[index], updatedTasks[index + 1]] = [updatedTasks[index + 1], updatedTasks[index]]; // Swap
      setTasks(updatedTasks); // Update state
    }
  }
  

  return (
    <div className="to-do-list">
      <h1>To-Do List</h1>

      <div>
        <input
          type="text"
          placeholder="Enter a task..."
          value={newTask} //value of input is newTask from useState
          onChange={handleInputChange} //onchange take in the events and store them into handleInputChange
        />
        <button
          className="add-button" //add button class
          onClick={addTask} //when clicked, the addTask function is called which updates the task array, this ensures that only final value of input to last letter is stored in the array
        >
          Add
        </button>
      </div>
      <ol>
        {tasks.map(
          (
            task,
            index //loops through the task array by map, goes 1 by 1 and returns the index
          ) => (
            <li key={index}>
              <span>{task}</span>
              <button
                className="delete-button"
                onClick={() => deleteTask(index)} //deletes the task at the certain index  have to do it as an arrow function otherwise it will call everytime component is rendered
              >
                Delete
              </button>
              <button
                className="move-button"
                onClick={() => moveTaskUp(index)} //deletes the task at the certain index  have to do it as an arrow function otherwise it will call everytime component is rendered
              >
                👆
              </button>
              <button
                className="move-button"
                onClick={() => moveTaskDown(index)} //deletes the task at the certain index  have to do it as an arrow function otherwise it will call everytime component is rendered
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
