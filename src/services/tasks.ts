import axios from 'axios';
import { Todo } from '../types/todo';

export async function getTasks() {
  return axios
    .get('https://jsonplaceholder.typicode.com/todos')
    .then((res) => res);
}

export async function getTask(id: string) {
  return axios
    .get(`https://jsonplaceholder.typicode.com/todos/${id}`)
    .then((res) => res.data);
}

export async function postTask(task: Todo) {
  return axios.post('https://jsonplaceholder.typicode.com/todos', task);
}

export async function editTask(id: string, task: Todo) {
  return axios.put(`https://jsonplaceholder.typicode.com/todos/${id}`, task);
}

export async function deleteTask(id: string) {
  return axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);
}
