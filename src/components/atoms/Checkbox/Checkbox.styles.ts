import styled from 'styled-components';

interface StyledCheckboxWrapperProps {
  disabled?: boolean;
}

export const StyledCheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
`;

export const StyledCheckboxInput = styled.input<StyledCheckboxWrapperProps>`
  margin-right: 8px;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};

  &:focus {
    outline: 0;
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
  }
`;

export const StyledCheckboxLabel = styled.label<StyledCheckboxWrapperProps>`
  margin: 0;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  opacity: ${({ disabled }) => (disabled ? 0.6 : 1)};
  font-size: 14px;
  color: #212529;
`;
