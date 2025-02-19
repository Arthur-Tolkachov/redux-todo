import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import {
  CreateTodoFormValues,
  TodoModelSchema,
} from 'validation/todo/Todo.schema';

export interface TodosState {
  isLoading: boolean;
  todos: TodoModelSchema[];
}

const initialState: TodosState = {
  isLoading: false,
  todos: [],
};

export const createTodo = createAsyncThunk(
  'todos/createTodo',
  async (data: CreateTodoFormValues) => {
    const response = await new Promise<{ data: CreateTodoFormValues }>(res => {
      setTimeout(() => {
        res({ data });
      }, 3000);
    });

    return response.data;
  },
);

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(createTodo.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(createTodo.fulfilled, (state, action) => {
      state.isLoading = false;
      state.todos.push(action.payload);
    });
  },
});

export const selectTodos = (state: RootState) => state.todos;
export default todosSlice.reducer;
