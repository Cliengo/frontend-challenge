import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import TaskItem from './TaskItem';
import { Todo } from '../types/todo';
import { Box, Button, Container, Stack } from '@mui/material';
import { getTasks, deleteTask } from '../services/tasks';

export default function TaskList() {
  const [tasks, setTasks] = useState<Todo[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data: tasks } = await getTasks();
      setTasks(tasks.slice(0, 10));
    };
    fetchData();
  }, []);

  const handleDeleteTask = async (id: string) => {
    if (!id) throw new Error('Delete task must be called with an id');
    await deleteTask(id);
    setTasks(tasks.filter((task) => task.id !== id));
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
          <TaskItem key={task.id} task={task} deleteTask={handleDeleteTask} />
        ))}
      </Stack>
    </Container>
  );
}
