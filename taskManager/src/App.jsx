import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import './index.css'
import Task from './components/Task'

function App() {
  const [task, setTask] = useState("");
  const [taskList, setTaskList] = useState([]); // Use state to manage the task list

  const handlePress = (event) => {
    event.preventDefault();
    if (task.trim() === "") {
      return;
    }

    const newTask = {
      content: task, // The task content
      important: Math.random() < 0.5 // Randomize the importance
    };

    axios
      .post('http://localhost:3001/tasks',newTask)
      .then(response => {
        setTaskList(taskList.concat(response.data))
        setTask("")
        console.log(response)
      })
  }
  const toggleImportanceOf = id => {
    const url = `http://localhost:3001/tasks/${id}`
    const task = taskList.find(t => t._id === id)
    const changedTask = {...task, important : !task.important}
  
    axios
      .put(url,changedTask).then(response =>
        setTaskList(taskList.map(t => t._id !== id ? t : response.data)))
  }
  const deleteTask = id => {
    const url = `http://localhost:3001/tasks/${id}`
    axios
      .delete(url).then(response =>
        setTaskList(taskList.filter(t => t._id !== id)))
  }


  const hook = () => {
    console.log('effect')
    axios
      .get('http://localhost:3001/tasks')
      .then(response => {
        console.log('promise fulfilled')
        setTaskList(response.data)
      })
  }
  useEffect(hook, [])

  return (
    <div>
      <form>
        <input
          type='text'
          placeholder='Task Here'
          value={task}
          onChange={(e) => setTask(e.target.value)} // Update the task state
        />
        <button className='button' onClick={handlePress}>Submit</button>
      </form>
      <p>Tasks:</p>
      <ul>
        {taskList.map((task, index) => (
          <Task 
          key ={task._id}
          task = {task}
          toggleImportance={() => toggleImportanceOf(task._id)}
          deleteTask = {() => deleteTask(task._id)}
          />
        ))}
      </ul>
    </div>
  );
}

export default App;
