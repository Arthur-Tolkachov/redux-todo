import { Box, Card, Stack } from '@mui/material';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { CreateTodoForm } from 'components/forms/CreateTodoForm';
import { EditTodoForm } from 'components/forms/EditTodoForm';
import { TodoCard } from 'components/shared/TodoCard';
import {
  deleteTodo,
  disableEditMode,
  enableEditModeById,
  selectIsDeleting,
  selectIsEditing,
  selectTodos,
} from 'features/todos/todosSlice';

import styles from './App.module.scss';

function App() {
  const todos = useAppSelector(selectTodos);
  const isEditing = useAppSelector(selectIsEditing);
  const isDeleting = useAppSelector(selectIsDeleting);

  const dispatch = useAppDispatch();

  const handleDelete = (id: string) => {
    dispatch(deleteTodo(id));
  };

  const handleEdit = (id: string) => {
    dispatch(enableEditModeById({ id }));
  };

  const handleCancelEditing = () => {
    dispatch(disableEditMode());
  };

  return (
    <Box className={styles.wrapper}>
      <Card className={styles.form} elevation={3}>
        {isEditing ? (
          <EditTodoForm onCancel={handleCancelEditing} />
        ) : (
          <CreateTodoForm />
        )}
      </Card>

      <Stack className={styles.todos}>
        {todos.map(todo => (
          <TodoCard
            key={todo.id}
            onDelete={handleDelete}
            onEdit={handleEdit}
            isDisabled={isDeleting || isEditing}
            {...todo}
          />
        ))}
      </Stack>
    </Box>
  );
}

export default App;
