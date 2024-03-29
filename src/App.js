import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import './style.css';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
let counter=1;
const TaskList = () => {

  const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem('tasks')) || []);
 
  const [filter,setFilter] = useState("all")
  const [newTask, setNewTask] = useState('');

  useEffect(() => {

    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(storedTasks);
  }, []);

  useEffect(() => {
    
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
    counter += 1;
    const todo_item = {
      id: counter,
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

  // const filteredTasks = tasks.filter((task) => {
  //   if (filter === 'completed') {
  //     return task.completed;
  //   } else if (filter === 'incomplete') {
  //     return !task.completed;
  //   } else {
  //     return true;
  //   }
  // });
  const filteredTasks=tasks.filter( (filteritem) =>{
    
    if(filter === "all")
    return true;

return filteritem.completed === filter
  })

  const handleDragEnd = (result) => {
    console.log(result);
    if (!result.destination) {
      return;
    }

    const reorderedTasks = Array.from(tasks);
    const [movedTask] = reorderedTasks.splice(result.source.index, 1);
    reorderedTasks.splice(result.destination.index, 0, movedTask);

    setTasks(reorderedTasks);
  };
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
<DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="tasks">
          {(provided) => (
  <ul className="todo_item-list"  {...provided.droppableProps}
              ref={provided.innerRef}>
  {filteredTasks.map((todo_item,index) => (
     <Draggable key={todo_item.id} draggableId={todo_item.id.toString()} index={index}>
     {(provided) => (
        <li ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps} key={todo_item.id} className={todo_item.completed ? 'completed' : 'incomplete'}>
              <input  type="checkbox" checked={todo_item.completed}  onChange={() => toggleCompleted(todo_item.id)}  />

  <span className="task_name">{todo_item.name}</span>
  <span className="add_date">{`Added on - ${todo_item.dateAdded}`}</span>
  <span className="delete">
  <a href="#!" onClick={() => deleteTask(todo_item.id)}>
    <FontAwesomeIcon icon={faTrashAlt} />
  </a>
  </span>
  </li>
     )}
     </Draggable>
  ))}
   {provided.placeholder}
  </ul>
          )}
          </Droppable>
      </DragDropContext>
  </div>
  
  <div className="summary" >{ tasks.length } items</div>
  
  </div>
  );
};

export default TaskList;
