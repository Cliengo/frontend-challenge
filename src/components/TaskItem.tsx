import React from 'react';
import { Link } from 'react-router-dom';
import { Todo } from '../types/todo';

type Props = {
  task: Todo,
  deleteTask: (id: string) => void
}

function TaskItem({ task, deleteTask }: Props) {
  return (
    <li>
      <span>{task.title}</span>
      <Link to={`/edit/${task.id}`}>Edit</Link>
      <button onClick={() => deleteTask(task.id)}>Delete</button>
    </li>
  );
}

export default TaskItem;