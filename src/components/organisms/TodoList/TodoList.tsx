import React from 'react';
import { Todo } from '../../../types';
import { TodoItem } from '../../molecules/TodoItem/TodoItem';
import { Typography } from '../../atoms/Typography/Typography';
import { TodoListWrapper, EmptyState } from './TodoList.styles';

export interface TodoListProps {
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, text: string) => void;
}

export const TodoList: React.FC<TodoListProps> = ({
  todos,
  onToggle,
  onDelete,
  onEdit,
}) => {
  if (todos.length === 0) {
    return (
      <EmptyState>
        <Typography variant="body">TODOがありません</Typography>
      </EmptyState>
    );
  }

  return (
    <TodoListWrapper>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </TodoListWrapper>
  );
};
