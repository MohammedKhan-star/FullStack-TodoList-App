import axios from 'axios';
import { useState, useEffect } from 'react';

import './App.css';


const API = "http://127.0.0.1:5000/tasks";
console.log(API)
function App() {
  const [tasks,setTasks] = useState([])
  const [title,setTitle]=useState('')
  
  const fetchTask = async () => {
    const res = await axios.get(API) 
    setTasks(res.data);

  }
  
  useEffect(() => {
    fetchTask();
  
  }, []);


  const addTask = async () => {
    if (title.trim() !== '') {
      await axios.post(API, {text: title });
      setTitle('');
      fetchTask();
  }
}

const toggleTask = async (id, completed) => {
  await axios.put(`${API}/${id}`, { completed: !completed });
  fetchTask();
};

const deleteTask = async (id) => {
  await axios.delete(`${API}/${id}`);
  fetchTask();
};



  return (
    <div className="container" style={{ padding: '20px' }} >
      <h1 class="hero-heading">🚀 Welcome to TaskPro</h1>
      <p class="hero-sub">Your all-in-one smart task manager built with 💻 Flask + React.</p>
      <p >✨ “Plan Smart. Do More.”
        📌 “Your Day, Your Way — Organize with Ease!”
        🚀 “From Idea to Done — Beautifully Simple.”</p>
        <ul class="features-list">
            <li>✅ Add / Delete / Edit Tasks</li>
            <li>🌗 Dark & Light Theme</li>
            <li>📅 Calendar & History Logs</li>
            <li>📊 Task Completion Dashboard</li>
            <li>🔐 JWT Login & User Protection</li>
          </ul>
      <input value={title}  onKeyDown={(e) => { if (e.key === 'Enter') addTask(); }} onChange={(e)=>setTitle(e.target.value)}  placeholder="✍️ Enter your task..."  />
      <button onClick={addTask} >Add</button>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            <input type="checkbox" checked={task.completed} onChange={() => toggleTask(task.id, task.completed)} />
            <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>{task.title}</span>
            <button onClick={() => deleteTask(task.id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  )
}
export default App;