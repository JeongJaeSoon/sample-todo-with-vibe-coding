import React from 'react';
import { TodoProvider } from './store/TodoContext';
import { TodoPage } from './components/pages/TodoPage/TodoPage';
import { GlobalStyles } from './styles/GlobalStyles';

function App() {
  return (
    <TodoProvider>
      <GlobalStyles />
      <TodoPage />
    </TodoProvider>
  );
}

export default App;
