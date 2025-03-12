import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('renders with default props', () => {
    render(<Button onClick={() => {}}>Click me</Button>);

    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('button');
    expect(button).toHaveClass('primary');
    expect(button).not.toBeDisabled();
  });

  it('renders with primary variant', () => {
    render(<Button onClick={() => {}} variant="primary">Primary</Button>);

    const button = screen.getByRole('button', { name: /primary/i });
    expect(button).toHaveClass('primary');
  });

  it('renders with secondary variant', () => {
    render(<Button onClick={() => {}} variant="secondary">Secondary</Button>);

    const button = screen.getByRole('button', { name: /secondary/i });
    expect(button).toHaveClass('secondary');
  });

  it('renders with danger variant', () => {
    render(<Button onClick={() => {}} variant="danger">Danger</Button>);

    const button = screen.getByRole('button', { name: /danger/i });
    expect(button).toHaveClass('danger');
  });

  it('renders as disabled', () => {
    render(<Button onClick={() => {}} disabled>Disabled</Button>);

    const button = screen.getByRole('button', { name: /disabled/i });
    expect(button).toBeDisabled();
  });

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);

    const button = screen.getByRole('button', { name: /click me/i });
    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('does not call onClick when disabled and clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick} disabled>Click me</Button>);

    const button = screen.getByRole('button', { name: /click me/i });
    fireEvent.click(button);

    expect(handleClick).not.toHaveBeenCalled();
  });

  it('renders with correct type attribute', () => {
    render(<Button onClick={() => {}} type="submit">Submit</Button>);

    const button = screen.getByRole('button', { name: /submit/i });
    expect(button).toHaveAttribute('type', 'submit');
  });
});
