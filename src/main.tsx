import './index.css';

import { StrictMode } from 'react';

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { store } from 'app/store.ts';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <App />
      </LocalizationProvider>
    </Provider>
  </StrictMode>,
);
