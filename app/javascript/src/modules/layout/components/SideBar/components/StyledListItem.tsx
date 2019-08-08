import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import ListItem from '@material-ui/core/ListItem'

const StyledListItem = withStyles({
  root: {
    padding: '9px 24px 9px 24px',
    fontFamily: 'Helvetica',
    fontWeight: 800, 
    fontSize: '15px',
    '&$selected, &$selected:hover': {
      color: '#FFFFFF',
      background: '#3A84FF'
    },
    '&:hover': {
      background: '#EBF2FF'
    }
  },
  selected: {}
})(ListItem);

export default StyledListItem