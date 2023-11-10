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
      importance: Math.random() < 0.5 // Randomize the importance
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
    const task = taskList.find(t => t.id === id)
    const changedTask = {...task, importance : !task.importance}
  
    axios
      .put(url,changedTask).then(response =>
        setTaskList(taskList.map(t => t.id !== id ? t : response.data)))
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
          key ={task.id}
          task = {task}
          toggleImportance={() => toggleImportanceOf(task.id)}
          />
        ))}
      </ul>
    </div>
  );
}

export default App;
