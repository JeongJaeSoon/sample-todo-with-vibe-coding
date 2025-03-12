import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { TodoFilter } from './TodoFilter';
import { TodoFilter as FilterType } from '../../../types';

describe('TodoFilter', () => {
  const mockProps = {
    filter: 'all' as FilterType,
    onFilterChange: jest.fn(),
    activeCount: 3,
    completedCount: 2,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders filter buttons correctly', () => {
    render(<TodoFilter {...mockProps} />);

    expect(screen.getByRole('button', { name: /すべて/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /未完了/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /完了済み/i })).toBeInTheDocument();
  });

  it('highlights the active filter button', () => {
    render(<TodoFilter {...mockProps} />);

    const allButton = screen.getByRole('button', { name: /すべて/i });
    const activeButton = screen.getByRole('button', { name: /未完了/i });
    const completedButton = screen.getByRole('button', { name: /完了済み/i });

    // 'all' filter is active by default
    expect(allButton).toHaveClass('primary');
    expect(activeButton).toHaveClass('secondary');
    expect(completedButton).toHaveClass('secondary');
  });

  it('calls onFilterChange when a filter button is clicked', () => {
    render(<TodoFilter {...mockProps} />);

    const activeButton = screen.getByRole('button', { name: /未完了/i });
    fireEvent.click(activeButton);

    expect(mockProps.onFilterChange).toHaveBeenCalledWith('active');
  });

  it('displays the correct task counts', () => {
    render(<TodoFilter {...mockProps} />);

    expect(screen.getByText(/未完了のタスク: 3件/i)).toBeInTheDocument();
    expect(screen.getByText(/完了したタスク: 2件/i)).toBeInTheDocument();
  });

  it('highlights the active filter button when filter prop changes', () => {
    const { rerender } = render(<TodoFilter {...mockProps} />);

    // Change filter to 'active'
    rerender(<TodoFilter {...mockProps} filter="active" />);

    const allButton = screen.getByRole('button', { name: /すべて/i });
    const activeButton = screen.getByRole('button', { name: /未完了/i });
    const completedButton = screen.getByRole('button', { name: /完了済み/i });

    expect(allButton).toHaveClass('secondary');
    expect(activeButton).toHaveClass('primary');
    expect(completedButton).toHaveClass('secondary');

    // Change filter to 'completed'
    rerender(<TodoFilter {...mockProps} filter="completed" />);

    expect(allButton).toHaveClass('secondary');
    expect(activeButton).toHaveClass('secondary');
    expect(completedButton).toHaveClass('primary');
  });
});
