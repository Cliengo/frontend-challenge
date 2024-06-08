import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import TaskList from '../components/TaskList';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import * as services from '../services/tasks';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

jest.mock('../services/tasks', () => ({
  getTasks: jest.fn().mockReturnValue(
    Promise.resolve({
      data: [
        {
          userId: 1,
          id: '1',
          title: 'delectus aut autem',
          completed: false,
        },
        {
          userId: 1,
          id: '2',
          title: 'quis ut nam facilis et officia qui',
          completed: false,
        },
        {
          userId: 1,
          id: '3',
          title: 'fugiat veniam minus',
          completed: false,
        },
        {
          userId: 1,
          id: '4',
          title: 'et porro tempora',
          completed: true,
        },
        {
          userId: 1,
          id: '5',
          title:
            'laboriosam mollitia et enim quasi adipisci quia provident illum',
          completed: false,
        },
        {
          userId: 1,
          id: '6',
          title: 'qui ullam ratione quibusdam voluptatem quia omnis',
          completed: false,
        },
        {
          userId: 1,
          id: '7',
          title: 'illo expedita consequatur quia in',
          completed: false,
        },
        {
          userId: 1,
          id: '8',
          title: 'quo adipisci enim quam ut ab',
          completed: true,
        },
        {
          userId: 1,
          id: '9',
          title: 'molestiae perspiciatis ipsa',
          completed: false,
        },
        {
          userId: 1,
          id: '10',
          title: 'illo est ratione doloremque quia maiores aut',
          completed: true,
        },
      ],
    }),
  ),
}));

const renderComponent = () => {
  return render(
    <MemoryRouter initialEntries={[`/`]}>
      <Routes>
        <Route path="/" element={<TaskList />} />
      </Routes>
    </MemoryRouter>,
  );
};

describe('TaskForm Component', () => {
  it('Should fetch the task list, and must be 10 elements in the document', async () => {
    renderComponent();
    const spy = jest.spyOn(services, 'getTasks');

    await waitFor(() => expect(spy).toHaveBeenCalledTimes(1));

    const tasks = await screen.findAllByTestId('task');
    expect(tasks).toHaveLength(10);
  });
});
