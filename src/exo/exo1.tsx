import React, { useState, useEffect } from 'react';
import '../App.css';

interface Task {
  id: string;
  task: string;
  time: string;
  done: boolean;
}

function Exo1() {
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
    const newTaskId = Date.now().toString();
    setTasks([...tasks, { id: newTaskId, task: newTask, time: newTime, done: false }]);
    setNewTask('');
    setNewTime('');
  };

  const handleTaskDelete = (id: string) => {
    const newTasks = tasks.filter(task => task.id !== id);
    setTasks(newTasks);
  };

  const handleTaskDone = (id: string) => {
    const newTasks = [...tasks];
    const taskIndex = newTasks.findIndex(task => task.id === id);
    newTasks[taskIndex].done = !newTasks[taskIndex].done;
    setTasks(newTasks);
  };

  const notDoneTasks = tasks.filter(task => !task.done);
  const doneTasks = tasks.filter(task => task.done);

  return (
    <div className="App">
      <header className="App-header">
        <h1>To-Do List</h1>
        <form onSubmit={handleNewTaskSubmit} className="add-task-form">
          <label>
            Task:
            <input type="text" value={newTask} onChange={handleNewTaskChange} className="add-task-input" />
          </label>
          <label>
            Time:
            <input type="text" value={newTime} onChange={handleNewTimeChange} className="add-task-input" />
          </label>
          <button type="submit" className="add-task-button">Add Task</button>
        </form>
        <h2>Not Done:</h2>
        <ul>
          {notDoneTasks.map(task => (
            <li key={task.id}>
              <input type="checkbox" checked={task.done} onChange={() => handleTaskDone(task.id)} />
              <strong>{task.time}:</strong> {task.task}
              <button onClick={() => handleTaskDelete(task.id)} className="delete-button">Delete</button>
            </li>
          ))}
        </ul>
        <h2>Done:</h2>
        <ul>
          {doneTasks.map(task => (
            <li key={task.id}>
              <input type="checkbox" checked={task.done} onChange={() => handleTaskDone(task.id)} />
              <strong>{task.time}:</strong> {task.task}
              <button onClick={() => handleTaskDelete(task.id)} className="delete-button">Delete</button>
            </li>
          ))}
        </ul>
      </header>
    </div>
  );
}

export default Exo1;