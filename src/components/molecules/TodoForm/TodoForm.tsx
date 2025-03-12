import React, { useState } from 'react';
import { Input } from '../../atoms/Input/Input';
import { Button } from '../../atoms/Button/Button';
import {
  TodoFormWrapper,
  InputWrapper,
  ButtonWrapper,
} from './TodoForm.styles';

export interface TodoFormProps {
  onSubmit: (text: string) => void;
}

export const TodoForm: React.FC<TodoFormProps> = ({ onSubmit }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e?: React.FormEvent | React.MouseEvent<HTMLButtonElement>) => {
    if (e) {
      e.preventDefault();
    }

    if (text.trim()) {
      onSubmit(text);
      setText('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <TodoFormWrapper onSubmit={handleSubmit}>
      <InputWrapper>
        <Input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="TODOを入力"
          onKeyPress={handleKeyPress}
        />
      </InputWrapper>
      <ButtonWrapper>
        <Button onClick={handleSubmit} type="submit">
          追加
        </Button>
      </ButtonWrapper>
    </TodoFormWrapper>
  );
};
