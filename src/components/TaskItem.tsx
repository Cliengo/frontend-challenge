import React from 'react';
import { Link } from 'react-router-dom';
import { Todo } from '../types/todo';
import { Button, Stack } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

type Props = {
  task: Todo;
  deleteTask: (id: string) => void;
};

function TaskItem({ task, deleteTask }: Props) {
  const { id, title } = task;
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      gap={2}
      className="border p-2 rounded-md bg-white"
    >
      <div className="font-montserrat flex-1 text-left">{title}</div>
      <Stack direction="row" spacing={1}>
        <Button variant="contained">
          <Link className="text-md" to={`/edit/${id}`}>
            Edit
          </Link>
        </Button>
        <Button
          variant="contained"
          color="error"
          aria-label={`Delete task ${id}`}
          onClick={() => deleteTask(id as string)}
        >
          <DeleteIcon fontSize="medium" />
        </Button>
      </Stack>
    </Stack>
  );
}

export default TaskItem;
