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
    body1: {
      fontFamily: 'Montserrat',
      fontSize: '12px',
      fontWeight: 'bold',
      lineHeight: '21px',      
    }
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
      }
    },
    MuiListItemText: {
      root: {
        color: '#2C2C2C',
      }
    }
  }
});

export default defaultTheme;
