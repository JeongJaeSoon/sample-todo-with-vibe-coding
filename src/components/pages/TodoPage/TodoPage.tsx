import React from 'react';
import { TodoTemplate } from '../../templates/TodoTemplate/TodoTemplate';
import { TodoForm } from '../../molecules/TodoForm/TodoForm';
import { TodoList } from '../../organisms/TodoList/TodoList';
import { TodoFilter } from '../../organisms/TodoFilter/TodoFilter';
import { useTodoContext } from '../../../store/TodoContext';

export const TodoPage: React.FC = () => {
  const {
    todos,
    filter,
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo,
    setFilter,
    activeCount,
    completedCount,
  } = useTodoContext();

  return (
    <TodoTemplate
      form={<TodoForm onSubmit={addTodo} />}
      filter={
        <TodoFilter
          filter={filter}
          onFilterChange={setFilter}
          activeCount={activeCount}
          completedCount={completedCount}
        />
      }
      list={
        <TodoList
          todos={todos}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
          onEdit={editTodo}
        />
      }
    />
  );
};
