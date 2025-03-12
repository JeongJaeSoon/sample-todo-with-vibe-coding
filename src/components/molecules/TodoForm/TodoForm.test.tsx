import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { TodoForm } from './TodoForm';

describe('TodoForm', () => {
  const mockSubmit = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders form correctly', () => {
    render(<TodoForm onSubmit={mockSubmit} />);

    expect(screen.getByPlaceholderText('TODOを入力')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /追加/i })).toBeInTheDocument();
  });

  it('updates input value when typing', () => {
    render(<TodoForm onSubmit={mockSubmit} />);

    const input = screen.getByPlaceholderText('TODOを入力');
    fireEvent.change(input, { target: { value: 'New Todo' } });

    expect(input).toHaveValue('New Todo');
  });

  it('calls onSubmit and clears input when form is submitted', () => {
    render(<TodoForm onSubmit={mockSubmit} />);

    const input = screen.getByPlaceholderText('TODOを入力');
    const button = screen.getByRole('button', { name: /追加/i });

    // Type in the input
    fireEvent.change(input, { target: { value: 'New Todo' } });

    // Submit the form
    fireEvent.click(button);

    // Check if onSubmit was called with the input value
    expect(mockSubmit).toHaveBeenCalledWith('New Todo');

    // Check if input was cleared
    expect(input).toHaveValue('');
  });

  it('calls onSubmit when Enter key is pressed', () => {
    render(<TodoForm onSubmit={mockSubmit} />);

    const input = screen.getByPlaceholderText('TODOを入力');

    // Type in the input
    fireEvent.change(input, { target: { value: 'New Todo' } });

    // Press Enter key
    fireEvent.keyPress(input, { key: 'Enter', code: 'Enter', charCode: 13 });

    // Check if onSubmit was called with the input value
    expect(mockSubmit).toHaveBeenCalledWith('New Todo');

    // Check if input was cleared
    expect(input).toHaveValue('');
  });

  it('does not call onSubmit when input is empty', () => {
    render(<TodoForm onSubmit={mockSubmit} />);

    const button = screen.getByRole('button', { name: /追加/i });

    // Submit the form with empty input
    fireEvent.click(button);

    // Check if onSubmit was not called
    expect(mockSubmit).not.toHaveBeenCalled();
  });

  it('does not call onSubmit when input contains only whitespace', () => {
    render(<TodoForm onSubmit={mockSubmit} />);

    const input = screen.getByPlaceholderText('TODOを入力');
    const button = screen.getByRole('button', { name: /追加/i });

    // Type whitespace in the input
    fireEvent.change(input, { target: { value: '   ' } });

    // Submit the form
    fireEvent.click(button);

    // Check if onSubmit was not called
    expect(mockSubmit).not.toHaveBeenCalled();
  });
});
