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
  | { type: 'START_WORKING' }
  | { type: 'END_WORKING' }
  | { type: 'SET_TODOS'; todos: Todo[] }
  | { type: 'ADD_TODO'; text: string }
  | { type: 'REMOVE_TODO'; removeId: number }
>(
  {
    id: 'todoMachine',
    initial: 'editing',
    context: {
      todos: [],
    },
    states: {
      editing: {
        on: {
          START_WORKING: {
            target: 'working',
            cond: 'haveUndoneTodos',
          },
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
      working: {
        exit: assign({
          todos: (ctx) => {
            const newTodos = [...ctx.todos];
            const undoneTodo = newTodos.find((todo) => todo.checked === false);
            if (undoneTodo) {
              undoneTodo.checked = true;
            }
            return newTodos;
          },
        }),
        on: {
          END_WORKING: {
            target: 'editing',
          },
        },
      },
    },
  },
  {
    guards: {
      haveUndoneTodos: (ctx) =>
        ctx.todos.some((todo) => todo.checked === false),
    },
  }
);

function useTodo(initialTodos: Todo[]): {
  isEditing: boolean;
  todos: Todo[];
  addTodo: (text: string) => void;
  removeTodo: (id: number) => void;
  startWorking: () => void;
  endWorking: () => void;
} {
  const [state, send] = useMachine(todoMachine);

  const addTodo = useCallback(
    (text: string) => send({ type: 'ADD_TODO', text }),
    [send]
  );

  const removeTodo = useCallback(
    (removeId: number) => send({ type: 'REMOVE_TODO', removeId }),
    [send]
  );

  const startWorking = useCallback(() => {
    send({ type: 'START_WORKING' });
  }, [send]);

  const endWorking = useCallback(() => {
    send({ type: 'END_WORKING' });
  }, [send]);

  useEffect(() => {
    send({ type: 'SET_TODOS', todos: initialTodos });
  }, [initialTodos, send]);

  return {
    isEditing: state.matches('editing'),
    startWorking,
    endWorking,
    todos: state.context.todos,
    addTodo,
    removeTodo,
  };
}

export default useTodo;
