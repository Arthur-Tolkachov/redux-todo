import { zodResolver } from '@hookform/resolvers/zod';
import { useAppDispatch } from 'app/hooks';
import { createTodo } from 'features/todos/todosSlice';
import { useForm } from 'react-hook-form';
import { TodoSchema, TodoModelSchema } from 'validation/todo';
import { CreateTodoFormValues } from 'validation/todo/Todo.schema';

export const useCreateTodoForm = () => {
  const dispatch = useAppDispatch();

  const methods = useForm<CreateTodoFormValues, unknown, TodoModelSchema>({
    defaultValues: {
      title: null,
      description: null,
      deadline: null,
      priority: 'normal' as const,
      tasks: [],
    },
    resolver: zodResolver(TodoSchema),
  });

  const { handleSubmit } = methods;

  const onSubmit = handleSubmit(async values => {
    dispatch(createTodo(values));
  });

  return {
    methods,
    onSubmit,
    handleSubmit,
  };
};
