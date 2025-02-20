import { Box, Button, Stack } from '@mui/material';
import { useAppSelector } from 'app/hooks';
import cn from 'classnames';
import { selectIsLoading } from 'features/todos/todosSlice';
import { FormProvider } from 'react-hook-form';

import styles from './EditTodoForm.module.scss';
import { TodoFormFields } from '../TodoFormFields';
import { useEditTodoForm } from './useEditTodoForm';

export interface EditTodoFormProps {
  className?: string;
  onCancel: VoidFunction;
}

export const EditTodoForm: React.FC<EditTodoFormProps> = ({
  className,
  onCancel,
}) => {
  const { methods, onSubmit } = useEditTodoForm();
  const isLoading = useAppSelector(selectIsLoading);

  return (
    <FormProvider {...methods}>
      <Box
        component="form"
        onSubmit={onSubmit}
        className={cn(styles.form, className)}
      >
        <Box className={styles.title}>Edit TODO</Box>

        <TodoFormFields />

        <Stack className={styles.formButtons}>
          <Button
            color="primary"
            variant="contained"
            size="large"
            className={styles.submit}
            type="submit"
            disabled={isLoading}
            loading={isLoading}
          >
            Save
          </Button>

          <Button
            color="error"
            variant="outlined"
            size="large"
            onClick={onCancel}
            disabled={isLoading}
          >
            Cancel
          </Button>
        </Stack>
      </Box>
    </FormProvider>
  );
};
