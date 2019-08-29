import {createMuiTheme} from '@material-ui/core';

const defaultTheme = createMuiTheme({
  palette: {
    background: {
      default: '#FFFFFF',
    },
  },
  typography: {
    h1: {
      fontFamily: 'Montserrat',
      fontSize: '30px',
      fontWeight: 'bold',
      lineHeight: '40px',
    },
    h2: {
      fontFamily: 'Montserrat',
      fontSize: '24px',
      fontWeight: 'bold',
      lineHeight: '32px',
    },
    h3: {
      fontFamily: 'Montserrat',
      fontSize: '18px',
      fontWeight: 'bold',
      lineHeight: '24px',
    },
    h4: {
      fontFamily: 'Montserrat',
      fontSize: '15px',
      fontWeight: 'bold',
      lineHeight: '24px',
    },
    h6: {
      fontFamily: 'Montserrat',
      fontSize: '12px',
      fontWeight: 'bold',
      lineHeight: '21px',
    },
  },
});

export default defaultTheme;
