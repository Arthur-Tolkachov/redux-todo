import { createSlice } from '@reduxjs/toolkit';
import { RootState } from 'store/store';

export interface Todo {
  title: string;
  description: string;
}

export type TodoState = Todo;

const initialState: TodoState = {
  title: '',
  description: '',
};

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {},
});

export const selectTodo = (state: RootState) => state.todo;
