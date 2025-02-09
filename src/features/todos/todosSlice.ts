import { Todo } from '@features/todo/todoSlice';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from 'store/store';

export interface TodosState {
  todos: Todo[];
}

export const todosSlice = createSlice({
  name: 'todos',
  initialState: [],
  reducers: {},
});

export const selectTodos = (state: RootState) => state.todos;
