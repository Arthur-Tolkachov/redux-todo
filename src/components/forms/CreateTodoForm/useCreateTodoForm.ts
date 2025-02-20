import { zodResolver } from '@hookform/resolvers/zod';
import { useAppDispatch } from 'app/hooks';
import dayjs from 'dayjs';
import { createTodo } from 'features/todos/todosSlice';
import { useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import { TodoSchema, TodoModel } from 'validation/todo';
import { TodoFormValues } from 'validation/todo/Todo.schema';

export const useCreateTodoForm = () => {
  const dispatch = useAppDispatch();

  const initialValues = {
    id: uuidv4(),
    title: '',
    description: '',
    deadline: '',
    priority: 'medium' as const,
    createdAt: dayjs().format('YYYY-MM-DD'),
    tasks: [],
  };

  const methods = useForm<TodoFormValues, unknown, TodoModel>({
    defaultValues: initialValues,
    resolver: zodResolver(TodoSchema),
  });

  const { handleSubmit, reset } = methods;

  const onSubmit = handleSubmit(async values => {
    try {
      await dispatch(createTodo(values));
    } catch (error) {
      console.error(error);
    } finally {
      reset({ ...initialValues, id: uuidv4() });
    }
  });

  return {
    methods,
    onSubmit,
  };
};
