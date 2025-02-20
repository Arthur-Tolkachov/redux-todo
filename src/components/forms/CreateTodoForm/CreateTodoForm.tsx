import { Box, Button } from '@mui/material';
import { useAppSelector } from 'app/hooks';
import cn from 'classnames';
import { selectIsDeleting, selectIsLoading } from 'features/todos/todosSlice';
import { FormProvider } from 'react-hook-form';

import styles from './CreateTodoForm.module.scss';
import { useCreateTodoForm } from './useCreateTodoForm';
import { TodoFormFields } from '../TodoFormFields';

export interface CreateTodoFormProps {
  className?: string;
}

export const CreateTodoForm: React.FC<CreateTodoFormProps> = ({
  className,
}) => {
  const isLoading = useAppSelector(selectIsLoading);
  const isDeleting = useAppSelector(selectIsDeleting);

  const isDisabled = isLoading || isDeleting;

  const { methods, onSubmit } = useCreateTodoForm();

  return (
    <FormProvider {...methods}>
      <Box
        component="form"
        onSubmit={onSubmit}
        className={cn(styles.form, className)}
      >
        <Box className={styles.title}>Create TODO</Box>

        <TodoFormFields />

        <Button
          color="primary"
          variant="contained"
          size="large"
          className={styles.submit}
          type="submit"
          disabled={isDisabled}
          loading={isLoading}
        >
          + Create todo
        </Button>
      </Box>
    </FormProvider>
  );
};
