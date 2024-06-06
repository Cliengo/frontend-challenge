import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Button,
  Container,
  FormControl,
  Stack,
  TextField,
} from '@mui/material';
import { editTask, getTask, postTask } from '../services/tasks';
import { Todo } from '../types/todo';

function TaskForm() {
  const { id } = useParams();
  const [task, setTask] = useState<Todo>({ title: '', description: '' });
  const navigate = useNavigate();

  useEffect(() => {
    if (id !== 'new') {
      const fetchData = async () => {
        const data = await getTask(String(id));
        setTask({ title: data.title, description: data.title });
      };
      fetchData();
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (id === 'new') {
      await postTask(task);
      navigate('/');
    } else {
      await editTask(String(id), task);
      navigate('/');
    }
  };
  return (
    <Container maxWidth="sm" className="pt-5 mb-5">
      <Stack
        direction="column"
        alignItems="center"
        justifyContent="center"
        gap={4}
      >
        <h1 className="text-3xl font-bold  font-montserrat uppercase">
          {id === 'new' ? 'Add New Task' : 'Edit Task'}
        </h1>
        <form className="w-full" onSubmit={handleSubmit}>
          <Stack direction="column" gap={2}>
            <FormControl className="w-full">
              <TextField
                id="title"
                label="Title"
                variant="outlined"
                name="Title"
                value={task.title}
                className="bg-white"
                onChange={(e) => setTask({ ...task, title: e.target.value })}
              />
            </FormControl>

            <TextField
              id="description"
              label="Description"
              variant="outlined"
              name="Description"
              value={task.description}
              className="bg-white"
              onChange={(e) =>
                setTask({ ...task, description: e.target.value })
              }
            />

            <Button variant="contained" color="success" type="submit">
              {id === 'new' ? 'Add Task' : 'Update Task'}
            </Button>
          </Stack>
        </form>
      </Stack>
    </Container>
  );
}

export default TaskForm;
