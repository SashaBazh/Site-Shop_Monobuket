import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    h1: {
      fontWeight: 300,
      fontSize: '48px',
    },
    h2: {
      fontWeight: 300,
      fontSize: '36px',
    },
    h3: {
      fontWeight: 300,
      fontSize: '28px',
    },
    body1: {
      fontSize: '16px',
    },
    body2: {
      fontSize: '14px',
    },
  },
  palette: {
    primary: {
      main: '#000000',
    },
    text: {
      primary: '#000000',
      secondary: '#333333',
    },
    background: {
      default: '#dcc7bd', // пастельный фон
      paper: '#ffffff',   // для светлых секций
    },
  },
});

export default theme;
