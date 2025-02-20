import { Box, Button, Card, IconButton, Stack, TextField } from '@mui/material';
import { useAppSelector } from 'app/hooks';
import { selectIsDeleting, selectIsLoading } from 'features/todos/todosSlice';

import styles from './TasksFields.module.scss';
import { useTasksFields } from './useTasksFields';

export const TasksFields = () => {
  const isLoading = useAppSelector(selectIsLoading);
  const isDeleting = useAppSelector(selectIsDeleting);
  const isDisabled = isLoading || isDeleting;

  const { fields, editingId, onBlur, onAdd, onEdit, onDelete } =
    useTasksFields();

  return (
    <Card className={styles.wrapper} variant="outlined">
      <Box className={styles.label}>Tasks:</Box>

      <Stack className={styles.list}>
        {fields.map((field, idx) => {
          const number = idx + 1;

          if (editingId === field.id) {
            return (
              <TextField
                key={field.fieldId}
                slotProps={{
                  input: {
                    id: 'task_field',
                  },
                }}
                className={styles.input}
                label="New task"
                onBlur={onBlur}
                size="small"
                defaultValue={field.value}
                autoFocus
                multiline
              />
            );
          }

          return (
            <Stack key={field.fieldId} direction="row" gap={1}>
              <IconButton
                className={styles.removeBtn}
                size="small"
                color="error"
                onClick={() => onDelete(field.id)}
                disabled={isDisabled}
              >
                +
              </IconButton>

              <Box
                onDoubleClick={() => {
                  if (!isDisabled) {
                    onEdit(field.id);
                  }
                }}
              >
                {`${number}. ${field.value}`}
              </Box>
            </Stack>
          );
        })}

        <Button variant="contained" onClick={onAdd} disabled={isDisabled}>
          + Add
        </Button>
      </Stack>
    </Card>
  );
};
