import styled, { css } from 'styled-components';

type ButtonVariant = 'primary' | 'secondary' | 'danger';

interface StyledButtonProps {
  variant: ButtonVariant;
  disabled?: boolean;
}

export const StyledButton = styled.button<StyledButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 8px 16px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
  outline: none;
  min-width: 80px;
  height: 36px;

  &:focus {
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  ${({ variant }) => {
    switch (variant) {
      case 'primary':
        return css`
          background-color: #007bff;
          color: white;
          &:hover:not(:disabled) {
            background-color: #0069d9;
          }
          &:active:not(:disabled) {
            background-color: #0062cc;
          }
        `;
      case 'secondary':
        return css`
          background-color: #6c757d;
          color: white;
          &:hover:not(:disabled) {
            background-color: #5a6268;
          }
          &:active:not(:disabled) {
            background-color: #545b62;
          }
        `;
      case 'danger':
        return css`
          background-color: #dc3545;
          color: white;
          &:hover:not(:disabled) {
            background-color: #c82333;
          }
          &:active:not(:disabled) {
            background-color: #bd2130;
          }
        `;
      default:
        return '';
    }
  }}
`;
