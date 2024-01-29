import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import './style.css';
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";



const TaskList = () => {

  const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem('tasks')) || []);
 
  const [filter,setFilter] = useState("all")
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    // Load tasks from localStorage on component mount
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(storedTasks);
  }, []);

  useEffect(() => {
    // Save tasks to localStorage whenever tasks state changes
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);
  useEffect(()=> {

  })

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

    
  const handleDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
  
    const reorderedTasks = Array.from(tasks);
    const [movedTask] = reorderedTasks.splice(result.source.index, 1);
    reorderedTasks.splice(result.destination.index, 0, movedTask);
  
    setTasks(reorderedTasks);
  };

  // const filteredTasks = tasks.filter((task) => {
  //   if (filter === 'completed') {
  //     return task.completed;
  //   } else if (filter === 'incomplete') {
  //     return !task.completed;
  //   } else {
  //     return true;
  //   }
  // });

  return (
  <div className="tasklist">
  <h1>Task Tracker</h1>

  <div className="addtask">
  Task name <input type="text" placeholder="Add new Task" value={newTask} onChange={(e) => setNewTask(e.target.value)}  />
  <button onClick={addTask}>Add</button>
  </div>


<div className="filter-buttons">
      <ul> 
        <li onClick={() => setFilter('all')}>All</li>
        <li onClick={() => setFilter(true)}>Completed</li>
        <li onClick={() => setFilter(false)}>Incomplete</li>
      </ul>
  </div>

<div>
  <ul className="todo_item-list">
  {tasks.filter( (filteritem) =>{
    
    if(filter === "all")
    return true;

return filteritem.completed === filter
  }).map((todo_item) => (
        <li key={todo_item.id} className={todo_item.completed ? 'completed' : 'incomplete'}>
              <input  type="checkbox" checked={todo_item.completed}  onChange={() => toggleCompleted(todo_item.id)}  />

  <span className="task_name">{todo_item.name}</span>
  <span className="add_date">{`Added on - ${todo_item.dateAdded}`}</span>
  <span className="delete">
  <a href="#!" onClick={() => deleteTask(todo_item.id)}>
    <FontAwesomeIcon icon={faTrashAlt} />
  </a>
  </span>
  </li>
  ))}
  </ul>
  </div>
      <DragDropContext onDragEnd={ handleDragEnd}>
        <Droppable droppableId="droppable">
          {(provided) => (
            <ul ref={provided.innerRef} {...provided.droppableProps}>
              {tasks.map((task, index) => (
                <Draggable key={task.id} draggableId={task.id} index={index}>
                  {(provided) => (
                    <li
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      {task.content}
                    </li>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
  <div className="summary" >{ tasks.length } items</div>
  </div>
  
  

  
    
  
    
  
  );

};

export default TaskList;
