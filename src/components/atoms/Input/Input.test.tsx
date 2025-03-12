import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Input } from './Input';

describe('Input', () => {
  it('renders with default props', () => {
    const handleChange = jest.fn();
    render(<Input value="" onChange={handleChange} />);

    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
    expect(input).toHaveClass('input');
    expect(input).not.toBeDisabled();
    expect(input).toHaveValue('');
  });

  it('renders with placeholder', () => {
    const handleChange = jest.fn();
    const placeholder = 'Enter text';
    render(<Input value="" onChange={handleChange} placeholder={placeholder} />);

    const input = screen.getByPlaceholderText(placeholder);
    expect(input).toBeInTheDocument();
  });

  it('renders as disabled', () => {
    const handleChange = jest.fn();
    render(<Input value="" onChange={handleChange} disabled />);

    const input = screen.getByRole('textbox');
    expect(input).toBeDisabled();
  });

  it('calls onChange when text is entered', () => {
    const handleChange = jest.fn();
    render(<Input value="" onChange={handleChange} />);

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'test' } });

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange.mock.calls[0][0].target.value).toBe('test');
  });

  it('calls onKeyPress when key is pressed', () => {
    const handleChange = jest.fn();
    const handleKeyPress = jest.fn();
    render(<Input value="" onChange={handleChange} onKeyPress={handleKeyPress} />);

    const input = screen.getByRole('textbox');
    fireEvent.keyPress(input, { key: 'Enter', code: 'Enter', charCode: 13 });

    expect(handleKeyPress).toHaveBeenCalledTimes(1);
  });

  it('renders with custom className', () => {
    const handleChange = jest.fn();
    render(<Input value="" onChange={handleChange} className="custom-class" />);

    const input = screen.getByRole('textbox');
    expect(input).toHaveClass('custom-class');
  });
});
