import { configureStore } from '@reduxjs/toolkit';
import todosSlice from './slices/todos';

export const store = configureStore({
  reducer: {
    todos: todosSlice.reducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
