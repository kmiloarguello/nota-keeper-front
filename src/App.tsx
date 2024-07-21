// Styles
import './App.scss';
import './config/i18n/i18n';

import { RouterProvider } from 'react-router-dom';

import { ThemeProvider } from '@mui/material/styles';

import theme from './config/theme/theme';
import router from './router/Router';

function App() {

  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router()} />
    </ThemeProvider>
  );
}

export default App;
