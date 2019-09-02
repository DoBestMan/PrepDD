import {createMuiTheme} from '@material-ui/core';
import * as cs from '../constants/theme';

const defaultTheme = createMuiTheme({
  palette: {
    background: {
      default: cs.COLORS.background,
    },
  },
  typography: {
    h1: {
      color: cs.FONT.color,
      fontFamily: cs.FONT.family,
      fontSize: cs.FONT.size.xl,
      fontWeight: cs.FONT.weight.bold,
      lineHeight: '40px',
    },
    h2: {
      color: cs.FONT.color,
      fontFamily: cs.FONT.family,
      fontSize: cs.FONT.size.lg,
      fontWeight: cs.FONT.weight.bold,
      lineHeight: '32px',
    },
    h3: {
      color: cs.FONT.color,
      fontFamily: cs.FONT.family,
      fontSize: cs.FONT.size.md,
      fontWeight: cs.FONT.weight.bold,
      lineHeight: '24px',
    },
    h4: {
      color: cs.FONT.color,
      fontFamily: cs.FONT.family,
      fontSize: cs.FONT.size.sm,
      fontWeight: cs.FONT.weight.bold,
      lineHeight: '24px',
    },
    h6: {
      color: cs.FONT.color,
      fontFamily: cs.FONT.family,
      fontSize: cs.FONT.size.xs,
      fontWeight: cs.FONT.weight.bold,
      lineHeight: '21px',
    },
    body1: {
      color: cs.FONT.color,
      fontFamily: cs.FONT.family,
      fontSize: cs.FONT.size.xs,
      fontWeight: cs.FONT.weight.bold,
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
          backgroundColor: cs.COLORS.primary,
        },
        '&:hover': {
          backgroundColor: cs.COLORS.primaryHover,
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
        color: cs.FONT.color,
      },
    },
    MuiButton: {
      root: {
        width: 'fit-content',
        minWidth: '36px',
        height: '36px',
        borderRadius: '3px',
        fontFamily: cs.FONT.family,
        fontWeight: cs.FONT.weight.regular,
        fontSize: cs.FONT.size.xs,
        color: cs.COLORS.primary,
        textAlign: 'center',
        textTransform: 'capitalize',
        '&:hover': {
          backgroundColor: cs.COLORS.primaryHover,
        },
      },
      contained: {
        color: '#FFFFFF', 
        backgroundColor: cs.COLORS.primary,
        boxShadow: 'none', 
        '&:hover': {
          opacity: 0.7,
          backgroundColor: cs.COLORS.primary,
        },
      },
      outlined: {
        backgroundColor: '#FFFFFF',
        color: '#3A84FF',
        border: `2px solid ${cs.COLORS.primary}`,
        fontSize: cs.FONT.size.sm,
      },
    },
    MuiTableRow: {
      root: {
        color: '#606060',
        '&:hover': {
          color: '#D8D8D8',
          backgroundColor: '#EBF2FF',
        },
      },
      head: {
        '&:hover': {
          backgroundColor: '#FFFFFF',
        },
      },
    },
    MuiTableCell: {
      root: {
        fontFamily: cs.FONT.family,
        fontWeight: cs.FONT.weight.regular,
        fontSize: cs.FONT.size.xs,
      },
    },
  },
});

export default defaultTheme;