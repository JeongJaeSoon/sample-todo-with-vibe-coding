import { saveTodos, loadTodos } from './localStorage';
import { Todo } from '../types';

describe('localStorage utils', () => {
  beforeEach(() => {
    // テスト前にlocalStorageをクリア
    localStorage.clear();
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('saveTodos', () => {
    it('should save todos to localStorage', () => {
      const todos: Todo[] = [
        {
          id: '1',
          text: 'Test todo',
          completed: false,
          createdAt: new Date('2023-01-01')
        }
      ];

      saveTodos(todos);

      const savedTodos = localStorage.getItem('todos');
      expect(savedTodos).not.toBeNull();
      expect(JSON.parse(savedTodos!)).toEqual([
        {
          id: '1',
          text: 'Test todo',
          completed: false,
          createdAt: '2023-01-01T00:00:00.000Z'
        }
      ]);
    });
  });

  describe('loadTodos', () => {
    it('should return empty array if no todos in localStorage', () => {
      const todos = loadTodos();
      expect(todos).toEqual([]);
    });

    it('should load todos from localStorage and convert dates', () => {
      const todosJson = JSON.stringify([
        {
          id: '1',
          text: 'Test todo',
          completed: false,
          createdAt: '2023-01-01T00:00:00.000Z'
        }
      ]);

      localStorage.setItem('todos', todosJson);

      const todos = loadTodos();

      expect(todos).toEqual([
        {
          id: '1',
          text: 'Test todo',
          completed: false,
          createdAt: new Date('2023-01-01T00:00:00.000Z')
        }
      ]);
    });

    it('should return empty array and log error if JSON is invalid', () => {
      localStorage.setItem('todos', 'invalid json');

      const todos = loadTodos();

      expect(todos).toEqual([]);
      expect(console.error).toHaveBeenCalled();
    });
  });
});
