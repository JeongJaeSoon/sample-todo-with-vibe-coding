import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { TodoItem } from './TodoItem';
import { Todo } from '../../../types';

describe('TodoItem', () => {
  const mockTodo: Todo = {
    id: '1',
    text: 'Test Todo',
    completed: false,
    createdAt: new Date('2023-01-01T00:00:00.000Z'),
  };

  const mockHandlers = {
    onToggle: jest.fn(),
    onDelete: jest.fn(),
    onEdit: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders todo item correctly', () => {
    render(<TodoItem todo={mockTodo} {...mockHandlers} />);

    expect(screen.getByText(mockTodo.text)).toBeInTheDocument();
    expect(screen.getByRole('checkbox')).not.toBeChecked();
    expect(screen.getByText('2023/01/01')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /edit/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /delete/i })).toBeInTheDocument();
  });

  it('renders completed todo with strikethrough', () => {
    const completedTodo = { ...mockTodo, completed: true };
    render(<TodoItem todo={completedTodo} {...mockHandlers} />);

    const todoText = screen.getByText(completedTodo.text);
    expect(todoText).toHaveStyle('text-decoration: line-through');
    expect(screen.getByRole('checkbox')).toBeChecked();
  });

  it('calls onToggle when checkbox is clicked', () => {
    render(<TodoItem todo={mockTodo} {...mockHandlers} />);

    fireEvent.click(screen.getByRole('checkbox'));
    expect(mockHandlers.onToggle).toHaveBeenCalledWith(mockTodo.id);
  });

  it('calls onDelete when delete button is clicked', () => {
    render(<TodoItem todo={mockTodo} {...mockHandlers} />);

    fireEvent.click(screen.getByRole('button', { name: /delete/i }));
    expect(mockHandlers.onDelete).toHaveBeenCalledWith(mockTodo.id);
  });

  it('enters edit mode when edit button is clicked', () => {
    render(<TodoItem todo={mockTodo} {...mockHandlers} />);

    fireEvent.click(screen.getByRole('button', { name: /edit/i }));

    // Should show input field with todo text
    expect(screen.getByDisplayValue(mockTodo.text)).toBeInTheDocument();

    // Should show save and cancel buttons
    expect(screen.getByRole('button', { name: /save/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /cancel/i })).toBeInTheDocument();

    // Should hide edit and delete buttons
    expect(screen.queryByRole('button', { name: /edit/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /delete/i })).not.toBeInTheDocument();
  });

  it('calls onEdit when save button is clicked', () => {
    render(<TodoItem todo={mockTodo} {...mockHandlers} />);

    // Enter edit mode
    fireEvent.click(screen.getByRole('button', { name: /edit/i }));

    // Change input value
    const input = screen.getByDisplayValue(mockTodo.text);
    fireEvent.change(input, { target: { value: 'Updated Todo' } });

    // Click save button
    fireEvent.click(screen.getByRole('button', { name: /save/i }));

    expect(mockHandlers.onEdit).toHaveBeenCalledWith(mockTodo.id, 'Updated Todo');
  });

  it('exits edit mode without saving when cancel button is clicked', () => {
    render(<TodoItem todo={mockTodo} {...mockHandlers} />);

    // Enter edit mode
    fireEvent.click(screen.getByRole('button', { name: /edit/i }));

    // Change input value
    const input = screen.getByDisplayValue(mockTodo.text);
    fireEvent.change(input, { target: { value: 'Updated Todo' } });

    // Click cancel button
    fireEvent.click(screen.getByRole('button', { name: /cancel/i }));

    // Should not call onEdit
    expect(mockHandlers.onEdit).not.toHaveBeenCalled();

    // Should exit edit mode
    expect(screen.getByText(mockTodo.text)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /edit/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /delete/i })).toBeInTheDocument();
  });

  it('does not save empty todo text', () => {
    render(<TodoItem todo={mockTodo} {...mockHandlers} />);

    // Enter edit mode
    fireEvent.click(screen.getByRole('button', { name: /edit/i }));

    // Change input value to empty
    const input = screen.getByDisplayValue(mockTodo.text);
    fireEvent.change(input, { target: { value: '' } });

    // Click save button
    fireEvent.click(screen.getByRole('button', { name: /save/i }));

    // Should not call onEdit
    expect(mockHandlers.onEdit).not.toHaveBeenCalled();

    // Should stay in edit mode
    expect(screen.getByRole('button', { name: /save/i })).toBeInTheDocument();
  });
});
