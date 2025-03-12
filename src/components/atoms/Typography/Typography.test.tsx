import React from 'react';
import { render, screen } from '@testing-library/react';
import { Typography } from './Typography';

describe('Typography', () => {
  it('renders with default props', () => {
    render(<Typography>Hello World</Typography>);

    const element = screen.getByText('Hello World');
    expect(element).toBeInTheDocument();
    expect(element.tagName).toBe('P');
    expect(element).toHaveClass('typography');
    expect(element).toHaveClass('body');
  });

  it('renders as h1 variant', () => {
    render(<Typography variant="h1">Heading 1</Typography>);

    const element = screen.getByText('Heading 1');
    expect(element.tagName).toBe('H1');
    expect(element).toHaveClass('h1');
  });

  it('renders as h2 variant', () => {
    render(<Typography variant="h2">Heading 2</Typography>);

    const element = screen.getByText('Heading 2');
    expect(element.tagName).toBe('H2');
    expect(element).toHaveClass('h2');
  });

  it('renders as h3 variant', () => {
    render(<Typography variant="h3">Heading 3</Typography>);

    const element = screen.getByText('Heading 3');
    expect(element.tagName).toBe('H3');
    expect(element).toHaveClass('h3');
  });

  it('renders as body variant', () => {
    render(<Typography variant="body">Body Text</Typography>);

    const element = screen.getByText('Body Text');
    expect(element.tagName).toBe('P');
    expect(element).toHaveClass('body');
  });

  it('renders as caption variant', () => {
    render(<Typography variant="caption">Caption Text</Typography>);

    const element = screen.getByText('Caption Text');
    expect(element.tagName).toBe('SPAN');
    expect(element).toHaveClass('caption');
  });

  it('renders with custom color', () => {
    render(<Typography color="#ff0000">Red Text</Typography>);

    const element = screen.getByText('Red Text');
    expect(element).toHaveStyle('color: #ff0000');
  });

  it('renders with text alignment', () => {
    render(<Typography align="center">Centered Text</Typography>);

    const element = screen.getByText('Centered Text');
    expect(element).toHaveStyle('text-align: center');
  });

  it('renders with text decoration', () => {
    render(<Typography decoration="line-through">Strikethrough Text</Typography>);

    const element = screen.getByText('Strikethrough Text');
    expect(element).toHaveStyle('text-decoration: line-through');
  });

  it('renders with custom className', () => {
    render(<Typography className="custom-class">Custom Class</Typography>);

    const element = screen.getByText('Custom Class');
    expect(element).toHaveClass('custom-class');
  });
});
