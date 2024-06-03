import React from 'react';
import { Link } from 'react-router-dom';

function TaskItem({ task, deleteTask }) {
  return (
    <li>
      <span>{task.title}</span>
      <Link to={`/edit/${task.id}`}>Edit</Link>
      <button onClick={() => deleteTask(task.id)}>Delete</button>
    </li>
  );
}

export default TaskItem;