import {createMuiTheme} from '@material-ui/core';

const defaultTheme = createMuiTheme({
  palette: {
    background: {
      default: '#FFFFFF',
    },
  },
  typography: {
    h1: {
      color: '#000000',
      fontFamily: 'Montserrat',
      fontSize: '30px',
      fontWeight: 'bold',
      lineHeight: '40px',
    },
    h2: {
      color: '#000000',
      fontFamily: 'Montserrat',
      fontSize: '24px',
      fontWeight: 'bold',
      lineHeight: '32px',
    },
    h3: {
      color: '#000000',
      fontFamily: 'Montserrat',
      fontSize: '18px',
      fontWeight: 'bold',
      lineHeight: '24px',
    },
    h4: {
      color: '#000000',
      fontFamily: 'Montserrat',
      fontSize: '15px',
      fontWeight: 'bold',
      lineHeight: '24px',
    },
    h6: {
      color: '#000000',
      fontFamily: 'Montserrat',
      fontSize: '12px',
      fontWeight: 'bold',
      lineHeight: '21px',
    },
    body1: {
      color: '#000000',
      fontFamily: 'Montserrat',
      fontSize: '12px',
      fontWeight: 'bold',
      lineHeight: '21px',
    },
  },
  overrides: {
    MuiListItem: {
      root: {
        display: 'flex',
        textTransform: 'none',
        width: '100%',
        cursor: 'pointer', 
        '&$selected, &$selected:hover': {
          color: '#FFFFFF',
          background: '#3A84FF',
        },
        '&:hover': {
          background: '#EBF2FF',
        },
      },
    },
    MuiListItemIcon: {
      root: {
        color: '#000000',
        minWidth: '40px',
      },
    },
    MuiListItemText: {
      root: {
        color: '#2C2C2C',
      },
    },
  },
});

export default defaultTheme;
