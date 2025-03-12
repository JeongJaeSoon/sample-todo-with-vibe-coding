import React, { useState } from 'react';
import { Todo } from '../../../types';
import { Checkbox } from '../../atoms/Checkbox/Checkbox';
import { Button } from '../../atoms/Button/Button';
import { Input } from '../../atoms/Input/Input';
import { Typography } from '../../atoms/Typography/Typography';
import {
  TodoItemWrapper,
  TodoContent,
  TodoText,
  TodoDate,
  TodoActions,
  EditForm,
  EditInput,
  EditActions,
} from './TodoItem.styles';

export interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, text: string) => void;
}

export const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  onToggle,
  onDelete,
  onEdit,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleToggle = () => {
    onToggle(todo.id);
  };

  const handleDelete = () => {
    onDelete(todo.id);
  };

  const handleEdit = () => {
    setEditText(todo.text);
    setIsEditing(true);
  };

  const handleSave = () => {
    if (editText.trim()) {
      onEdit(todo.id, editText);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditText(todo.text);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).replace(/\//g, '/');
  };

  return (
    <TodoItemWrapper>
      <Checkbox checked={todo.completed} onChange={handleToggle} />

      {isEditing ? (
        <EditForm>
          <EditInput>
            <Input
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              placeholder="TODOを入力"
            />
          </EditInput>
          <EditActions>
            <Button onClick={handleSave} variant="primary">保存</Button>
            <Button onClick={handleCancel} variant="secondary">キャンセル</Button>
          </EditActions>
        </EditForm>
      ) : (
        <>
          <TodoContent>
            <TodoText>
              <Typography
                decoration={todo.completed ? 'line-through' : 'none'}
                color={todo.completed ? '#6c757d' : 'inherit'}
              >
                {todo.text}
              </Typography>
            </TodoText>
            <TodoDate>
              <Typography variant="caption">
                {formatDate(todo.createdAt)}
              </Typography>
            </TodoDate>
          </TodoContent>
          <TodoActions>
            <Button onClick={handleEdit} variant="secondary">編集</Button>
            <Button onClick={handleDelete} variant="danger">削除</Button>
          </TodoActions>
        </>
      )}
    </TodoItemWrapper>
  );
};
