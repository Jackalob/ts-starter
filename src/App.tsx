import { useCallback, useEffect, useRef, useState } from 'react';
import './App.css';
import Heading from './components/Heading';
import Box from './components/Box';
import List from './components/List';
import Incrementer from './components/Incrementer';
import Button from './components/Button';
import UL from './components/UL';
import { useNumber } from './hooks/useNumber';
import { useTodos } from './hooks/useTodos';
import type { Todo } from './hooks/useTodos';

const initialItems = ['one', 'two', 'three'];

interface Payload {
  text: string;
}

const initialValue: Todo[] = [];

function App() {
  const [payload, setPayload] = useState<Payload | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [count, setCount] = useNumber(0);
  const { todos, addTodo, removeTodo } = useTodos(initialValue);

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
        <Button onClick={onAddTodo}>Add</Button>
      </div>
      <Box>
        <UL
          className="hello"
          items={todos}
          itemClick={(todo) => alert(todo.text)}
          render={(todo) => (
            <>
              {todo.text}
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
        >
          <p>123</p>
        </UL>
      </Box>
    </div>
  );
}

export default App;
