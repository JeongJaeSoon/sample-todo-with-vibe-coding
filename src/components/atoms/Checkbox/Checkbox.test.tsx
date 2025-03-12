import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Checkbox } from './Checkbox';

describe('Checkbox', () => {
  it('renders with default props', () => {
    const handleChange = jest.fn();
    render(<Checkbox checked={false} onChange={handleChange} />);

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).toHaveClass('checkbox');
    expect(checkbox).not.toBeDisabled();
    expect(checkbox).not.toBeChecked();
  });

  it('renders as checked', () => {
    const handleChange = jest.fn();
    render(<Checkbox checked={true} onChange={handleChange} />);

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeChecked();
  });

  it('renders with label', () => {
    const handleChange = jest.fn();
    const label = 'Check me';
    render(<Checkbox checked={false} onChange={handleChange} label={label} />);

    const checkbox = screen.getByLabelText(label);
    expect(checkbox).toBeInTheDocument();
    expect(screen.getByText(label)).toBeInTheDocument();
  });

  it('renders as disabled', () => {
    const handleChange = jest.fn();
    render(<Checkbox checked={false} onChange={handleChange} disabled />);

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeDisabled();
  });

  it('calls onChange when clicked', () => {
    const handleChange = jest.fn();
    render(<Checkbox checked={false} onChange={handleChange} />);

    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);

    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('does not call onChange when disabled and clicked', () => {
    const handleChange = jest.fn();
    render(<Checkbox checked={false} onChange={handleChange} disabled />);

    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);

    expect(handleChange).not.toHaveBeenCalled();
  });

  it('renders with custom className', () => {
    const handleChange = jest.fn();
    render(<Checkbox checked={false} onChange={handleChange} className="custom-class" />);

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toHaveClass('custom-class');
  });
});
