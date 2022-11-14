import { createContext, useCallback, useContext, useReducer } from 'react';

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

function useTodosManager(initialValue: Todo[]) {
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

// context

type UseTodosResult = ReturnType<typeof useTodosManager>;

type TodosProviderProps = {
  initialTodos: Todo[];
  children: React.ReactNode;
};

const TodoContext = createContext<UseTodosResult>({
  todos: [],
  addTodo: () => {},
  removeTodo: () => {},
});

function TodosProvider({ initialTodos, children }: TodosProviderProps) {
  return (
    <TodoContext.Provider value={useTodosManager(initialTodos)}>
      {children}
    </TodoContext.Provider>
  );
}

function useTodos(): UseTodosResult {
  const context = useContext(TodoContext);
  if (!context) throw new Error('useTodo must be within TodosProvider');
  return context;
}

export type { Todo };
export { useTodosManager, useTodos, TodosProvider };
