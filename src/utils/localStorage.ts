import { Todo } from '../types';

/**
 * TODOリストをローカルストレージに保存する
 * @param todos 保存するTODOリスト
 */
export const saveTodos = (todos: Todo[]): void => {
  localStorage.setItem('todos', JSON.stringify(todos));
};

/**
 * ローカルストレージからTODOリストを読み込む
 * @returns 読み込んだTODOリスト
 */
export const loadTodos = (): Todo[] => {
  const todosJson = localStorage.getItem('todos');
  if (!todosJson) return [];

  try {
    return JSON.parse(todosJson).map((todo: any) => ({
      ...todo,
      createdAt: new Date(todo.createdAt)
    }));
  } catch (e) {
    console.error('Failed to parse todos from localStorage', e);
    return [];
  }
};
