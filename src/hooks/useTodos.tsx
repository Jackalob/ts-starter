import { useCallback, useReducer } from 'react';

type ActionType =
  | { type: 'ADD'; text: string }
  | { type: 'REMOVE'; id: number };

interface Todo {
  id: number;
  text: string;
  checked: boolean;
}

function reducer(state: Todo[], action: ActionType) {
  switch (action.type) {
    case 'ADD':
      return [
        ...state,
        { id: state.length, text: action.text, checked: false },
      ];
    case 'REMOVE':
      return state.filter(({ id }) => id !== action.id);
    default:
      throw new Error();
  }
}

function useTodo(initialTodos: Todo[]) {
  const [todos, dispatch] = useReducer(reducer, initialTodos);

  const addTodo = useCallback(
    (text: string) => dispatch({ type: 'ADD', text }),
    []
  );
  const removeTodo = useCallback(
    (removeId: number) => dispatch({ type: 'REMOVE', id: removeId }),
    []
  );

  return { todos, addTodo, removeTodo };
}

export default useTodo;
