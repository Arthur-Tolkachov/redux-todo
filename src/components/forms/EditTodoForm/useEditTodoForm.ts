import { useMemo } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import {
  disableEditMode,
  editTodo,
  selectEditingTodoId,
  selectTodos,
} from 'features/todos/todosSlice';
import { useForm } from 'react-hook-form';
import { TodoFormValues, TodoModel, TodoSchema } from 'validation/todo';

export const useEditTodoForm = () => {
  const dispatch = useAppDispatch();

  const todos = useAppSelector(selectTodos);
  const editingTodoId = useAppSelector(selectEditingTodoId);

  const editingTodo = useMemo(
    () => todos.find(todo => todo.id === editingTodoId),
    [todos, editingTodoId],
  );

  const initialValues = {
    id: editingTodo?.id || '',
    title: editingTodo?.title || '',
    description: editingTodo?.description || '',
    deadline: editingTodo?.deadline || '',
    priority: editingTodo?.priority || ('medium' as const),
    createdAt: editingTodo?.createdAt || '',
    tasks: editingTodo?.tasks || [],
  };

  const methods = useForm<TodoFormValues, unknown, TodoModel>({
    defaultValues: initialValues,
    resolver: zodResolver(TodoSchema),
  });

  const { handleSubmit } = methods;

  const onSubmit = handleSubmit(async values => {
    try {
      await dispatch(editTodo(values));
      dispatch(disableEditMode());
    } catch (error) {
      console.error(error);
    }
  });

  return {
    methods,
    onSubmit,
    handleSubmit,
  };
};
