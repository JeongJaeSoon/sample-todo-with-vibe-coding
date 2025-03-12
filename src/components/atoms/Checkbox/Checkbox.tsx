import React from 'react';
import {
  StyledCheckboxWrapper,
  StyledCheckboxInput,
  StyledCheckboxLabel,
} from './Checkbox.styles';

export interface CheckboxProps {
  checked: boolean;
  onChange: () => void;
  label?: string;
  disabled?: boolean;
  className?: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  onChange,
  label,
  disabled = false,
  className = '',
}) => {
  const id = React.useId();

  return (
    <StyledCheckboxWrapper>
      <StyledCheckboxInput
        id={id}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        className={`checkbox ${className}`}
      />
      {label && (
        <StyledCheckboxLabel htmlFor={id} disabled={disabled}>
          {label}
        </StyledCheckboxLabel>
      )}
    </StyledCheckboxWrapper>
  );
};
