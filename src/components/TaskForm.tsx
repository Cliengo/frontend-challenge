import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Button,
  Container,
  FormControl,
  Stack,
  TextField,
} from '@mui/material';

function TaskForm() {
  const { id } = useParams();
  const [task, setTask] = useState({ title: '', description: '' });
  const navigate = useNavigate();

  useEffect(() => {
    if (id !== 'new') {
      axios
        .get(`https://jsonplaceholder.typicode.com/todos/${id}`)
        .then((response) => {
          setTask({
            title: response.data.title,
            description: response.data.title,
          });
        });
    }
  }, [id]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (id === 'new') {
      axios
        .post('https://jsonplaceholder.typicode.com/todos', task)
        .then(() => {
          navigate('/');
        });
    } else {
      axios
        .put(`https://jsonplaceholder.typicode.com/todos/${id}`, task)
        .then(() => {
          navigate('/');
        });
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
                value={task.title}
                className="bg-white"
                onChange={(e) => setTask({ ...task, title: e.target.value })}
              />
            </FormControl>

            <TextField
              id="description"
              label="Description"
              variant="outlined"
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
