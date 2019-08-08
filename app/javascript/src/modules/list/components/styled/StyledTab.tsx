import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Tab from '@material-ui/core/Tab'

const StyledTab = withStyles(theme => ({
  root: {
    minWidth: 36, 
    padding: 0, 
    fontSize: '15px',
    fontWeight: 800, 
    color: 'black',
    fontFamily: 'Helvetica',
    lineHeight: '20px',
    textTransform: 'capitalize',
    marginLeft: '24px',
    '&:hover': {
      color: '#40a9ff',
      opacity: 1
    },
    '&$selected': {
      color: '#3A84FF'
    },
    '&:focus': {
      color: '#40a9ff'      
    }
  },
  selected: {}
}))((props: any) => <Tab disableRipple {...props} />)

export default StyledTab