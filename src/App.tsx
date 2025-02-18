import { Box, Card } from '@mui/material';
import { CreateTodoForm } from 'components/forms/CreateTodoForm';

import styles from './App.module.scss';

function App() {
  return (
    <Box className={styles.wrapper}>
      <Card className={styles.form} elevation={3}>
        <CreateTodoForm />
      </Card>
    </Box>
  );
}

export default App;
