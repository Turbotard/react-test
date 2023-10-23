import React, { useState, useEffect } from 'react';
import './App.css';

interface Task {
  task: string;
  time: string;
}

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState<string>('');
  const [newTime, setNewTime] = useState<string>('');

  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleNewTaskChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTask(event.target.value);
  };

  const handleNewTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTime(event.target.value);
  };

  const handleNewTaskSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setTasks([...tasks, { task: newTask, time: newTime }]);
    setNewTask('');
    setNewTime('');
  };

  const handleTaskDelete = (index: number) => {
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>To-Do List</h1>
        <form onSubmit={handleNewTaskSubmit}>
          <label>
            Task:
            <input type="text" value={newTask} onChange={handleNewTaskChange} className="input" />
          </label>
          <label>
            Time:
            <input type="text" value={newTime} onChange={handleNewTimeChange} className="input" />
          </label>
          <button type="submit" className="button add-button">Add Task</button>
        </form>
        <h2>Tasks:</h2>
        <ul>
          {tasks.map((task, index) => (
            <li key={index}>
              <strong>{task.time}:</strong> {task.task}
              <button onClick={() => handleTaskDelete(index)} className="button delete-button">Delete</button>
            </li>
          ))}
        </ul>
      </header>
    </div>
  );
}

export default App;