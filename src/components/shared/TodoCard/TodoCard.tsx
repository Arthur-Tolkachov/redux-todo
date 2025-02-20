import { Box, Card, IconButton, List, ListItem, Stack } from '@mui/material';
import cn from 'classnames';
import { TodoModel } from 'validation/todo';

import styles from './TodoCard.module.scss';

export interface TodoCardProps extends TodoModel {
  isDisabled?: boolean;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
}

export const TodoCard: React.FC<TodoCardProps> = ({
  id,
  title,
  description,
  priority,
  createdAt,
  tasks,
  deadline,
  isDisabled,
  onEdit,
  onDelete,
}) => (
  <Card
    className={cn(styles.card, {
      [styles.disabled]: isDisabled,
    })}
  >
    <Box className={styles.controls}>
      <IconButton
        className={styles.editButton}
        disabled={isDisabled}
        onClick={() => onEdit(id)}
      >
        edit
      </IconButton>

      <IconButton
        className={styles.deleteButton}
        onClick={() => onDelete(id)}
        disableRipple
        disabled={isDisabled}
      >
        +
      </IconButton>
    </Box>

    <Box className={styles.header}>
      <Box className={styles.title}>{title}</Box>
      <Box className={styles.date}>Created: {createdAt}</Box>
    </Box>

    {description && <Box className={styles.description}>{description}</Box>}

    <Stack className={styles.priority}>
      <Box className={styles.label}>Priority:</Box>
      <Box className={cn(styles.value, styles[priority])}>{priority}</Box>
    </Stack>

    {!!tasks.length && (
      <List className={styles.tasks}>
        {tasks.map(({ id, value }) => (
          <ListItem key={id}>- {value}</ListItem>
        ))}
      </List>
    )}

    {deadline && (
      <Stack className={styles.deadline}>
        <Box className={styles.label}>Deadline:</Box>
        <Box className={styles.date}>{deadline}</Box>
      </Stack>
    )}
  </Card>
);
