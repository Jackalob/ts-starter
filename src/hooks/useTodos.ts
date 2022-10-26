import { useCallback, useReducer } from 'react';

type ActionType =
  | { type: 'ADD'; text: string }
  | { type: 'REMOVE'; id: number };

interface Todo {
  id: number;
  text: string;
  checked: boolean;
}

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

function useTodos(initialValue: Todo[]) {
  const [todos, dispatch] = useReducer(reducer, initialValue);

  const addTodo = useCallback((text: string) => {
    dispatch({ type: 'ADD', text });
  }, []);

  const removeTodo = useCallback((id: number) => {
    dispatch({ type: 'REMOVE', id });
  }, []);

  return {
    todos,
    addTodo,
    removeTodo,
  };
}

export type { Todo };
export { useTodos };
