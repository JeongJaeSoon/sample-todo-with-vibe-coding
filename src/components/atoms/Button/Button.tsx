import React from 'react';
import { StyledButton } from './Button.styles';

export interface ButtonProps {
  children: React.ReactNode;
  onClick: (e?: React.MouseEvent<HTMLButtonElement>) => void;
  variant?: 'primary' | 'secondary' | 'danger';
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  disabled = false,
  type = 'button',
  className = '',
}) => {
  return (
    <StyledButton
      className={`button ${variant} ${className}`}
      onClick={onClick}
      variant={variant}
      disabled={disabled}
      type={type}
    >
      {children}
    </StyledButton>
  );
};
