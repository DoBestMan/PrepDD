import { withStyles } from '@material-ui/core/styles'
import Badge from '@material-ui/core/Badge'

const StyledBadge = withStyles({
  badge: {
    top: '15%',
    right: 10, 
    background: '#FF507C',
    fontFamily: 'Helvetica',
    fontWeight: 800, 
    fontSize: '15px',
    color: '#FFFFFF',
    letterSpacing: '0',
    textAlign: 'center'
  }
})(Badge)

export default StyledBadge