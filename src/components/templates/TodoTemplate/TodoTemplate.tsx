import React from 'react';
import { Typography } from '../../atoms/Typography/Typography';
import {
  TodoTemplateWrapper,
  TodoHeader,
  TodoContent,
  TodoFormSection,
  TodoFilterSection,
  TodoListSection,
} from './TodoTemplate.styles';

export interface TodoTemplateProps {
  form: React.ReactNode;
  filter: React.ReactNode;
  list: React.ReactNode;
}

export const TodoTemplate: React.FC<TodoTemplateProps> = ({
  form,
  filter,
  list,
}) => {
  return (
    <TodoTemplateWrapper>
      <TodoHeader>
        <Typography variant="h1">TODOアプリ</Typography>
      </TodoHeader>
      <TodoContent>
        <TodoFormSection>{form}</TodoFormSection>
        <TodoFilterSection>{filter}</TodoFilterSection>
        <TodoListSection>{list}</TodoListSection>
      </TodoContent>
    </TodoTemplateWrapper>
  );
};
