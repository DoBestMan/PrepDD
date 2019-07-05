import {createMuiTheme} from '@material-ui/core';

export default createMuiTheme({
  transitions: {
    // So we have `transition: none;` everywhere
    create: () => 'none',
  },
  overrides: {
    MuiCssBaseline: {
      // Name of the rule
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
