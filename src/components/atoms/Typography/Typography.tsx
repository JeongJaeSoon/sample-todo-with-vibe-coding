import React from 'react';
import {
  StyledH1,
  StyledH2,
  StyledH3,
  StyledBody,
  StyledCaption,
  TypographyVariant,
  TypographyAlign,
  TypographyDecoration,
} from './Typography.styles';

export interface TypographyProps {
  children: React.ReactNode;
  variant?: TypographyVariant;
  color?: string;
  align?: TypographyAlign;
  decoration?: TypographyDecoration;
  className?: string;
}

export const Typography: React.FC<TypographyProps> = ({
  children,
  variant = 'body',
  color,
  align,
  decoration,
  className = '',
}) => {
  const commonProps = {
    color,
    align,
    decoration,
    className: `typography ${variant} ${className}`,
  };

  switch (variant) {
    case 'h1':
      return <StyledH1 {...commonProps}>{children}</StyledH1>;
    case 'h2':
      return <StyledH2 {...commonProps}>{children}</StyledH2>;
    case 'h3':
      return <StyledH3 {...commonProps}>{children}</StyledH3>;
    case 'caption':
      return <StyledCaption {...commonProps}>{children}</StyledCaption>;
    case 'body':
    default:
      return <StyledBody {...commonProps}>{children}</StyledBody>;
  }
};
