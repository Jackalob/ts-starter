import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Todo {
  id: number;
  checked: boolean;
  text: string;
}

interface TodoSliceState {
  todos: Todo[];
}

const initialState: TodoSliceState = {
  todos: [
    {
      id: 1,
      text: 'sad',
      checked: false,
    },
  ],
};

export const toodsSlice = createSlice({
  name: 'toods',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<string>) => {
      state.todos = [
        ...state.todos,
        {
          id: state.todos.length,
          text: action.payload,
          checked: false,
        },
      ];
    },
    removeTodo: (state, action: PayloadAction<number>) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
  },
});

export const { addTodo, removeTodo } = toodsSlice.actions;

export default toodsSlice;
