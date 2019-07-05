import {createMuiTheme} from '@material-ui/core';

const defaultTheme = createMuiTheme();

export default createMuiTheme({
  transitions: {
    // So we have `transition: none;` everywhere
    create: () => 'none',
  },
  palette: {
    background: {
      default: '#fff',
    },
    primary: {
      ...defaultTheme.palette.primary,
    },
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        '*, *::before, *::after': {
          transition: 'none !important',
          animation: 'none !important',
        },
      },
    },
  },
  props: {
    MuiButtonBase: {
      disableRipple: true,
    },
  },
  shadows: [
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
  ],
});
