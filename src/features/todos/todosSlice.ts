import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { TodoFormValues, TodoModel } from 'validation/todo/Todo.schema';

export interface TodosState {
  isLoading: boolean;
  editingTodoId: string | null;
  isDeleting: boolean;
  isEditing: boolean;
  todos: TodoModel[];
}

const initialState: TodosState = {
  isLoading: false,
  isDeleting: false,
  isEditing: false,
  editingTodoId: null,
  todos: [],
};

export const createTodo = createAsyncThunk(
  'todos/createTodo',
  async (data: TodoFormValues) => {
    const response = await new Promise<{ data: TodoFormValues }>(res => {
      setTimeout(() => {
        res({ data });
      }, 3000);
    });

    return response.data;
  },
);

export const deleteTodo = createAsyncThunk(
  'todos/deleteTodo',
  async (id: string) => {
    const response = await new Promise<{ id: string }>(res => {
      setTimeout(() => {
        res({ id });
      }, 1000);
    });

    return response;
  },
);

export const editTodo = createAsyncThunk(
  'todos/editTodo',
  async (data: TodoFormValues) => {
    const response = await new Promise<{ data: TodoFormValues }>(res => {
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
  reducers: {
    enableEditModeById: (state, action) => {
      state.editingTodoId = action.payload.id;
      state.isEditing = true;
    },
    disableEditMode: state => {
      state.editingTodoId = null;
      state.isEditing = false;
    },
  },
  extraReducers: builder => {
    builder.addCase(createTodo.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(createTodo.fulfilled, (state, action) => {
      state.isLoading = false;
      state.todos.push(action.payload);
    });
    builder.addCase(deleteTodo.pending, state => {
      state.isDeleting = true;
    });
    builder.addCase(deleteTodo.fulfilled, (state, action) => {
      state.isDeleting = false;
      state.todos = state.todos.filter(({ id }) => id !== action.payload.id);
    });
    builder.addCase(editTodo.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(editTodo.fulfilled, (state, action) => {
      state.todos = state.todos.map(todo => {
        if (todo.id === action.payload.id) {
          return action.payload;
        }

        return todo;
      });

      state.isLoading = false;
    });
  },
});

export const { enableEditModeById, disableEditMode } = todosSlice.actions;

export const selectTodos = (state: RootState) => state.todos.todos;
export const selectIsDeleting = (state: RootState) => state.todos.isDeleting;
export const selectIsLoading = (state: RootState) => state.todos.isLoading;
export const selectIsEditing = (state: RootState) => state.todos.isEditing;
export const selectEditingTodoId = (state: RootState) =>
  state.todos.editingTodoId;

export default todosSlice.reducer;
