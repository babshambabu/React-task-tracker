import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import './style.css';

const TaskList = () => {

  const [tasks, setTasks] = useState([]);


  const [newTask, setNewTask] = useState('');

  const deleteTask = (taskId) => {
    setTasks((tasks) => tasks.filter((todo_item) => todo_item.id !== taskId));
  };

  const addTask = () => {

    if (newTask === '') 
    {
      alert("Please add a task");
      return;
    }

    const todo_item = {
      id: Math.random(),
      name: newTask,
      dateAdded: new Date().toLocaleDateString(),
      completed: false,
    };

    setTasks((tasks) => [...tasks, todo_item]);

    setNewTask('');
  };



  const toggleCompleted = (taskId) => {
    setTasks((tasks) =>
      tasks.map((todo_item) =>
        todo_item.id === taskId ? { ...todo_item, completed: !todo_item.completed } : todo_item
      )
    );
  };

  return (
  <div class="tasklist">
  <h1>Task Tracker</h1>

  <div className="addtask">
  Task name <input type="text" placeholder="Add new Task" value={newTask} onChange={(e) => setNewTask(e.target.value)}  />
  <button onClick={addTask}>Add</button>
  </div>

  <ul className="todo_item-list">
  {tasks.map((todo_item) => (
        <li key={todo_item.id} className={todo_item.completed ? 'completed' : 'todo'}>
              <input  type="checkbox" checked={todo_item.completed}  onChange={() => toggleCompleted(todo_item.id)}  />

  <span class="task_name">{todo_item.name}</span>
  <span class="add_date">{`Added on - ${todo_item.dateAdded}`}</span>
  <span class="delete">
  <a href="#!" onClick={() => deleteTask(todo_item.id)}>
    <FontAwesomeIcon icon={faTrashAlt} />
  </a>
  </span>
  </li>
  ))}
  </ul>
  <div ClasssName="summary" >{ tasks.length } items</div>
  </div>
  );
};

export default TaskList;
