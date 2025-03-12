import React, { createContext, useContext, useReducer, useEffect, useMemo, ReactNode } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Todo, TodoFilter } from '../types';
import { loadTodos, saveTodos } from '../utils/localStorage';

// コンテキストの型定義
interface TodoContextType {
  todos: Todo[];
  filter: TodoFilter;
  addTodo: (text: string) => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  editTodo: (id: string, text: string) => void;
  setFilter: (filter: TodoFilter) => void;
  activeCount: number;
  completedCount: number;
}

// アクションの型定義
type TodoAction =
  | { type: 'SET_TODOS'; payload: Todo[] }
  | { type: 'ADD_TODO'; payload: string }
  | { type: 'TOGGLE_TODO'; payload: string }
  | { type: 'DELETE_TODO'; payload: string }
  | { type: 'EDIT_TODO'; payload: { id: string; text: string } }
  | { type: 'SET_FILTER'; payload: TodoFilter };

// 状態の型定義
interface TodoState {
  todos: Todo[];
  filter: TodoFilter;
}

// 初期状態
const initialState: TodoState = {
  todos: [],
  filter: 'all',
};

// リデューサー
const todoReducer = (state: TodoState, action: TodoAction): TodoState => {
  switch (action.type) {
    case 'SET_TODOS':
      return {
        ...state,
        todos: action.payload,
      };
    case 'ADD_TODO':
      return {
        ...state,
        todos: [
          {
            id: uuidv4(),
            text: action.payload,
            completed: false,
            createdAt: new Date(),
          },
          ...state.todos,
        ],
      };
    case 'TOGGLE_TODO':
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo
        ),
      };
    case 'DELETE_TODO':
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      };
    case 'EDIT_TODO':
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id
            ? { ...todo, text: action.payload.text }
            : todo
        ),
      };
    case 'SET_FILTER':
      return {
        ...state,
        filter: action.payload,
      };
    default:
      return state;
  }
};

// コンテキストの作成
const TodoContext = createContext<TodoContextType | undefined>(undefined);

// プロバイダーコンポーネント
export const TodoProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(todoReducer, initialState);

  // 初期化時にローカルストレージからデータを読み込む
  useEffect(() => {
    const todos = loadTodos();
    dispatch({ type: 'SET_TODOS', payload: todos });
  }, []);

  // 状態が変更されたらローカルストレージに保存
  useEffect(() => {
    saveTodos(state.todos);
  }, [state.todos]);

  // フィルタリングされたTODOを取得
  const filteredTodos = useMemo(() => {
    switch (state.filter) {
      case 'active':
        return state.todos.filter((todo) => !todo.completed);
      case 'completed':
        return state.todos.filter((todo) => todo.completed);
      default:
        return state.todos;
    }
  }, [state.todos, state.filter]);

  // アクティブなTODOの数
  const activeCount = useMemo(() => {
    return state.todos.filter((todo) => !todo.completed).length;
  }, [state.todos]);

  // 完了したTODOの数
  const completedCount = useMemo(() => {
    return state.todos.filter((todo) => todo.completed).length;
  }, [state.todos]);

  // コンテキスト値
  const value = {
    todos: filteredTodos,
    filter: state.filter,
    addTodo: (text: string) => dispatch({ type: 'ADD_TODO', payload: text }),
    toggleTodo: (id: string) => dispatch({ type: 'TOGGLE_TODO', payload: id }),
    deleteTodo: (id: string) => dispatch({ type: 'DELETE_TODO', payload: id }),
    editTodo: (id: string, text: string) =>
      dispatch({ type: 'EDIT_TODO', payload: { id, text } }),
    setFilter: (filter: TodoFilter) =>
      dispatch({ type: 'SET_FILTER', payload: filter }),
    activeCount,
    completedCount,
  };

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};

// カスタムフック
export const useTodoContext = (): TodoContextType => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error('useTodoContext must be used within a TodoProvider');
  }
  return context;
};
