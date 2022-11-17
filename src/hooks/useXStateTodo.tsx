import { useMachine } from '@xstate/react';
import { useCallback, useEffect } from 'react';
import { assign, createMachine } from 'xstate';

interface Todo {
  id: number;
  text: string;
  checked: boolean;
}

const todoMachine = createMachine<
  { todos: Todo[] },
  | { type: 'SET_TODOS'; todos: Todo[] }
  | { type: 'ADD_TODO'; text: string }
  | { type: 'REMOVE_TODO'; removeId: number }
>({
  id: 'todoMachine',
  initial: 'editing',
  context: {
    todos: [],
  },
  states: {
    editing: {
      on: {
        SET_TODOS: {
          actions: assign({
            // 要改變 context 內的哪個 key
            todos: (ctx, { todos }) => [...todos],
          }),
        },
        ADD_TODO: {
          actions: assign({
            todos: (ctx, { text }) => [
              ...ctx.todos,
              { id: ctx.todos.length + 1, text, checked: false },
            ],
          }),
        },
        REMOVE_TODO: {
          actions: assign({
            todos: (ctx, { removeId }) =>
              ctx.todos.filter((todo) => todo.id !== removeId),
          }),
        },
      },
    },
    working: {},
  },
});

function useTodo(initialTodos: Todo[]) {
  const [state, send] = useMachine(todoMachine);

  const addTodo = useCallback(
    (text: string) => send({ type: 'ADD_TODO', text }),
    [send]
  );

  const removeTodo = useCallback(
    (removeId: number) => send({ type: 'REMOVE_TODO', removeId }),
    [send]
  );

  useEffect(() => {
    send({ type: 'SET_TODOS', todos: initialTodos });
  }, [initialTodos, send]);

  return { todos: state.context.todos, addTodo, removeTodo };
}

export default useTodo;
