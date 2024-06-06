import React from 'react';
import { cleanup, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TaskForm from '../components/TaskForm';
import { TaskFormMok } from './_mocks_/TaskForm.mock';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

jest.mock('axios', () => ({
  get: jest
    .fn()
    .mockReturnValue(
      Promise.resolve({ data: { title: 'Title', description: 'Title' } }),
    ),
  post: jest.fn(),
  put: jest.fn(),
}));

const renderComponent = (param: string) => {
  return render(
    <MemoryRouter initialEntries={[`/edit/${param}`]}>
      <Routes>
        <Route path="/edit/:id" element={<TaskForm />} />
      </Routes>
    </MemoryRouter>,
  );
};

describe('TaskForm Component', () => {
  afterEach(cleanup);
  afterEach(jest.clearAllMocks);

  it('should be two empty inputs on the screen and and a button', async () => {
    renderComponent('new');
    const inputs = await screen.findAllByRole('textbox');
    const button = await screen.findByRole('button');

    expect(inputs).toHaveLength(2);
    expect(button).toBeInTheDocument();
    inputs.forEach((input) => {
      expect(input).toHaveValue('');
    });
  });

  it('should change the value of the inputs', async () => {
    renderComponent('1');
    const submitButton = screen.getByRole('button', { name: /Task/i });

    const [titleInput, descInput] = screen.getAllByRole('textbox');

    await userEvent.type(titleInput, TaskFormMok.title);
    await userEvent.type(descInput, TaskFormMok.description);

    await waitFor(() => {
      expect(titleInput).toHaveValue(TaskFormMok.title);
      expect(descInput).toHaveValue(TaskFormMok.description);
    });

    await userEvent.click(submitButton);
  });
});
