import { useCallback, useEffect } from 'react';
import { createGlobalState } from 'react-use';

interface Todo {
  id: number;
  checked: boolean;
  text: string;
}

const useGlobalTodos = createGlobalState<Todo[]>([]);

function useTodos(initialTodos: Todo[]): {
  todos: Todo[];
  addTodo: (text: string) => void;
  removeTodo: (id: number) => void;
} {
  const [todos, setTodos] = useGlobalTodos();

  useEffect(() => {
    setTodos(initialTodos);
  }, [initialTodos, setTodos]);

  const addTodo = useCallback(
    (text: string) => {
      setTodos([
        ...todos,
        {
          id: todos.length,
          text,
          checked: false,
        },
      ]);
    },
    [setTodos, todos]
  );

  const removeTodo = useCallback(
    (removeId: number) => {
      setTodos(() => todos.filter(({ id }) => id !== removeId));
    },
    [setTodos, todos]
  );

  return { todos, addTodo, removeTodo };
}

export type { Todo };
export { useTodos };
