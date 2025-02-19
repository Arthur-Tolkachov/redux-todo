import { Box, Button } from '@mui/material';
import { useAppSelector } from 'app/hooks';
import cn from 'classnames';
import { DatePickerField } from 'components/fields/DatePickerField';
import { DropdownField } from 'components/fields/DropdownField';
import { TextField } from 'components/fields/TextField';
import { FormProvider } from 'react-hook-form';

import { Tasks } from './components/Tasks';
import styles from './CreateTodoForm.module.scss';
import { useCreateTodoForm } from './useCreateTodoForm';

export interface CreateTodoFormProps {
  className?: string;
}

export const CreateTodoForm: React.FC<CreateTodoFormProps> = ({
  className,
}) => {
  const isLoading = useAppSelector(state => state.todos.isLoading);
  const { methods, onSubmit } = useCreateTodoForm();

  return (
    <FormProvider {...methods}>
      <Box
        component="form"
        onSubmit={onSubmit}
        className={cn(styles.form, className)}
      >
        <Box className={styles.title}>Create TODO</Box>

        <TextField name="title" label="Title" />
        <TextField name="description" label="Description" multiline rows={4} />

        <DatePickerField name="deadline" disablePast />

        <DropdownField
          name="priority"
          label="Priority"
          options={[
            { value: 'normal', label: 'Normal' },
            { value: 'high', label: 'High' },
            { value: 'low', label: 'Low' },
          ]}
        />

        <Tasks />

        <Button
          color="primary"
          variant="contained"
          size="large"
          className={styles.submit}
          type="submit"
          disabled={isLoading}
          loading={isLoading}
        >
          + Create todo
        </Button>
      </Box>
    </FormProvider>
  );
};
