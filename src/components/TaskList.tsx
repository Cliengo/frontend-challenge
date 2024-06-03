import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import TaskItem from './TaskItem';
import { Todo } from '../types/todo';
import { Box, Button, Container, Stack } from '@mui/material';

export default function TaskList() {
  const [tasks, setTasks] = useState<Todo[]>([]);

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/todos').then((response) => {
      setTasks(response.data.slice(0, 10)); // Limitar a 10 tareas para la demostración
    });
  }, []);

  const deleteTask = (id: string) => {
    axios
      .delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
      .then(() => {
        setTasks(tasks.filter((task) => task.id !== id));
      });
  };

  return (
    <Container maxWidth="sm" className="pt-5 mb-5">
      <Stack direction="column" alignItems="center" justifyContent="center">
        <h1 className="text-3xl font-bold  font-montserrat uppercase">
          Task List
        </h1>
        <Box className="my-4">
          <Button variant="contained" color="success">
            <Link to="/edit/new">Add New Task</Link>
          </Button>
        </Box>
      </Stack>
      <Stack
        className="border p-4 rounded-md shadow-md bg-gray-50"
        direction="column"
        gap={2}
      >
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} deleteTask={deleteTask} />
        ))}
      </Stack>
    </Container>
  );
}
