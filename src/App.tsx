import { useCallback, useEffect, useRef, useState } from 'react';
import './App.css';
import Heading from './components/Heading';
import Box from './components/Box';
import List from './components/List';
import Incrementer from './components/Incrementer';
import Button from './components/Button';
import UL from './components/UL';
import { useNumber } from './hooks/useNumber';
// use context hook
// import { useTodos, TodosProvider } from './hooks/useContextTodos';
// import type { Todo } from './hooks/useContextTodos';

// use globalTodos hook
// import { useTodos } from './hooks/useGlobalTodos';
// import type { Todo } from './hooks/useGlobalTodos';

// use redux-toolkit
// import { Provider, useDispatch, useSelector } from 'react-redux';
// import { store, RootState } from './store';
// import { addTodo, removeTodo } from './store/slices/todos';

// use zustand hook
// import useTodos from './hooks/useZustandTodos';

// use xstate
// 若想要用 global state 官方推薦配合 context
import useTodos from './hooks/useXStateTodo';

const initialItems = ['one', 'two', 'three'];
interface Payload {
  text: string;
}

const initialTodos = [{ id: 1, text: 'hello', checked: false }];

function App() {
  const [payload, setPayload] = useState<Payload | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [count, setCount] = useNumber(0);

  const { isEditing, todos, addTodo, removeTodo, startWorking, endWorking } =
    useTodos(initialTodos);

  const onListClick = useCallback((item: string) => alert(item), []);

  const onAddTodo = useCallback(() => {
    if (inputRef.current && inputRef.current.value !== '') {
      addTodo(inputRef.current.value);
      inputRef.current.value = '';
    }
  }, [addTodo]);

  useEffect(() => {
    fetch('/data.json')
      .then((res) => res.json())
      .then((data) => setPayload(data));
  }, []);

  return (
    <div className="App">
      <Heading title="Introduction" />
      <Box>Hello there</Box>
      <List items={initialItems} onClick={onListClick} />
      <Box>{JSON.stringify(payload)}</Box>
      <Box>
        <Incrementer value={count} onAddValue={setCount} />
      </Box>
      <div>
        <input ref={inputRef} />
        <Button onClick={onAddTodo} style={{ padding: '.5rem' }}>
          Add todo
        </Button>
      </div>
      <Box>
        {isEditing ? (
          <>
            <UL
              className="hello"
              items={todos}
              itemClick={(todo) => alert(todo.text)}
              render={(todo) => (
                <>
                  ({todo.checked ? 'DONE' : 'NOT DONE'}) {todo.text}
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeTodo(todo.id);
                    }}
                  >
                    Remove
                  </Button>
                </>
              )}
            />
            <Button onClick={startWorking}>Start working</Button>
          </>
        ) : (
          <Button onClick={endWorking}>End working</Button>
        )}
      </Box>
    </div>
  );
}

function JustShowTodos() {
  const { todos } = useTodos(initialTodos);
  return (
    <UL
      items={todos}
      itemClick={() => {}}
      render={(todo) => <div>{todo.text}</div>}
    />
  );
}

function AppWrapper() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '50% 50%' }}>
      <App />
      <JustShowTodos />
    </div>
  );
}

export default AppWrapper;
