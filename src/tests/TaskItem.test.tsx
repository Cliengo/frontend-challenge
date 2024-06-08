import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import TaskItem from '../components/TaskItem';
import { TaskFormMok } from './_mocks_/TaskForm.mock';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

type DeleteFunction = {
  (): void;
};

const renderComponent = (fn: DeleteFunction) => {
  return render(
    <MemoryRouter initialEntries={['/']}>
      <Routes>
        <Route
          path="/"
          element={<TaskItem task={TaskFormMok} deleteTask={fn} />}
        />
      </Routes>
    </MemoryRouter>,
  );
};

describe('TaskItem Component', () => {
  it('should render TaskItem component and check that the button fires', async () => {
    const mockedDeleteTask = jest.fn();
    renderComponent(mockedDeleteTask);

    const button = await screen.findByRole('button', {
      name: /Delete task 1/i,
    });

    const task = await screen.findByTestId('task');
    expect(task).toBeInTheDocument();

    fireEvent.click(button);

    expect(mockedDeleteTask).toHaveBeenCalledTimes(1);
    expect(mockedDeleteTask).toHaveBeenCalledWith('1');
  });
});
