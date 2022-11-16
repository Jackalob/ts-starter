/* eslint-disable no-plusplus */
import create from 'zustand';

interface Todo {
  id: number;
  text: string;
  checked: boolean;
}

interface TodoStore {
  todos: Todo[];
  addTodo: (text: string) => void;
  removeTodo: (removeId: number) => void;
}

const initialTodos: Todo[] = [];

const useTodos = create<TodoStore>((set) => ({
  todos: initialTodos,
  addTodo: (text: string) =>
    set((state) => ({
      ...state,
      todos: [
        ...state.todos,
        {
          id: state.todos.length,
          text,
          checked: false,
        },
      ],
    })),
  removeTodo: (removeId: number) =>
    set((state) => ({
      ...state,
      todos: state.todos.filter((todo) => todo.id !== removeId),
    })),
}));

export default useTodos;
