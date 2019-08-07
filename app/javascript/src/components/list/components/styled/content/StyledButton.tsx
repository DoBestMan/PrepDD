import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'

const StyledButton = withStyles({
  root: {
    boxSizing: 'border-box',
    height: '36px',
    marginLeft: 20, 
    border: '2px solid #3A84FF',
    borderRadius: '3px',
    fontFamily: 'Helvetica',
    fontWeight: 800, 
    fontSize: '15px',
    color: '#3A84FF',
    textAlign: 'center',
    '&:hover': {
      border: '2px solid #3A84FF'
    }
  },
  label: {
    textTransform: 'capitalize'
  }
})(Button)

export default StyledButton