import styled, { css } from 'styled-components';

export type TypographyVariant = 'h1' | 'h2' | 'h3' | 'body' | 'caption';
export type TypographyAlign = 'left' | 'center' | 'right';
export type TypographyDecoration = 'none' | 'underline' | 'line-through';

interface TypographyStyleProps {
  color?: string;
  align?: TypographyAlign;
  decoration?: TypographyDecoration;
}

const baseStyles = css<TypographyStyleProps>`
  margin: 0;
  padding: 0;
  color: ${({ color }) => color || 'inherit'};
  text-align: ${({ align }) => align || 'left'};
  text-decoration: ${({ decoration }) => decoration || 'none'};
`;

export const StyledH1 = styled.h1<TypographyStyleProps>`
  ${baseStyles}
  font-size: 2rem;
  font-weight: 600;
  line-height: 1.2;
  margin-bottom: 0.5rem;
`;

export const StyledH2 = styled.h2<TypographyStyleProps>`
  ${baseStyles}
  font-size: 1.5rem;
  font-weight: 600;
  line-height: 1.2;
  margin-bottom: 0.5rem;
`;

export const StyledH3 = styled.h3<TypographyStyleProps>`
  ${baseStyles}
  font-size: 1.25rem;
  font-weight: 600;
  line-height: 1.2;
  margin-bottom: 0.5rem;
`;

export const StyledBody = styled.p<TypographyStyleProps>`
  ${baseStyles}
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  margin-bottom: 1rem;
`;

export const StyledCaption = styled.span<TypographyStyleProps>`
  ${baseStyles}
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.5;
  color: ${({ color }) => color || '#6c757d'};
`;
