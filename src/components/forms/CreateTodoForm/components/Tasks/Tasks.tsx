import { Box, Button, Card, IconButton, Stack, TextField } from '@mui/material';
import { useAppSelector } from 'app/hooks';

import styles from './Tasks.module.scss';
import { useTasks } from './useTasks';

export const Tasks = () => {
  const isLoading = useAppSelector(state => state.todos.isLoading);
  const { fields, editingId, onBlur, onAdd, onEdit, onDelete } = useTasks();

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
                disabled={isLoading}
              >
                +
              </IconButton>

              <Box
                onDoubleClick={() => {
                  if (!isLoading) {
                    onEdit(field.id);
                  }
                }}
              >
                {`${number}. ${field.value}`}
              </Box>
            </Stack>
          );
        })}

        <Button variant="contained" onClick={onAdd} disabled={isLoading}>
          + Add
        </Button>
      </Stack>
    </Card>
  );
};
