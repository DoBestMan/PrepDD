import { withStyles } from '@material-ui/core/styles'
import ListItemText from '@material-ui/core/ListItemText'

const StyledListItemText = withStyles({
  root: {
    fontFamily: 'Helvetica',
    fontWeight: 800, 
    fontSize: '15px',
    color: '#2C2C2C'
  },
  primary: {
    fontFamily: 'Helvetica',
    fontWeight: 800, 
    fontSize: '15px',
  	color: '#2C2C2C'
  }
})(ListItemText)

export default StyledListItemText