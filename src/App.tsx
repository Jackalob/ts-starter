import { useCallback, useEffect, useReducer, useRef, useState } from 'react';
import './App.css';
import Heading from './components/Heading';
import Box from './components/Box';
import List from './components/List';

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
      <div>
        <input ref={inputRef} />
        <button type="button" onClick={onAddTodo}>
          Add
        </button>
      </div>
      {todos.map((todo) => (
        <div key={todo.id}>
          {todo.text}
          <button type="button" onClick={() => onDeleteTodo(todo.id)}>
            Remove
          </button>
        </div>
      ))}
    </div>
  );
}

export default App;
