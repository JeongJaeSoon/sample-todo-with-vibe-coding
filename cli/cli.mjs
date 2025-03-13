#!/usr/bin/env node
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import path from 'path';
import readline from 'readline';

// CLIモード用のデータ保存場所
const DATA_DIR = path.join(process.env.HOME || process.env.USERPROFILE || '.', '.todo-app');
const DATA_FILE = path.join(DATA_DIR, 'todos.json');

// データディレクトリの作成
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

/**
 * TODOリストをファイルに保存する
 * @param todos 保存するTODOリスト
 */
const saveTodosToFile = (todos) => {
  fs.writeFileSync(DATA_FILE, JSON.stringify(todos, null, 2));
};

/**
 * ファイルからTODOリストを読み込む
 * @returns 読み込んだTODOリスト
 */
const loadTodosFromFile = () => {
  if (!fs.existsSync(DATA_FILE)) {
    return [];
  }

  try {
    const todosJson = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(todosJson).map((todo) => ({
      ...todo,
      createdAt: new Date(todo.createdAt)
    }));
  } catch (e) {
    console.error('Failed to parse todos from file', e);
    return [];
  }
};

// TODOリストの操作関数
const todoOperations = {
  // TODOの追加
  addTodo: (todos, text) => {
    const newTodo = {
      id: uuidv4(),
      text,
      completed: false,
      createdAt: new Date(),
    };
    return [newTodo, ...todos];
  },

  // TODOの完了状態の切り替え
  toggleTodo: (todos, id) => {
    return todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
  },

  // TODOの削除
  deleteTodo: (todos, id) => {
    return todos.filter((todo) => todo.id !== id);
  },

  // TODOの編集
  editTodo: (todos, id, text) => {
    return todos.map((todo) =>
      todo.id === id ? { ...todo, text } : todo
    );
  },

  // フィルタリングされたTODOの取得
  getFilteredTodos: (todos, filter) => {
    switch (filter) {
      case 'active':
        return todos.filter((todo) => !todo.completed);
      case 'completed':
        return todos.filter((todo) => todo.completed);
      default:
        return todos;
    }
  },
};

// コマンドラインインターフェース
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// ヘルプメッセージの表示
const showHelp = () => {
  console.log(`
TODOアプリ CLI モード

使用方法:
  list [all|active|completed]  - TODOリストを表示
  add <タスク名>               - 新しいTODOを追加
  toggle <ID>                  - TODOの完了状態を切り替え
  delete <ID>                  - TODOを削除
  edit <ID> <新しいタスク名>   - TODOを編集
  help                         - このヘルプを表示
  exit                         - CLIモードを終了
  `);
};

// TODOリストの表示
const showTodos = (todos, filter = 'all') => {
  const filteredTodos = todoOperations.getFilteredTodos(todos, filter);
  
  if (filteredTodos.length === 0) {
    console.log('TODOはありません。');
    return;
  }

  console.log('\nID | 状態 | 作成日 | タスク');
  console.log('----------------------------------');
  
  filteredTodos.forEach((todo) => {
    const status = todo.completed ? '[✓]' : '[ ]';
    const date = todo.createdAt.toLocaleDateString();
    console.log(`${todo.id.substring(0, 8)} | ${status} | ${date} | ${todo.text}`);
  });
  
  console.log('\n');
};

// メインのCLI処理
const startCli = async () => {
  let todos = loadTodosFromFile();
  
  console.log('TODOアプリ CLI モードへようこそ！');
  showHelp();

  const promptUser = () => {
    rl.question('> ', (input) => {
      const args = input.trim().split(' ');
      const command = args[0].toLowerCase();

      switch (command) {
        case 'list':
          const filter = (args[1] || 'all');
          if (!['all', 'active', 'completed'].includes(filter)) {
            console.log('無効なフィルターです。all, active, completedのいずれかを指定してください。');
            break;
          }
          showTodos(todos, filter);
          break;

        case 'add':
          const text = args.slice(1).join(' ');
          if (!text) {
            console.log('タスク名を入力してください。');
            break;
          }
          todos = todoOperations.addTodo(todos, text);
          saveTodosToFile(todos);
          console.log(`「${text}」を追加しました。`);
          break;

        case 'toggle':
          const toggleId = args[1];
          if (!toggleId) {
            console.log('IDを指定してください。');
            break;
          }
          const todoToToggle = todos.find(t => t.id.startsWith(toggleId));
          if (!todoToToggle) {
            console.log(`ID「${toggleId}」のTODOが見つかりません。`);
            break;
          }
          todos = todoOperations.toggleTodo(todos, todoToToggle.id);
          saveTodosToFile(todos);
          console.log(`「${todoToToggle.text}」の状態を${todoToToggle.completed ? '未完了' : '完了'}に変更しました。`);
          break;

        case 'delete':
          const deleteId = args[1];
          if (!deleteId) {
            console.log('IDを指定してください。');
            break;
          }
          const todoToDelete = todos.find(t => t.id.startsWith(deleteId));
          if (!todoToDelete) {
            console.log(`ID「${deleteId}」のTODOが見つかりません。`);
            break;
          }
          todos = todoOperations.deleteTodo(todos, todoToDelete.id);
          saveTodosToFile(todos);
          console.log(`「${todoToDelete.text}」を削除しました。`);
          break;

        case 'edit':
          const editId = args[1];
          const newText = args.slice(2).join(' ');
          if (!editId || !newText) {
            console.log('IDと新しいタスク名を指定してください。');
            break;
          }
          const todoToEdit = todos.find(t => t.id.startsWith(editId));
          if (!todoToEdit) {
            console.log(`ID「${editId}」のTODOが見つかりません。`);
            break;
          }
          todos = todoOperations.editTodo(todos, todoToEdit.id, newText);
          saveTodosToFile(todos);
          console.log(`「${todoToEdit.text}」を「${newText}」に変更しました。`);
          break;

        case 'help':
          showHelp();
          break;

        case 'exit':
          console.log('TODOアプリを終了します。');
          rl.close();
          return;

        default:
          console.log('無効なコマンドです。helpを入力してコマンド一覧を表示してください。');
          break;
      }

      promptUser();
    });
  };

  promptUser();
};

// CLIの起動
startCli().catch(console.error);
