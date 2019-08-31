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
        '&$selected, &$selected:hover': {
          color: '#FFFFFF',
          backgroundColor: cs.COLORS.primary,
        },
        '&:hover': {
          backgroundColor: cs.COLORS.primaryHover,
        },
      },
    },
    MuiListItemText: {
      root: {
        color: cs.FONT.color,
      },
    },
    MuiButton: {
      root: {
        width: '100%',
        minWidth: '36px',
        height: '36px',
        background: cs.COLORS.primary,
        borderRadius: '3px',
        fontFamily: cs.FONT.family,
        fontWeight: cs.FONT.weight.regular,
        fontSize: cs.FONT.size.xs,
        color: '#FFFFFF',
        textAlign: 'center',
        textTransform: 'capitalize',
        '&:hover': {
          opacity: 0.7,
          backgroundColor: cs.COLORS.primaryHover,
        },
      },
      outlined: {
        background: '#FFFFFF',
        color: '#3A84FF',
        border: `2px solid ${cs.COLORS.primary}`,
        fontSize: cs.FONT.size.sm,
        '&:hover': {
          backgroundColor: cs.COLORS.primaryHover,
        },
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
