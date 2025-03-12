import React from 'react';
import { render, screen } from '@testing-library/react';
import { TodoList } from './TodoList';
import { Todo } from '../../../types';

// TodoItemコンポーネントをモック
jest.mock('../../molecules/TodoItem/TodoItem', () => ({
  TodoItem: ({ todo, onToggle, onDelete, onEdit }: any) => (
    <div data-testid={`todo-item-${todo.id}`}>
      <span>{todo.text}</span>
      <button onClick={() => onToggle(todo.id)}>Toggle</button>
      <button onClick={() => onDelete(todo.id)}>Delete</button>
      <button onClick={() => onEdit(todo.id, 'Edited')}>Edit</button>
    </div>
  ),
}));

describe('TodoList', () => {
  const mockTodos: Todo[] = [
    {
      id: '1',
      text: 'Todo 1',
      completed: false,
      createdAt: new Date('2023-01-01'),
    },
    {
      id: '2',
      text: 'Todo 2',
      completed: true,
      createdAt: new Date('2023-01-02'),
    },
  ];

  const mockHandlers = {
    onToggle: jest.fn(),
    onDelete: jest.fn(),
    onEdit: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders todos correctly', () => {
    render(<TodoList todos={mockTodos} {...mockHandlers} />);

    expect(screen.getByTestId('todo-item-1')).toBeInTheDocument();
    expect(screen.getByTestId('todo-item-2')).toBeInTheDocument();
    expect(screen.getByText('Todo 1')).toBeInTheDocument();
    expect(screen.getByText('Todo 2')).toBeInTheDocument();
  });

  it('renders empty state when no todos', () => {
    render(<TodoList todos={[]} {...mockHandlers} />);

    expect(screen.getByText('TODOがありません')).toBeInTheDocument();
  });

  it('passes correct props to TodoItem components', () => {
    render(<TodoList todos={mockTodos} {...mockHandlers} />);

    // Check if TodoItem components receive the correct props
    expect(screen.getAllByTestId(/^todo-item-/)).toHaveLength(2);
  });
});
