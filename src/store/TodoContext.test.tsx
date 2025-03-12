import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { TodoProvider, useTodoContext } from './TodoContext';
import { Todo } from '../types';

// モックコンポーネント
const TestComponent = () => {
  const {
    todos,
    filter,
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo,
    setFilter,
    activeCount,
    completedCount
  } = useTodoContext();

  return (
    <div>
      <div data-testid="todos-count">{todos.length}</div>
      <div data-testid="active-count">{activeCount}</div>
      <div data-testid="completed-count">{completedCount}</div>
      <div data-testid="current-filter">{filter}</div>
      <button data-testid="add-todo" onClick={() => addTodo('New Todo')}>Add Todo</button>
      {todos.map(todo => (
        <div key={todo.id} data-testid={`todo-${todo.id}`}>
          <span data-testid={`todo-text-${todo.id}`}>{todo.text}</span>
          <span data-testid={`todo-completed-${todo.id}`}>{todo.completed ? 'Completed' : 'Active'}</span>
          <button data-testid={`toggle-${todo.id}`} onClick={() => toggleTodo(todo.id)}>Toggle</button>
          <button data-testid={`edit-${todo.id}`} onClick={() => editTodo(todo.id, 'Edited Todo')}>Edit</button>
          <button data-testid={`delete-${todo.id}`} onClick={() => deleteTodo(todo.id)}>Delete</button>
        </div>
      ))}
      <div>
        <button data-testid="filter-all" onClick={() => setFilter('all')}>All</button>
        <button data-testid="filter-active" onClick={() => setFilter('active')}>Active</button>
        <button data-testid="filter-completed" onClick={() => setFilter('completed')}>Completed</button>
      </div>
    </div>
  );
};

describe('TodoContext', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should provide initial empty todos and "all" filter', () => {
    render(
      <TodoProvider>
        <TestComponent />
      </TodoProvider>
    );

    expect(screen.getByTestId('todos-count').textContent).toBe('0');
    expect(screen.getByTestId('current-filter').textContent).toBe('all');
    expect(screen.getByTestId('active-count').textContent).toBe('0');
    expect(screen.getByTestId('completed-count').textContent).toBe('0');
  });

  it('should add a new todo', () => {
    render(
      <TodoProvider>
        <TestComponent />
      </TodoProvider>
    );

    fireEvent.click(screen.getByTestId('add-todo'));

    expect(screen.getByTestId('todos-count').textContent).toBe('1');
    expect(screen.getByTestId('active-count').textContent).toBe('1');
    expect(screen.getByTestId('completed-count').textContent).toBe('0');
    expect(screen.getByText('New Todo')).toBeInTheDocument();
  });

  it('should toggle todo completion status', async () => {
    render(
      <TodoProvider>
        <TestComponent />
      </TodoProvider>
    );

    // Add a todo
    fireEvent.click(screen.getByTestId('add-todo'));

    // Get the todo ID
    const todoElement = screen.getByText('New Todo').closest('[data-testid^="todo-"]');
    const todoId = todoElement?.getAttribute('data-testid')?.replace('todo-', '');

    // Toggle the todo
    fireEvent.click(screen.getByTestId(`toggle-${todoId}`));

    // Check if the todo is completed
    expect(screen.getByTestId(`todo-completed-${todoId}`).textContent).toBe('Completed');
    expect(screen.getByTestId('active-count').textContent).toBe('0');
    expect(screen.getByTestId('completed-count').textContent).toBe('1');

    // Toggle it back
    fireEvent.click(screen.getByTestId(`toggle-${todoId}`));

    // Check if the todo is active again
    expect(screen.getByTestId(`todo-completed-${todoId}`).textContent).toBe('Active');
    expect(screen.getByTestId('active-count').textContent).toBe('1');
    expect(screen.getByTestId('completed-count').textContent).toBe('0');
  });

  it('should edit a todo', () => {
    render(
      <TodoProvider>
        <TestComponent />
      </TodoProvider>
    );

    // Add a todo
    fireEvent.click(screen.getByTestId('add-todo'));

    // Get the todo ID
    const todoElement = screen.getByText('New Todo').closest('[data-testid^="todo-"]');
    const todoId = todoElement?.getAttribute('data-testid')?.replace('todo-', '');

    // Edit the todo
    fireEvent.click(screen.getByTestId(`edit-${todoId}`));

    // Check if the todo text is updated
    expect(screen.getByTestId(`todo-text-${todoId}`).textContent).toBe('Edited Todo');
  });

  it('should delete a todo', () => {
    render(
      <TodoProvider>
        <TestComponent />
      </TodoProvider>
    );

    // Add a todo
    fireEvent.click(screen.getByTestId('add-todo'));
    expect(screen.getByTestId('todos-count').textContent).toBe('1');

    // Get the todo ID
    const todoElement = screen.getByText('New Todo').closest('[data-testid^="todo-"]');
    const todoId = todoElement?.getAttribute('data-testid')?.replace('todo-', '');

    // Delete the todo
    fireEvent.click(screen.getByTestId(`delete-${todoId}`));

    // Check if the todo is deleted
    expect(screen.getByTestId('todos-count').textContent).toBe('0');
  });

  it('should filter todos', async () => {
    render(
      <TodoProvider>
        <TestComponent />
      </TodoProvider>
    );

    // Add two todos
    fireEvent.click(screen.getByTestId('add-todo'));
    fireEvent.click(screen.getByTestId('add-todo'));

    // Get the first todo ID
    const todoElements = screen.getAllByText('New Todo');
    const firstTodoElement = todoElements[0].closest('[data-testid^="todo-"]');
    const firstTodoId = firstTodoElement?.getAttribute('data-testid')?.replace('todo-', '');

    // Complete the first todo
    fireEvent.click(screen.getByTestId(`toggle-${firstTodoId}`));

    // Check initial state (all todos visible)
    expect(screen.getByTestId('todos-count').textContent).toBe('2');

    // Filter to show only active todos
    fireEvent.click(screen.getByTestId('filter-active'));
    expect(screen.getByTestId('current-filter').textContent).toBe('active');
    expect(screen.getByTestId('todos-count').textContent).toBe('1');

    // Filter to show only completed todos
    fireEvent.click(screen.getByTestId('filter-completed'));
    expect(screen.getByTestId('current-filter').textContent).toBe('completed');
    expect(screen.getByTestId('todos-count').textContent).toBe('1');

    // Filter to show all todos again
    fireEvent.click(screen.getByTestId('filter-all'));
    expect(screen.getByTestId('current-filter').textContent).toBe('all');
    expect(screen.getByTestId('todos-count').textContent).toBe('2');
  });
});
