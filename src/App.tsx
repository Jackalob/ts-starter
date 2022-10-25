import { useCallback, useEffect, useReducer, useRef, useState } from 'react';
import './App.css';
import Heading from './components/Heading';
import Box from './components/Box';
import List from './components/List';
import Incrementer from './components/Incrementer';
import { useNumber } from './hooks/useNumber';
import Button from './components/Button';

const initialItems = ['one', 'two', 'three'];

interface Payload {
  text: string;
}

interface Todo {
  id: number;
  text: string;
  checked: boolean;
}

type ActionType =
  | { type: 'ADD'; text: string }
  | { type: 'REMOVE'; id: number };

let todoId = 1;

function reducer(state: Todo[], action: ActionType) {
  switch (action.type) {
    case 'ADD':
      // eslint-disable-next-line no-plusplus
      return [...state, { id: todoId++, text: action.text, checked: false }];
    case 'REMOVE':
      return state.filter(({ id }) => id !== action.id);
    default:
      throw new Error();
  }
}

const initialValue: Todo[] = [];

function App() {
  const [payload, setPayload] = useState<Payload | null>(null);
  const [todos, dispatch] = useReducer(reducer, initialValue);
  const inputRef = useRef<HTMLInputElement>(null);
  const [count, setCount] = useNumber(0);

  const onListClick = useCallback((item: string) => alert(item), []);
  const onDeleteTodo = (id: number) => {
    dispatch({ type: 'REMOVE', id });
  };
  const onAddTodo = useCallback(() => {
    if (inputRef.current && inputRef.current.value !== '') {
      dispatch({ type: 'ADD', text: inputRef.current.value });
      inputRef.current.value = '';
    }
  }, [dispatch]);

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
      <Incrementer value={count} onAddValue={setCount} />
      <div>
        <input ref={inputRef} />
        <Button onClick={onAddTodo}>Add</Button>
      </div>
      {todos.map((todo) => (
        <div key={todo.id}>
          {todo.text}
          <Button onClick={() => onDeleteTodo(todo.id)}>Remove</Button>
        </div>
      ))}
    </div>
  );
}

export default App;
