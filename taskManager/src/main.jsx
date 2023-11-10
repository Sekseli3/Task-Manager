import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import axios from 'axios'
import './index.css'

axios
.get('http://localhost:3001/tasks')
.then(response => {
  console.log(response)
})
ReactDOM.createRoot(document.getElementById('root')).render(

    <App />
 
)
