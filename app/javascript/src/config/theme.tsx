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
        '&$selected, &$selected:hover': {
          color: '#FFFFFF',
          background: '#3A84FF',
        },
        '&:hover': {
          background: '#EBF2FF',
        },
      },
    },
    MuiListItemText: {
      root: {
        color: '#2C2C2C',
      },
    },
    MuiButton: {
      root: {
        background: '#3A84FF',
        borderRadius: '3px',
        fontFamily: 'Montserrat',
        fontWeight: 'bold',
        fontSize: '12px',
        color: '#FFFFFF',
        textAlign: 'center',
        textTransform: 'capitalize',
        '&:hover': {
          opacity: 0.7,
          backgroundColor: '#3A84FF',
        },
      },
      outlined: {
        background: '#FFFFFF', 
        border: '2px solid #3A84FF',
      }
    }
  },
});

export default defaultTheme;
